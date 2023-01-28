enum Events {
  click = "click",
  reacted = "reacted",
  closed = "closed"
}

interface Mediator {
  notify(sender: string, event: Events): void
}

abstract class Mediated {
  mediator: Mediator
  setMediator(m: Mediator) {
    this.mediator = m
  }
}

class Notifications {
  send() {
    console.log(`Message processing...`)
  }
}
class LogM {
  log(message: string) {
    console.log(`-- `, message, ` --`)
  }
}
class EventHandler extends Mediated {
  reactionEvent() {
    this.mediator.notify("System", Events.reacted)
  }
}

// ----------MEDIATOR-------------
class NotificationMediator implements Mediator {
  constructor(
    public notifications: Notifications,
    public logger: LogM,
    public handler: EventHandler,
  ) {}

  notify(_: string, event: Events): void {
    switch (event){
      case Events.click:
        // something
        break;
      case Events.reacted:
        this.notifications.send();
        this.logger.log("Reaction was caught");
        break;
      case Events.closed:
        // something
        break;
    }
  }
}
// -----------------------------

// ----------to test-------------

const notification = new Notifications(),
  logM = new LogM(),
  handler = new EventHandler()

const m = new NotificationMediator(notification, logM, handler)
handler.setMediator(m);

handler.reactionEvent() //simulation of event, sending particular type to proceed

interface IProvider {
  sendMsg(msg: string): void
  connect(app: unknown): void
  disconnect(): void
}

class TelegramProvider implements IProvider {
    sendMsg(msg: string): void {
      console.log(msg)
    }
    connect(app: string): void {
      console.log(`Connected-------------------> `, app)
    }
    disconnect(): void {
      console.log(`Telegram disconnected`)
    }
}
class ViberProvider implements IProvider {
    sendMsg(msg: string): void {
      console.log(msg)
    }
    connect(info: string): void {
      console.log(`Connected-------------------> `, info)
    }
    disconnect(): void {
      console.log(`Viber disconnected`)
    }
}

// ----------BRIDGE-------------
class NotificationSender {
  constructor(private provider: IProvider) {}

  send(): void {
    this.provider.connect("info")
    this.provider.sendMsg("Some Message")
    this.provider.disconnect()
  }
}

class NotificationSenderWithDelay extends NotificationSender {
  constructor(provider: IProvider) {
    super(provider)
  }

  override send(): void {
    setTimeout(() => super.send(), 1000)
  }
}
// --------------------------------

// ----------to test-------------

const sender = new NotificationSender(new TelegramProvider()),
  senderWithDelay = new NotificationSenderWithDelay(new ViberProvider())

sender.send()
senderWithDelay.send()

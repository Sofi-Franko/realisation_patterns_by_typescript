class Notify {
  send(template: string, to: string) {
    console.log(`Sending ${template}: ${to}`)
  }
}

class Log {
  log(msg: string) {
    console.log("LOG---> ", msg)
  }
}

class Template {
  private templates = [
    {name: "basic", template: `<h1>Template to show</h1>`}
  ]

  getByName(name: string): {name: string, template: string} | undefined {
    return this.templates.find(t => t.name == name)
  }
}

// ----------FASAD-------------
class NotifyExecutor {
  private notifyProcessor: Notify
  private logProcessor: Log
  private templateProcessor: Template

  constructor() {
    this.notifyProcessor = new Notify()
    this.logProcessor = new Log()
    this.templateProcessor = new Template()
  }

  send(to:string, templateName: string) {
    let template = this.templateProcessor.getByName(templateName)

    if(!template) {
      this.logProcessor.log("Template with passed name wasn`t found. Default will be set")
      template = {name: "default", template: `<h1>Default</h1>`}
    }

    this.notifyProcessor.send(template.template, to)
    this.logProcessor.log("Successfully sent!")
  }
}
// -----------------------------

// ----------to test-------------

const notifyExecutor = new NotifyExecutor();
notifyExecutor.send("soffranko@gmail.com", "basic")
notifyExecutor.send("soffranko@gmail.com", "alternative")

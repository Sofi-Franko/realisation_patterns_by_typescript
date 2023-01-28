class DefaultForm {
  constructor(public name: string) {
  }
}

// ----------TEMPLATE-------------
abstract class FormSaver<T> {
  public save(form: DefaultForm): void {
    const res = this.fill(form);
    this.log(res);
    this.send(res)
  }
  protected abstract fill(form: DefaultForm): T
  protected log(data: T) {
    console.log(data)
  }
  protected abstract send(data: T): void
}
// -----------------------------

class FirstAPI extends FormSaver<string> {
  protected fill(form: DefaultForm): string {
    return form.name;
  }

  protected send(data: string): void {
    console.log(`Sending by FirstAPI -> ${data}`)
  }
}

type secondApiData = {userName: string}
class SecondAPI extends FormSaver<secondApiData> {
  protected fill(form: DefaultForm): secondApiData {
    return {userName: form.name};
  }

  protected send(data: secondApiData): void {
    console.log(`Sending by SecondAPI -> ${JSON.stringify(data)}`)
  }
}

// ----------to test-------------

new FirstAPI().save(new DefaultForm("Sofi"))
new SecondAPI().save(new DefaultForm("Ilona"))

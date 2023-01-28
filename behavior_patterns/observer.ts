// ----------OBSERVER-------------
interface Observer<T> {
  update(subjectState: T): void
}

class NotificationService<T> implements Observer<T> {
  update(subjectState: T): void {
    console.log(`NotificationObserver has received a notification ---> `, subjectState)
  }
}

class LeadService<T> implements Observer<T> {
  update(subjectState: T): void {
    console.log(`LeadService has received a notification ---> `, subjectState)
  }
}
// -----------------------------

interface ISubject<T> {
  attach(observer: Observer<T>): void
  detach(observer: Observer<T>): void
  notify(): void
}

class Subject<T> implements ISubject<T> {
  private observerList: Observer<T>[] = []
  public state: T

  attach(observer: Observer<T>): void {
    if (this.observerList.includes(observer)) return
    this.observerList.push(observer)
  }

  detach(observer: Observer<T>): void {
    const obsIndex = this.observerList.indexOf(observer)
    if (obsIndex == -1) return
    this.observerList.splice(obsIndex, 1)
  }

  notify(): void {
    for (const obs of this.observerList) {
      obs.update(this.state)
    }
  }
}

// ----------to test-------------

class Lead {
  constructor(public name: string, public phone: string) {}
}

const newLead = new Subject<Lead>();
newLead.state = new Lead("Sofi", "+380445621309");

const subscriber1 = new NotificationService<Lead>(),
  subscriber2 = new LeadService<Lead>()

newLead.attach(subscriber1)
newLead.attach(subscriber1) // returns nothing

newLead.detach(subscriber2) // returns nothing
newLead.attach(subscriber2)

newLead.notify()
console.log("\n")
newLead.detach(subscriber2)
newLead.notify()

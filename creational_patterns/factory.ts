interface IInsurance {
  id: string,
  status: string,
  setVehicle(v: any): void
  send(): Promise<boolean>
}

class InsuranceA implements IInsurance {
  id: string;
  status: string;
  private _vehicle: any

  async send(): Promise<boolean> {
    const result = await fetch("http://localhost:8080/sendInsurance", {
      method: "POST",
      body: JSON.stringify({ iData: this._vehicle })
    })

    const data = await result.json()
    return data.isSuccess
  }

  setVehicle(v: any): void {
    this._vehicle = v
  }
}

class InsuranceB implements IInsurance {
  id: string;
  status: string;
  additionalData: any
  private _vehicle: any

  async send(): Promise<boolean> {
    const result = await fetch("http://localhost:9090/sendInsurance", {
      method: "POST",
      body: JSON.stringify({ data: this._vehicle, additionalData: this.additionalData })
    })

    const data = await result.json()
    return data.responceStatus
  }

  setVehicle(v: any): void {
    this._vehicle = v
  }
}


// ----------FACTORY-------------
abstract class InsuranceFactory {
  protected db: any

  abstract createInsurance(): IInsurance

  saveHistory(i: IInsurance): void {
    this.db.createOne({id: i.id, status: i.status})
  }
}
// --------------------------------

class AInsuranceFactory extends InsuranceFactory {
  createInsurance(): InsuranceA {
    return new InsuranceA()
  }
}
class BInsuranceFactory extends InsuranceFactory {
  createInsurance(): InsuranceB {
    return new InsuranceB()
  }
}

// ----------to test-------------

const aInsFactory = new AInsuranceFactory()
const aIns = aInsFactory.createInsurance();
aInsFactory.saveHistory(aIns)

interface IPaymentAPI {
  getPaymentDetail(id: number): IPaymentDetail | undefined
}

interface IPaymentDetail {
  id: number,
  sum: number
}

class PaymentAPI implements IPaymentAPI {
  private db: IPaymentDetail[] = [{ id: 1, sum: 1000 }]
  getPaymentDetail(id: number): IPaymentDetail | undefined {
    return this.db.find((payment) => payment.id === id)
  }
}

// ----------PROXY-------------
class ProxyPaymentAPI implements IPaymentAPI {
  constructor(private apiProcessor: PaymentAPI, private userId: number) {}

  getPaymentDetail(id: number): IPaymentDetail | undefined {
    if (this.userId !== 123) throw new Error("User has no access to read payment data")
    return this.apiProcessor.getPaymentDetail(id)
  }
}
// -----------------------------

// ----------to test-------------

const hasRights = new ProxyPaymentAPI(new PaymentAPI(), 123);
console.log(`the-------------------> proxyGet()`, hasRights.getPaymentDetail(1))

const noRights = new ProxyPaymentAPI(new PaymentAPI(), 321);
console.log(`the-------------------> proxyGet()`, noRights.getPaymentDetail(1))

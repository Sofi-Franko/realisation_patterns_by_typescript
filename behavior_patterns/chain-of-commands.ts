interface IMiddleware {
  next(mid: IMiddleware): IMiddleware
  handle(request: any): any
}

// ----------CHAIN-------------
abstract class AbstractMiddleware implements IMiddleware {
  private nextMiddleware: IMiddleware;

  next(mid: IMiddleware): IMiddleware {
    this.nextMiddleware = mid
    return mid
  }

  handle(request: any): any {
    if (this.nextMiddleware) return this.nextMiddleware.handle(request)
    return
  }
}
// -----------------------------

class AuthMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("AuthMiddleware")

    if (request.token) return super.handle(request);
    return { errorMsg: "Not authorized"}
  }
}

class ValidateMiddleware extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("ValidateMiddleware")

    if (request.body) return super.handle(request);
    return { errorMsg: "Body is missing"}
  }
}

class Controller extends AbstractMiddleware {
  override handle(request: any): any {
    console.log("Controller")
    return {success: request}
  }
}

// ----------to test-------------

const auth = new AuthMiddleware(),
  validate = new ValidateMiddleware(),
  controller = new Controller()

auth.next(validate).next(controller)

const reqFailOnAuth = { data: "nothing" },
  reqFailOnValidation = { token: "Bearer4kfjmf..." },
  reqSuccess = { token: "Bearer4kfjmf...", body: JSON.stringify({ data: "Some data here" }) }

console.log(auth.handle(reqFailOnAuth), "\n\n\n")
console.log(auth.handle(reqFailOnValidation), "\n\n\n")
console.log(auth.handle(reqSuccess))

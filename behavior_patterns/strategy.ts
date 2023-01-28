class StrategyUser {
  gitHubToken: string;
  jwtToken: string
}

interface AuthStrategy {
  auth(user: StrategyUser) : boolean
}

// ----------STRATEGY-------------
class Auth {
  constructor(private strategy: AuthStrategy) {}

  setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy
  }

  public authUser(user: StrategyUser): boolean {
    return this.strategy.auth(user)
  }
}
// -----------------------------

class JWTAuthStrategy implements AuthStrategy {
  auth(user: StrategyUser): boolean {
    // some logic
    return !!user.jwtToken;
  }
}

class GitHubAuthStrategy implements AuthStrategy {
  auth(user: StrategyUser): boolean {
    // some logic
    return !!user.gitHubToken;
  }
}

// ----------to test-------------

const u = new StrategyUser();
u.jwtToken = "Bearer ..."
const authStrategy = new Auth(new JWTAuthStrategy())
console.log(`Auth under JWT -> `, authStrategy.authUser(u)) // true

authStrategy.setStrategy(new GitHubAuthStrategy());
console.log(`Auth under GitHub -> `, authStrategy.authUser(u)) // false

class CUser {
  constructor(public userId: string) {}
}

class UserService {
  saveUser(user: CUser) {
    // logic of saving
    console.log(`Saving user -> `, user)
  }

  deleteUser(userId: string) {
    // logic of deleting
    console.log(`Deleting -> `, userId, ` <-`)
  }
}

class UsersController {
  receiver: UserService
  history: CommandHistory = new CommandHistory()

  addReceiver(receiver: UserService) {
    this.receiver = receiver
  }

  run(userId: string) {
    const addUserCmd = new AddUserCommand(
      new CUser(userId),
      this.receiver,
      this.history
    )

    addUserCmd.execute()
    console.log(`the-------------------> `, addUserCmd.history)
    addUserCmd.undo()
    console.log(`the-------------------> `, addUserCmd.history)
  }
}

class CommandHistory {
  public cmds: Command[] = []

  push(cmd: Command) {
    this.cmds.push(cmd)
  }

  remove(cmdId: string) {
    this.cmds = this.cmds.filter(c => c.commandId !== cmdId)
  }
}

// ----------COMMAND-------------
abstract class Command {
  public commandId: string
  abstract execute() : void

  protected constructor(public historyCmds: CommandHistory) {
    this.commandId = Math.random().toFixed(2).toString()
  }
}

class AddUserCommand extends Command {
  constructor(
    private user: CUser,
    private receiver: UserService,
    public history: CommandHistory
  ) {
    super(history);
  }

  execute(): void {
    this.receiver.saveUser(this.user);
    this.history.push(this)
  }

  undo(): void {
    this.receiver.deleteUser(this.user.userId);
    this.history.remove(this.commandId)
  }
}
// -----------------------------

// ----------to test-------------

const usersController = new UsersController()
usersController.addReceiver(new UserService())
usersController.run("1234")

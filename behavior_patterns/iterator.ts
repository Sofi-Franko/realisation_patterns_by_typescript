class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = []
  sortByPriority() {
    this.tasks.sort((a,b) => {
      if (a.priority > b.priority) return 1
      else if (a.priority == b.priority) return 0
      else return -1
    })
  }

  addTask(task: Task) {
    this.tasks.push(task)
  }

  getTasks(): Task[] {
    return this.tasks
  }

  count(): number {
    return this.tasks.length
  }

  getIterator() {
    return new PriorityTaskIterator(this)
  }
}

// ----------ITERATOR-------------
interface IIterator<T> {
  current(): T | undefined
  next(): T | undefined
  prev(): T | undefined
  index(): number
}

class PriorityTaskIterator implements IIterator<Task> {
  private position: number = 0
  private taskList: TaskList

  constructor(taskList: TaskList) {
    taskList.sortByPriority();
    this.taskList = taskList
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position]
  }

  index(): number {
    return this.position
  }

  next(): Task | undefined {
    this.position +=1
    return this.taskList.getTasks()[this.position]
  }

  prev(): Task | undefined {
    this.position -=1
    return this.taskList.getTasks()[this.position]
  }
}
// -----------------------------

// ----------to test-------------

const taskList = new TaskList();
taskList.addTask(new Task(4))
taskList.addTask(new Task(2))
taskList.addTask(new Task(5))
taskList.addTask(new Task(1))
const iterator = taskList.getIterator()
console.log(iterator.current()) // { priority: 1 }
console.log(iterator.next()) // { priority: 2 }
console.log(iterator.index()) // 1
console.log(iterator.prev()) // // { priority: 1 }

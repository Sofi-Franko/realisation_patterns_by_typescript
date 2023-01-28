class Post {
  public text: string
  private state: PostState

  constructor() {
    this.setState(new DraftPostState())
  }

  getState(): PostState {
    return this.state
  }

  getStateName(): string {
    return this.state.name
  }

  setState(state: PostState): void {
    this.state = state;
    this.state.setContext(this)
  }

  publishPost() {
    this.state.publish()
  }

  deletePost() {
    this.state.delete()
  }
}

// ----------STATE-------------
abstract class PostState {
  public name: string
  public item: Post

  public setContext(item: Post) {
    this.item = item
  }

  public abstract publish(): void
  public abstract delete(): void
}

class DraftPostState extends PostState {
  constructor() {
    super();
    this.name = "DraftPost"
  }

  publish(): void {
    console.log(`PUBLISHing ---> `, this.item.text)
    this.item.setState(new PublishPostState())
  }

  delete(): void {
    throw new Error("DRAFT was deleted")
  }
}

class PublishPostState extends PostState {
  constructor() {
    super();
    this.name = "PublishedPost"
  }

  publish(): void {
    console.log(this.item, ` --- already published`)
  }

  delete(): void {
    console.log(`Moving to DRAFT ---> `);
    this.item.setState(new DraftPostState())
  }
}
// -----------------------------

// ----------to test-------------

const post = new Post();
post.text = "My first post"
console.log(`--- `, post.getState()) // PostState { name: "DraftPost" }

post.publishPost()
console.log(`--- `, post.getStateName()) // PublishedPost

post.deletePost()
console.log(`--- `, post.getStateName()) // DraftPost

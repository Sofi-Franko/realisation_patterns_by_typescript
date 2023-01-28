interface Prototype<T> {
  clone(): T
}

class LibraryInfo implements Prototype<LibraryInfo>{
  built: Date
  constructor(public name: string, public location: string) {
    this.built = new Date()
  }

  clone(): LibraryInfo {
    const newLib = new LibraryInfo(this.name, this.location)
    newLib.built = this.built

    return newLib
  }
}

// ----------to test-------------

let library1 = new LibraryInfo("Library of Vernadsky", "Kyiv")
let library2 = library1.clone()
library2.location = "Lviv"

console.log(library1)
console.log(library2)

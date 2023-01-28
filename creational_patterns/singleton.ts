// ----------SINGLETON-------------
class MappedMap {
  private static _instance: MappedMap
  map: Map<number, string> = new Map()

  private constructor() {} // makes singleton class unreachable to create an instances

  public static get(): MappedMap {
    if (!MappedMap._instance) {
      MappedMap._instance = new MappedMap()
    }
    return MappedMap._instance
  }

  public clear(): void {
    this.map = new Map()
  }
}
// --------------------------------

class BuilderService {
  addToMap(key: number, val: string) {
    const MyMapInstance = MappedMap.get()
    MyMapInstance.map.set(key, val)
  }

  cleanMap() {
    const MyMapInstance = MappedMap.get()
    MyMapInstance.clear()
  }
}

class SearchService {
  findValueByKey(key: number): string {
    const MyMapInstance = MappedMap.get()
    const result = MyMapInstance.map.get(key) || "No value"
    console.log(result)

    return result
  }
}

// ----------to test-------------

const builder = new BuilderService(),
  searcher = new SearchService()

builder.addToMap(1, "First position")
builder.addToMap(3, "Third position")

searcher.findValueByKey(3) // "Third position"

builder.cleanMap()
searcher.findValueByKey(1) // "No value"

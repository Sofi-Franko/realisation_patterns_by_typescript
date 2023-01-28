class StorageDB {
  private db: Map<string, string> = new Map()

  save(k: string, v: string): void {
    this.db.set(k, v)
  }

  showDb() {
    console.log(`DB--- `, this.db)
  }
}

class PersistentStorage {
  save(data: {key: string, value: string}) {
    // call POST
    console.log(data)
  }
}

// Client call
function run(db: StorageDB, {key, value}: {key: string, value: string}) {
  db.save(key, value)
}

// ----------ADAPTER-------------
class PersistentStorageAdapter extends StorageDB {
  constructor(public persistentDb: PersistentStorage) {
    super();
  }

  override save(k: string, v: string): void {
    this.persistentDb.save({key: k, value: v})
  }
}
// --------------------------------

// ----------to test-------------

const s = new StorageDB(),
  p = new PersistentStorageAdapter(new PersistentStorage()),
  keyValPair = {key:"chapter_1", value:"World of Tanks"}

run(s, keyValPair) // set {} to DB
run(p, keyValPair) // just logs {} to console

s.showDb() // { 'chapter_1' => 'World of Tanks' }
p.showDb() // empty because of virtual "call"

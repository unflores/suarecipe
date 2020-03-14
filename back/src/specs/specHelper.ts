import * as database from './mongoMemory'
console.log("hai\n\n\n")

before(async () => await database.connect())
after(async () => await database.disconnect())
beforeEach(async () => await database.clear())

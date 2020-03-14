import * as database from './mongoMemory'


before(async () => await database.connect())
after(async () => await database.disconnect())
beforeEach(async () => await database.clear())

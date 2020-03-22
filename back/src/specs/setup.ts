import { dbClose, dbSetup } from '../../config/mongoose'
import database from '../../config/mongoose'

before(async () => dbSetup())

after(async () => dbClose())

beforeEach(async () => {
  for (let i in database.connection.collections) {
    await database.connection.collections[i].deleteMany({})
  }
})

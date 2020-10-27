import database, { dbClose, dbSetup } from '../../config/mongoose'

before(async () => dbSetup())

after(async () => dbClose())

beforeEach(async () => {
  Object.keys(database.connection.collections).forEach((collectionId) => {
    database.connection.collections[collectionId].deleteMany({})
  })
})

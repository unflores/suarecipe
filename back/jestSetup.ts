const mongoose = require('mongoose')
const Bluebird = require('bluebird')

mongoose.set('debug')
mongoose.Promise = Bluebird

// https://medium.com/@art.longbottom.jr/concurrent-testing-with-mongoose-and-jest-83a27ceb87ee

/*

  Define clearDB function that will loop through all
  the collections in our mongoose connection and drop them.
*/
function clearDB(done) {
  for (let i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {})
  }
  return done()
}

beforeEach((done) => {
  mongoose.connect(
    `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
    function(err) {
      if (err) {
        throw err
      }
      console.log(`Clearing stuffs now: ${process.env.TEST_SUITE}`)
      return clearDB(done)
    },
  )
})

afterAll((done) => {
  console.log(`All done ${process.env.TEST_SUITE}`)
  mongoose.disconnect()
  return done()
})

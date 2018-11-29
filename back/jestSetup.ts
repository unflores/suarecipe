const mongoose = require('mongoose')
const Bluebird = require('bluebird')
process.env.NODE_ENV = 'test'

mongoose.set('debug')
mongoose.Promise = Bluebird

// https://medium.com/@art.longbottom.jr/concurrent-testing-with-mongoose-and-jest-83a27ceb87ee

/*

  Define clearDB function that will loop through all
  the collections in our mongoose connection and drop them.
*/
function clearDB(mongoose, done) {
  for (let i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {})
  }
  return done()
}


beforeEach(function(done) {
  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      function(err) {
        if (err) {
          throw err
        }
        return clearDB(mongoose, done)
      }
    )
  }
})

afterEach(function(done) {
  mongoose.disconnect()
  return done()
})

afterAll(done => {

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      function(err) {
        if (err) {
          throw err
        }
        console.log('Finishing stuffs now')
        return clearDB(mongoose, done)
      }
    )
  }
  return done()
})

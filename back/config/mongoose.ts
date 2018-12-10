const mongoose = require('mongoose')
const Bluebird = require('bluebird')
const env = process.env.NODE_ENV

interface IConfig {
  url?: string
}

const config: IConfig = { }

switch(env){
  case 'development':
    config.url = 'mongodb://127.0.0.1:27017/planOtterPOC_development'
    break
  default:
    console.log('Missing env!')
    process.exit()
}
mongoose.set('debug')
mongoose.Promise = Bluebird

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.url);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

export default function (cb?: () => void){
  mongoose.connect(config.url, cb)
  return mongoose
}

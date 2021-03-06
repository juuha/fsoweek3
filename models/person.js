const mongoose = require('mongoose')
const Schema = mongoose.Schema

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new Schema({ name: String, number: String, id: String })

personSchema.statics.format = function format (person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
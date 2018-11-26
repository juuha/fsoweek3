const mongoose = require('mongoose')
const Schema = mongoose.Schema

const url = `mongodb://fsouser123:supersecret123@ds139690.mlab.com:39690/puhelinnumerodb`

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
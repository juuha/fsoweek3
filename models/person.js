const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = process.env.fsoweek3user || '<username>'
const pass = process.env.fsoweek3pass || '<password>'

const url = `mongodb://${user}:${pass}@ds139690.mlab.com:39690/puhelinnumerodb`

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
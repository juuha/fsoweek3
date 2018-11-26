const mongoose = require('mongoose')

const user = process.env.fsoweek3user || '<username>'
const pass = process.env.fsoweek3pass || '<password>'

const url = `mongodb://${user}:${pass}@ds139690.mlab.com:39690/puhelinnumerodb`

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

switch (process.argv.length){
case 2:
  console.log('puhelinluettelo:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  break
case 4:

  person
    .save()
    .then( () => {
      console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
      mongoose.connection.close()
    })
  break
default:
  console.log('Syötä 0 tai 2 parametriä.')
  mongoose.connection.close()
}



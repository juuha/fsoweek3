const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
]

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(pers => pers.id === id)

  if (person){
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined ){
    return res.status(400).json({error: 'name is missing'})
  } else if (body.number === undefined) {
    return res.status(400).json({error: 'number is missing'})
  } else if (persons.find(pers => pers.name === body.name)) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1234567890)
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(pers => pers.id !== id)

  res.json(persons)
})

app.get('/info', (req, res) => {
  const henkilot = persons.length
  res.send(
    `
    <p>puhelinluettelossa ${henkilot} henkilön tiedot</p>
    <p>${new Date()}</p>
    `
  )
})

const port = 3001
app.listen(port, () => {
  console.log('Server running on port 3001')
})
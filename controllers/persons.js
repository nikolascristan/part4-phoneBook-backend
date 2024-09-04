const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const person = new Person({
    name: `${body.name}`,
    number: `${body.number}`
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

module.exports = personsRouter
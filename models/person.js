const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  //required: true
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log('transformation happened')
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
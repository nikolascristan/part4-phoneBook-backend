const mongoose = require('mongoose')

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url =
`mongodb+srv://nik:${password}@cluster0.omph99c.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: `${name}`,
  number: `${number}`
})

if (process.argv[2].length<3) {
  console.log('please give password')
  process.exit(1)
}

mongoose.set('strictQuery',false)
mongoose.connect(url)
if (process.argv[3] && process.argv[4]) {
  person.save().then(result => {
    //console.log(result)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}   else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}



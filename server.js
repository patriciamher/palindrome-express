const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const port = 3500
var db, collection;

const url = "mongodb+srv://hernandezpatriciam:<password>@cluster0.pu5jnrf.mongodb.net/?retryWrites=true&w=majority";
const dbName = "palindrome";

app.listen(port, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log(`Listening to port $${port}`);
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('words').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {word: result})
  })
})

app.post('/words', (req, res) => {
  const input = req.body.word

  let result

  const palindromeResults = input.toLowerCase() === input.split('').reverse().join('').toLowerCase()

  //if else statement from palindrome
  if(palindromeResults){
    result = 'Yeup, looks like a palindrome!'
  }else{
    result = 'Nope'
  }

  db.collection('words').insertOne({word: req.body.word, result: result}, (err, result) => {
    if (err) return console.log(err)
    console.log(result)
    // console.log('saved to database')
    res.redirect('/')
  })
})
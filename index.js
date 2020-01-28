const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const CharSelect = require('./CharChoice');
const Dialogue = require('./Dialogue');
const ItemDB = require('./ItemDB');

const app = express();
app.use(cors());


app.get('/chars', ( req, res ) => {

  res.json(CharSelect) 
})

app.get('/response', ( req, res ) => {
  let { who } = req.query
  let speaker = Dialogue.filter(a => a.who === who )
  
  res.send(speaker[0])
})

app.get('/info', ( req, res ) => {
  let { item } = req.query
  let info = ItemDB.filter(search => search.name === item)
  
  res.json(info);
})

app.post('/inventory', jsonParser, (req, res) => {

  let inventory = req.body;

  console.log(inventory)
  res.send();

})

app.listen(1234, () => {
  console.log('server is up on port 1234')
})
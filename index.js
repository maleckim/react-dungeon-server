const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const CharSelect = require('./CharChoice');
const Dialogue = require('./Dialogue');
const ItemDB = require('./ItemDB');

const app = express();
app.use(cors());

let inventory = [];

app.get('/chars', (req, res) => {

  res.json(CharSelect)
})

app.get('/response', (req, res) => {
  let { who } = req.query
  let speaker = Dialogue.filter(a => a.who === who)

  res.send(speaker[0])
})

app.get('/info', (req, res) => {
  let { item } = req.query
  let info = ItemDB.filter(search => search.name === item)
  console.log(info[0].description)
  res.json(info[0].description);
})

app.post('/inventory', jsonParser, (req, res) => {

  let { data } = req.body;
  if (!inventory.includes(data)) {
    inventory.push(data);
  }

  res.json(inventory);
})

app.listen(1234, () => {
  console.log('server is up on port 1234')
})
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, error => {
  if(error) throw error;
  console.log('Your server is running on port 5000')
})

app.post('/payment', async(req, res) =>{
  let status, error;
  const {token, amount} = req.body;
  console.log(token)
})

require('dotenv').config();

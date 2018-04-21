const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// set up express app
const app = express();


//connect to the db
mongoose.connect('mongodb://localhost/tododb');
mongoose.Promise = global.Promise;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// bodyparser for req.body 
app.use(bodyParser.json());



//init routes
app.use('/api', require('./routes/api'));



//error middleware
app.use(function(err, req, res, next){
  res.status(422).send({});  
});



// listen for reqs
app.listen(4000, function(){
  console.log('ok');
});
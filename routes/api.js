const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

//get request
router.get('/todos', function(req, res, next){
  Todo.find({}).then(function(todos){
    res.send(todos)
  });
});

//post request
router.post('/todos', function(req, res, next){
  Todo.create(req.body).then(function(){
    Todo.find({}).then(function(todos){
      res.send(todos)
    });
  })
  .catch(next);  
});

//put request
router.put('/todos/:id', function(req, res, next){
  Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Todo.find({}).then(function(todos){
      res.send(todos)
    });
  }); 
});

//delete request
router.delete('/todos/:id', function(req, res, next){
  Todo.findByIdAndRemove({_id: req.params.id}).then(function(){
    Todo.find({}).then(function(todos){
      res.send(todos)
    });
  });  
});








module.exports=router;
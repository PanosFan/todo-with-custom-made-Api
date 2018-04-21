const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create todo Schema and model
const TodoSchema = new Schema({
  todo: {
    type: String,
    required:[true, 'todo is required']
  },
  __v: { type: Number, select: false}
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
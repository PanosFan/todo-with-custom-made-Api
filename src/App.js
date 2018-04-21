import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import './app.css';


class App extends Component {

  state = {
    task: [],
    input: ''
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/todos')
    .then(response => {      
      this.setState({
        task: response.data
      });
    })
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  addTodo = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/todos', {
      todo: this.state.input
    })
    .then(res => {      
      this.setState({
       task: res.data,
       input: ""
      });    
    });    
  }

  deleteTodo = (id) => {
    axios.delete(`http://localhost:4000/api/todos/${id}`)
    .then(res => {      
      this.setState({
        task: res.data
      });
    });
  }


  render() {
    return (
      <div className="App">
        <div className="container-fluid">        
          <form onSubmit={this.addTodo}>
            <input onChange={this.handleInputChange} value={this.state.input} type="text" placeholder="Enter new todo"/>
            <button type="submit">Add todo</button>            
          </form>
          <FlipMove staggerDelayBy={750} appearAnimation="accordionVertical" enterAnimation="fade" leaveAnimation="fade">
          {this.state.task.map((item, index) => {
            return(
              <div className="custom" onClick={() => this.deleteTodo(item._id)} key={index}>{item.todo}</div>
            );
          })}
          </FlipMove>       
        </div>                
      </div>
    );
  }
}

export default App;

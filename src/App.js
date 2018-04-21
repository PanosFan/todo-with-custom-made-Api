import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import './app.css';


class App extends Component {

  state = {
    todo: [],
    input: ''
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/todos')
    .then(response => {
      console.log(response);
      this.setState({
        todo: response.data
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
    let copy = this.state.todo.slice();
    copy.push(this.state.input);
    this.setState({
      todo: copy,
      input: ""
    })
  }

  deleteTodo = (i) => {
    let copy = this.state.todo.slice();
    copy.splice(i, 1);
    this.setState({
      todo: copy
    })
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
          {this.state.todo.map((item, index) => {
            return(
              <div className="custom" onClick={() => this.deleteTodo(index)} key={index}>{item.todo}</div>
            );
          })}
          </FlipMove>       
        </div>                
      </div>
    );
  }
}

export default App;

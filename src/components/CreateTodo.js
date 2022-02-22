import axios from 'axios';
import React, { Component } from 'react'
import styles from '../styles/CreateTodo.css';

class CreateTodo extends Component {
  state = {todo : ""}
  
  getTodo = (event) => {
    var todo = event.target.value;
    this.setState({todo:todo});
  }
  submitTodo = (event) => {
      event.preventDefault();
      const description = this.state.todo;
      this.props.onSubmitTodo(description);
      this.setState({todo:""});
  }
  render() {
    return (
      <div>
          <form className = 'ui form' >
              <div className='divStyle'>
                <label>Enter the work to be done:</label>
                <input type = 'text' placeholder='Enter the task' value = {this.state.todo} onChange={this.getTodo}/>
              </div>
              
              <button className = 'buttonStyle btn btn-default' type = 'submit' onClick={this.submitTodo}>Add</button>
          </form>
      </div>
    )
  }
}

export default CreateTodo

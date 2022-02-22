import axios from 'axios';
import React, { Component } from 'react'
import styles from '../styles/TodoList.css';
import Edit from './Edit';

class TodoList extends Component {
    
  removeTodo = (todo_id) => {
    this.props.deleteTodo(todo_id);
  }
  completedTask = (todo,event) => {
      if(this.props.showAll){
          const element = event.target;
          element.classList.toggle("crossed-line")
      }
      todo.completed = !todo.completed;
      this.props.completedTask(todo);
  }

  editTodo = (todo) => {
      this.props.onEdit(todo);
  }
  
  render() {
        const todos = this.props.todos.map(todo => {
        if(todo.completed && this.props.showAll){
            return (
                <div className='divStyle' key={todo.todo_id}>
                    <div className='ui three column very relaxed grid'>
                        <div className='column'>
                            <p className='crossed-line item' onClick={(event)=>this.completedTask(todo,event)}>{todo.description}</p>
                        </div>
                        <div className='column'>
                            <Edit todo = {todo} onEdit = {this.editTodo}/>
                        </div>
                        <div className='column'>
                            <button className = 'btn btn-danger' type='submit' onClick = {()=>this.removeTodo(todo.todo_id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            console.log(todo);
            return (
                <div className='divStyle' key={todo.todo_id}>
                    <div className='ui three column very relaxed grid'>
                        <div className='column'>
                            <p className='item' onClick={(event)=>this.completedTask(todo,event)}>{todo.description}</p>
                        </div>
                        <div className='column'>
                            <Edit todo = {todo} onEdit = {this.editTodo}/>
                        </div>
                        <div className='column'>
                            <button className = 'btn btn-danger' type='submit' onClick = {()=>this.removeTodo(todo.todo_id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
        
    })
    return (
      <div>
          <div className='divStyle'>
            <p>No of tasks : {this.props.todos.length}</p>
          </div>
          {todos}
      </div>
    )
  }
}

export default TodoList

import React, { Component } from 'react'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList';
import styles from '../styles/App.css'


class App extends Component {
  state = {
      todoList : [],
      activeTodoList : [],
      completed: [],
      showAll: false,
      showActive: false,
      showCompleted: false,
  }

  addTodo = (todo) =>{
      const index = this.state.todoList.length;
      const newTodo = {"todo_id":index+1,"description":todo, "completed":false}
      this.setState({
          todoList : [...this.state.todoList, newTodo],
          activeTodoList: [...this.state.activeTodoList,newTodo],
      })
  }
  
  delete = (id) => {
    var newList = this.state.todoList.filter(todo => todo.todo_id!==id);
    
    this.setState({
        todoList:newList,
        activeTodoList:newList
    });
  }
  complete = (todoToBeRemoved) => {
    let isActive = todoToBeRemoved.completed;
    var newList = this.state.todoList; 
    for(var i=0;i<newList.length;i++){
      if(newList[i].todo_id === todoToBeRemoved.todo_id ){
        newList[i] = todoToBeRemoved;
      }
    }
    var updatedList;
    if(isActive){
      updatedList = this.state.activeTodoList.filter(todo => todo.todo_id!==todoToBeRemoved.todo_id);
    }
    else{
      updatedList = [...this.state.activeTodoList,todoToBeRemoved]
    }

    var completedList;
    if(!isActive){
      completedList = this.state.completed.filter(todo => todo.todo_id !== todoToBeRemoved.todo_id);
    }
    else{
      completedList = [...this.state.completed,todoToBeRemoved];
    }
    
    this.setState({
        activeTodoList:updatedList,
        todoList:newList,
        completed: completedList
    });
  }
  showAll = () => {
    this.setState({
        showAll : true,
        showActive : false,
        showCompleted : false,
    })
  }

  showActive = () => {
      this.setState({
          showActive : true,
          showAll : false,
          showCompleted : false,
      })
  }

  showCompleted = () => {
      this.setState({
          showActive : false,
          showAll : false,
          showCompleted : true,
      })
  }

  edit = (value,index,todo) => {
    var newList = this.state.todoList; 
    todo.description = value;
    for(let i=0;i<newList.length;i++){
      if(newList[i].todo_id === todo.todo_id ){
        newList[i] = todo;
      }
    }
    var updatedList = this.state.activeTodoList;
    for(let i=0;i<updatedList.length;i++){
      if(updatedList[i].todo_id === todo.todo_id ){
        updatedList[i] = todo;
      }
    }

    var completedList = this.state.completed;
    for(let i=0;i<completedList.length;i++){
      if(completedList[i].todo_id === todo.todo_id ){
        completedList[i] = todo;
      }
    }

    this.setState({
      todoList:newList,
      activeTodoList:updatedList,
      completed: completedList,  
    })
  }

  render() {
    return (
      <div className='divStyle'>
          <div className='center'>
            <h1 className='textStyle'>To-Do</h1>
          </div>
          
          <CreateTodo onSubmitTodo = {this.addTodo}/>
          <button className='buttonstyle btn btn-default' type = 'submit' onClick={this.showAll}>Display All Tasks</button>
          <button className='buttonstyle btn btn-default' type = 'submit' onClick={this.showActive}>Display Active Tasks</button>
          <button className='buttonstyle btn btn-default' type = 'submit' onClick={this.showCompleted}>Display Completed Tasks</button>
          {
              this.state.showAll && <TodoList showAll = {true} todos = {this.state.todoList} completedTask = {this.complete} deleteTodo = {this.delete} onEdit = {this.edit}/>
          }
          {
              this.state.showActive && <TodoList showAll = {false} todos = {this.state.activeTodoList} deleteTodo = {this.delete}/>
          }
          {
              this.state.showCompleted && <TodoList showAll = {false} todos = {this.state.completed} deleteTodo = {this.delete}/>
          }
          
      </div>
    )
  }
}

export default App

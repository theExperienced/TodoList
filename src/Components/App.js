import React, { Component } from "react";
import List from "./List";
import AddTodo from "./AddTodo";
import "../CSS/App.css";

import _ from "lodash";

class App extends Component {
  state = {
    todos: []
  };

  onSubmitTodo = newTodo => {
    const now = new Date();
    const id = this.generateId(now);
    this.setState({
      todos: [
        {
          id: id,
          date: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
          content: newTodo,
          done: false
        },
        ...this.state.todos
      ]
    });
  };

  generateId = date => {
    const id = [date.getMilliseconds(), date.toLocaleDateString()].join("");

    return id;
  };

  onTodoOperation = (operation, id, content = null) => {
    const currentTodos = [...this.state.todos];
    const indexWanted = _.findIndex(currentTodos, todo => todo.id === id);
    if (operation === "edit") {
      currentTodos[indexWanted].content = content;
    } else if (operation === "toggleDone") {
      currentTodos[indexWanted].done = !currentTodos[indexWanted].done;
    } else {
      currentTodos.splice(indexWanted, 1);
    }

    this.setState({
      todos: currentTodos
    });
  };
  // onToggleDone = id => {
  //
  //     .done;
  //   this.setState({
  //     todos: currentTodos //[].concat(currentTodos)
  //   });
  // };

  // onTodoRemoveClick = id => {
  //   const currentTodos = [...this.state.todos];
  //   const indexToRemove = _.findIndex(currentTodos, todo => todo.id == id);
  //

  // };

  // onTodoEditClick = (id, content) => {
  //   const currentTodos = [...this.state.todos];
  //   const indexToRemove = _.findIndex(currentTodos, todo => todo.id == id);
  //

  //   this.setState({
  //     todos: currentTodos
  //   });

  // }

  render() {
    return (
      <div className="container">
        <AddTodo onSubmit={this.onSubmitTodo} shrink={this.state.todos.length ? true : false} />
        {this.state.todos.length !== 0 ? (
          <List
            onTodoOperation={this.onTodoOperation}
            todos={this.state.todos}
          />
        ) : (
          <div className="heading-container">
            <h1 className="heading">Todo List</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;

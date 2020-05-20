import React, { Component } from "react";
import Todo from "./Todo";
import "../CSS/List.css";

class List extends Component {
  renderUndoneList() {
    return this.renderList(false);
  }

  renderDoneList() {
    return this.renderList(true);
  }

  renderList(isDone) {
    let indexOfFirstRelevantTodo = -1;
    return this.props.todos.map((todo, index) => {
      if (todo.done === isDone) {
        if (indexOfFirstRelevantTodo === -1) {
          indexOfFirstRelevantTodo = index;
        }
        return (
          <>
            {indexOfFirstRelevantTodo === index ? (
              <li className={`list-heading list-heading-${!isDone ? 'un' : ''}done`}>
                <h2>{`${!isDone ? 'Undone' : 'Done'}`}</h2>
              </li>
            ) : null}
            <li key={todo.id} className="todo-item">
              <Todo todo={todo} onTodoOperation={this.props.onTodoOperation} />
            </li>
          </>
        );
      }
      return null;
    });
  }

  render() {
    let doneListNotEmpty = false;
    for (let i = 0; i < this.props.todos.length; i++) {
      if (this.props.todos[i].done) {
        doneListNotEmpty = true;
        break;
      }
    }

    return (
      <div className="list-complex">
        <ul className="list list-undone">{this.renderUndoneList()}</ul>
        <ul className="list list-done">{this.renderDoneList()}</ul>
      </div>
    );
  }
}

export default List;

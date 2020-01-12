import React, { Component } from "react";
import "../CSS/Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.todoRef = React.createRef();
  }
  state = {
    editing: false,
    value: ""
  };
  renderEditButton() {
    if (!this.props.todo.done) {
      return (
        <button
          className="todo-edit-button"
          onClick={() => {
            if (!this.state.editing) {
              this.setState({ editing: true });
            }
          }}
        >
          <i className="fas fa-pencil-alt fa-2x"></i>
        </button>

        //   () => this.props.onTodoOperation('edit', (this.props.todo.id), content)
      );
    }
  }

  renderParagraphOrInput() {
    if (this.state.editing) {
      return (
        <form
          className="todo-content-editing-form"
          onSubmit={e => {
            e.preventDefault();
            // console.log('E>TRAGET>VALUE', e.target.value)
            if (
              this.state.value !== undefined &&
              this.state.value.trim() !== ""
            ) {
              this.props.onTodoOperation(
                "edit",
                this.props.todo.id,
                this.state.value
              );
              this.setState({ editing: false });
            }
          }}
        >
          <input
            type="text"
            className="todo-content-editing-input"
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onBlur={() => {
              this.setState({ editing: false });
            }}
            ref={this.inputRef}
          />
        </form>
      );
    }
    return <p className="todo-content">{this.props.todo.content}</p>;
  }

  //   componentDidMount() {
  //     if
  //   }

//   componentDidMount() {

//     const vh = window.innerHeight;

//     const clientRect = this.todoRef.current.getBoundingClientRect();
//     const { top, bottom, height } = clientRect;
//     const middleFromMiddle = top => vh / 2 ?                   //@#%%$&^*$%#^$#%$&$consider the =>        !!!!#$^&$&$%#^#%
//     top + height / 2 :
//     bottom + height / 2;
//     const zoom = 0.5 + middleFromMiddle / (vh / 2);

//     this.todoRef.current.style = {transform: `scale(${zoom})`};


//   }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      this.setState({ value: this.props.todo.content });
      console.log(this.state);
      this.inputRef.current.focus();
    }
  }

  render() {

    return (
      <div className={`todo${this.props.todo.done ? " done" : ""}`} ref={this.todoRef} >
        <div className="todo-main">
          <p className="todo-date">{this.props.todo.date}</p>
          {this.renderParagraphOrInput()}
        </div>
        {/* <div className="todo-button-group"> */}
        <div className="todo-button-group">
          {this.renderEditButton()}
          <button
            className="todo-done-button"
            onClick={() =>
              this.props.onTodoOperation("toggleDone", this.props.todo.id)
            }
          >
            {this.props.todo.done ? (
              <i className="fas fa-times fa-2x"></i>
            ) : (
              <i className="fas fa-check fa-2x"></i>
            )}
          </button>
          <button
            className="todo-discard-button"
            onClick={() =>
              this.props.onTodoOperation("remove", this.props.todo.id)
            }
          >
            <i className="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;

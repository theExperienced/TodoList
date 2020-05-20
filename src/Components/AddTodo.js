import React, { Component } from "react";
import "../CSS/AddTodo.css";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    value: ""
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() !== "") {
      this.props.onSubmit(this.state.value);
      this.setState({ value: "" });
      this.myRef.current.focus();
    }
  };

  render() {
    return (
      <div className={`todo-container ${this.props.shrink ? 'shrink-on-focus-out' : ''}`}>
        <form className="todo-form" onSubmit={this.onSubmit}>
          <span className="todo-span">
            <input
              className={`todo-input ${this.props.shrink ? 'shrink-on-focus-out' : ''}`}
              ref={this.myRef}
              value={this.state.value}
              spellcheck="false"
              onChange={this.onChange}
              // onKeyDown{}
              type="text"
              placeholder="Touch Me..."
            />
          </span>
          <button
            className={`add-todo-button add-todo-button${
              this.state.value !== undefined && this.state.value.trim() !== ""
                ? "-enabled"
                : "-disabled"
            }`}
            type="submit"
          >
            +
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;

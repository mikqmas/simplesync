import React from 'react';
import { Button } from 'react-bootstrap'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }
  handleDelete(e) {
    this.props.deleteTodo(this.props.todo);
  }
  handleCompleted(e) {
    e.preventDefault;
    if(this.props.todo.done == false) {
      this.props.todo.done = true;
    }else {
      this.props.todo.done = false;
    }
    this.props.updateTodo(this.props.todo);
  }
  render() {
    const {todo} = this.props;
    const {title, done} = todo;
    return (
        <li>
          <Button onClick={this.handleCompleted}>{done ? "done" : "undone"}</Button>{this.props.todo.title}
          <input type="submit" onClick={this.handleDelete}></input>
        </li>
    )
  }
}

export default TodoListItem;

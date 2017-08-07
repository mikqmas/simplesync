import React from 'react';
import merge from 'lodash/merge';

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
    const toggledTodo = merge({}, this.props.todo, {
      done: !this.props.todo.done
    });
    this.props.updateTodo(toggledTodo);
  }

  render() {
    const {title, done} = this.props.todo;
    return (
        <li class="task_items">
            <input type="button" onClick={this.handleCompleted} value={done ? "done" : "undo"}/>{title}
            <input type="button" value="delete" onClick={this.handleDelete} />
        </li>
    )
  }
}

export default TodoListItem;

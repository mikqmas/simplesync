import React from 'react';
import merge from 'lodash/merge';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    const {title, body, done} = this.props.todo;
    this.state = {
      "title": title,
      "body": body,
      "done": done
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.selectedItem(this.props.todo.id);
  }

  render() {
    return (
        <li className="task_items" value={this.props.todo.id} onClick={this.handleClick}>
          <div>{this.state.title}</div>
        </li>
    )
  }
}

export default TodoListItem;

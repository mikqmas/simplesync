import React from 'react'

class TodoContent extends React.Component {
  constructor(props) {
    super(props);
    const {title, body, done} = this.props.todo;
    this.state = {
      "title": title,
      "body": body,
      "done": done
    };
    this.timeout = null;
    this.update = this.update.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  update(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.updateText();
      }, 300);
    });
  }
  handleDelete(e) {
    this.props.deleteTodo(this.props.todo);
  }
  handleCompleted(e) {
    e.preventDefault();
    const toggledTodo = merge({}, this.props.todo, {
      done: !this.props.todo.done
    });
    this.props.updateTodo(toggledTodo);
  }
  updateText() {
    console.log("UPDATED");
    const changedTodo = merge({}, this.props.todo, this.state);
    this.props.updateTodo(changedTodo);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.selectedItem(this.props.todo.id);
  }

  render() {
    return (
        <li className="task_items" value={this.props.todo.id} onClick={this.handleClick}>
            <input type="button" onClick={this.handleCompleted} value={this.state.done ? "done" : "undo"}/>
            <input type="button" value="delete" onClick={this.handleDelete} />
            <input type="text" onChange={this.update} name="title" value={this.state.title}/>
            <input type="text" onChange={this.update} name="body" value={this.state.body}/>
        </li>
    )
  }
}

export default TodoContent;
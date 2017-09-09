import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {merge} from 'lodash';
import {updateTodo, deleteTodo} from '../../actions/todo_actions';
import SubTask from './subtask';

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.todo = Object.keys(this.props.todos).length ? this.props.todos[props.match.params.id] : {};
    // this.state = {
    //   "title": this.todo.title,
    //   "body": this.todo.body,
    //   "done": this.todo.done
    // };
    this.timeout = null;
    this.update = this.update.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // this.todo = Object.keys(nextProps.todos).length ? nextProps.todos[nextProps.match.params.id] : {};

    // this.setState({
    //   "title": this.todo.title,
    //   "body": this.todo.body,
    //   "done": this.todo.done
    // });
  }

  update(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.updateText();
      }, 300);
    });
  }

  updateText() {
    console.log("UPDATED");
    const changedTodo = merge({}, this.todo, this.state);
    this.props.updateTodo(changedTodo);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.createSubTask()
  }

  render() {
    return (
      <div className="sub-tasks">
        <SubTask/>
      </div>
    )
  }
}


// <input type="text" onChange={this.update} name="title" value={this.state.title}/>
// <input type="text" onChange={this.update} name="body" value={this.state.body}/>
const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo))
});

const mapStateToProps = (state) => ({
  todos: state.todos
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail));

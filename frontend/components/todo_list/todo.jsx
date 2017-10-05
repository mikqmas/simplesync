import React from 'react';
import {connect} from 'react-redux';
import {withRouter, history} from 'react-router';
import { Link } from 'react-router-dom';
import {updateTodo, deleteTodo} from '../../actions/todo_actions';
import {fetchSubTasks} from '../../actions/sub_task_actions';

class Todo extends React.Component {
  constructor(props){
    super(props);
    const {id, title, body, done, list_order} = this.props.todo;
    this.state = {
      id: id,
      title: title,
      body: body,
      done: done,
      list_order: list_order
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleDelete(e) {
    e.preventDefault();
    this.props.deleteTodo(this.state);
    const todosArray = Object.keys(this.props.todos);
    if(todosArray.length === 1) {
      this.props.history.push(`/`);
    }else if(this.props.location.pathname.split("/")[1] == this.state.id) {
      let nextTodo = todosArray.indexOf(this.state.id.toString()) - 1;
      if(nextTodo < 0) {
        nextTodo = 1;
      }
      this.props.history.push(`/${todosArray[nextTodo]}`);
    }
  }
  handleCompleted(e) {
    e.preventDefault();
    this.setState({
      done: !this.state.done
    });
    this.props.updateTodo(this.state);
  }
  handleUpdate(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    }, () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(()=> {
        this.props.updateTodo(this.state);
      }, 500);
    });
  }
  handleClick(e) {
    this.props.fetchSubTasks(this.state.id);
  }
  render() {
    let bgColor, fontColor;
    if(this.props.location.pathname.split("/")[1] == this.state.id) {
      bgColor = "#00B1E1";
      fontColor = "#FFFFFF";
    }
    return(
      <Link to={`/${this.state.id}`} onClick={this.handleClick} >
        <li className="task_items" style={{backgroundColor:bgColor, color:fontColor}}>
          <i className="material-icons" onClick={this.handleCompleted}>{this.state.done ? "check_circle" : "done"}</i>
          <i className="material-icons" onClick={this.handleDelete}>delete</i>
          <input type="text" value={this.state.title} onChange={this.handleUpdate}/>
        </li>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  todos: state.todos,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  updateTodo: todo => dispatch(updateTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo)),
  fetchSubTasks: todoId => dispatch(fetchSubTasks(todoId))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo));

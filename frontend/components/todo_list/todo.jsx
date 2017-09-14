import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
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

  }
  handleDelete(e) {
    e.preventDefault();
    this.props.deleteTodo(this.state);
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
  render() {
    return(
      <Link to={`/${this.state.id}`} onClick={()=>{this.props.fetchSubTasks(this.state.id)}}>
        <li className="task_items">
          <input type="button" onClick={this.handleCompleted} value={this.state.done ? "done" : "undo"}/>
          <input type="button" value="delete" onClick={this.handleDelete} />
          <input type="text" value={this.state.title} onChange={this.handleUpdate}/>
        </li>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
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

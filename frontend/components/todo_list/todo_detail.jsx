import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {merge} from 'lodash';
import {fetchSubTasks, createSubTask} from '../../actions/sub_task_actions';
import {shareTodo, getTodo} from '../../actions/todo_actions';
import {allSubTasks} from '../../reducers/selectors';
import SubTask from './subtask';

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newSubTask: "", newUser: "", };
    this.handleNewSubTask = this.handleNewSubTask.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleNewSubTask(e) {
    e.preventDefault();
    this.props.createSubTask({todo_id: this.props.match.params.id, body: this.state.newSubTask, done: false, list_order: 0});
    this.setState({newSubTask: ""});
  }

  handleNewUser(e) {
    e.preventDefault();
    this.props.shareTodo({user_email: this.state.newUser, todo_id:this.props.match.params.id, permission: 0});
    this.setState({newUser: ""});
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const subTaskItems = () => (
      <ul>
        {
          this.props.subTasks.map(subTask => (
            <SubTask key={subTask.id} subTask={subTask}/>
          ))
        }
      </ul>
    )

    const users = () => (
      <ul>
        {
          this.props.todos[this.props.match.params.id].users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))
        }
      </ul>
    )

    return (
      <div className="sub-tasks">
        <div>{users()}</div>
        <input onChange={this.handleInput} name="newSubTask" type="text" placeholder="subtask..." value={this.state.newSubTask}/>
        <input type="button" onClick={this.handleNewSubTask} value="add" />

        <input onChange={this.handleInput} name="newUser" type="text" placeholder="user email..." value={this.state.newUser}/>
        <input type="button" onClick={this.handleNewUser} value="add" />
        <div>{subTaskItems()}</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createSubTask: subTask => dispatch(createSubTask(subTask)),
  shareTodo: shareUser => dispatch(shareTodo(shareUser)),
  getTodo: todoId => dispatch(getTodo(todoId))
});

const mapStateToProps = (state) => ({
  todos: state.todos,
  subTasks: allSubTasks(state)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail));

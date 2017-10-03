import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {merge} from 'lodash';
import {createSubTask, fetchSubTasks} from '../../actions/sub_task_actions';
import {createUserTodo, getTodo, deleteUserTodo} from '../../actions/todo_actions';
import {allSubTasks} from '../../reducers/selectors';
import SubTask from './subtask';

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newSubTask: "", newUser: ""};
    this.handleNewSubTask = this.handleNewSubTask.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }

  componentWillMount(){
    this.props.fetchSubTasks(this.props.match.params.id);
    // this.props.getTodo(this.props.match.params.id);
    // console.log(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps){

  }

  shouldComponentUpdate(nextProps, nextState) {
    return (Object.keys(nextProps.user).length > 0);
  }

  handleNewSubTask(e) {
    e.preventDefault();
    this.props.createSubTask({todo_id: this.props.match.params.id, body: this.state.newSubTask, done: false, list_order: 0});
    this.setState({newSubTask: ""});
  }

  handleCreateUser(e) {
    e.preventDefault();
    this.props.createUserTodo({user_email: this.state.newUser, todo_id:this.props.match.params.id, permission: 0});
    this.setState({newUser: ""});
  }

  handleRemoveUser(e) {
    e.preventDefault();
    this.props.deleteUserTodo({id: e.target.id, todo_id:this.props.match.params.id});
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    console.log(this.props.subTasks);
    const subTaskItems = () => (
      <ul>
        {
          this.props.subTasks.map(subTask => (
            <SubTask key={subTask.id} subTask={subTask}/>
          ))
        }
      </ul>
    )

    const users = () => {
      if(Object.keys(this.props.todos).length){
        return(
          <ul>
            {
              this.props.todos[this.props.match.params.id].users.map(user => {
                if(this.props.user.current_user.id === this.props.todos[this.props.match.params.id].owner_id) {
                  return(
                    <li key={user.id}>
                      <i className="material-icons" id={user.user_todo_id} onClick={this.handleRemoveUser}>delete</i>{user.username}
                    </li>
                  )
                }else {
                  return(
                    <li key={user.id}>
                      {user.username}
                    </li>
                  )
                }
              })
            }
          </ul>
      )} else {
        return (<div>test</div>)
      }
    }

    if(Object.keys(this.props.todos).length > 0) {
      return (
        <div className="sub-tasks">
          <div>{this.props.todos[this.props.match.params.id].title}</div>
          <div>{users()}</div>
          <input className="searchfield" onChange={this.handleInput} name="newSubTask" type="text" placeholder="subtask..." value={this.state.newSubTask}/>
          <i className="material-icons" title="add subtask" onClick={this.handleNewSubTask}>add_circle_outline</i>

          <input className="searchfield" onChange={this.handleInput} name="newUser" type="text" placeholder="user email..." value={this.state.newUser}/>
          <i className="material-icons" title="add user" onClick={this.handleCreateUser}>add_circle_outline</i>
          <div>{subTaskItems()}</div>
        </div>
      )
    }else {
      return(
        <div>rendering....</div>
      )
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createSubTask: subTask => dispatch(createSubTask(subTask)),
  fetchSubTasks: todoId => dispatch(fetchSubTasks(todoId)),
  createUserTodo: userTodo => dispatch(createUserTodo(userTodo)),
  deleteUserTodo: userTodo => dispatch(deleteUserTodo(userTodo)),
  getTodo: todoId => dispatch(getTodo(todoId)),
});

const mapStateToProps = (state) => ({
  todos: state.todos,
  subTasks: allSubTasks(state),
  user: state.user
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail));

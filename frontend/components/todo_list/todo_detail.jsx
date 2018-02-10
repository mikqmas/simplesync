import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {merge} from 'lodash';
import {clearErrors, receiveErrors} from '../../actions/error_actions';
import {createSubTask, fetchSubTasks} from '../../actions/sub_task_actions';
import {createUserTodo, getTodo, deleteUserTodo, deleteUserTodoAsOwner} from '../../actions/todo_actions';
import {allSubTasks} from '../../reducers/selectors';
import SubTask from './subtask';
import {ErrorList} from '../error';

class TodoDetail extends React.Component {
  constructor(props) {
    super(props);
    //newUser is deprecated as new user is created from input that doesn't save state.
    this.state = {newSubTask: "", newUser: ""};
    this.handleNewSubTask = this.handleNewSubTask.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleRemoveUserAsOwner = this.handleRemoveUserAsOwner.bind(this);
    this.newUserInput = this.newUserInput.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.todo;
    this.owner;
    this.users;
  }

  componentWillMount(){
    this.props.fetchSubTasks(this.props.match.params.id);
  }

  // componentWillUpdate(){
  //   debugger;
  //   if(Object.keys(this.props.todos).length > 0 && !this.props.todos[this.props.match.params.id]) {
  //     this.props.history.push(`/${(Object.values(this.props.todos)[0]).id}`);
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return (Object.keys(nextProps.user).length > 0);
  }

  componentWillUpdate(nextProps, nextState) {
    if(!!Object.keys(this.props.todos).length && nextProps != this.props){
      this.users = [];
      this.todo = this.props.todos[this.props.match.params.id];
      //TODO:: redirect to different page if nonexistant todo id is url param
      if(!!this.todo) {
        for(let i = 0; i < this.todo.users.length; i++) {
          if(this.todo.users[i].id == this.todo.owner_id) {
            this.owner = this.todo.users[i];
          }else {
            this.users.push(this.todo.users[i]);
          }
        }

        if(this.props.user.current_user.id !== this.todo.owner_id && !!document.getElementsByClassName('newUser')[0]) {
          document.getElementsByClassName('user-list')[0].removeChild(document.getElementsByClassName('newUser')[0]);
        }
      }


    }
  }

  handleNewSubTask() {
    this.props.createSubTask({todo_id: this.props.match.params.id, body: this.state.newSubTask, done: false, list_order: 0});
    this.setState({newSubTask: ""});
  }

  newUserInput(e) {
    e.preventDefault();
    if(!document.getElementsByClassName('newUser')[0]) {
      document.getElementsByClassName('add-icon')[0].innerHTML = 'remove_circle_outline';
      const el = document.createElement('input');
      el.type = 'text';
      el.placeholder = 'pepe.silvia@example.com';
      el.onkeydown = this.handleEnter;
      el.title = 'add user';
      el.value = this.state.newUser;
      el.className = 'newUser';
      const docEl = document.getElementsByClassName('user-list')[0].appendChild(el);
      docEl.focus();
    }else {
      document.getElementsByClassName('add-icon')[0].innerHTML = 'add_circle_outline';
      document.getElementsByClassName('user-list')[0].removeChild(document.getElementsByClassName('newUser')[0]);
    }
  }

  handleEnter(e) {
    if(e.target.value != "" && (e.key === 'Enter' || e.type === 'blur')) {
      e.preventDefault();
      switch(e.target.title) {
        case('add user'):
          // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const re = /.*/ //for testing allow all
          if(re.test(e.target.value.toLowerCase())) {
            this.handleCreateUser(e.target);
          }else {
            this.props.receiveErrors([e.target.value + " is not a valid email"]);
            // this.props.errors = {messages: [e.target.value + " is not a valid email"]}
            // TODO::error messaging need to input correct email. aka, send email with invitation email.
          }
          break;
        case('add subtask'):
          this.handleNewSubTask();
          break;
        default:
          break;
      }
    }
  }

  handleCreateUser(target) {
    this.props.createUserTodo({user_email: target.value, todo_id:this.props.match.params.id, permission: 0});
    target.value = '';
    // this.setState({newUser: ""});
  }

  handleRemoveUserAsOwner(e) {
    e.preventDefault();
    this.props.deleteUserTodoAsOwner({id: e.target.id, todo_id:this.props.match.params.id});
  }

  handleRemoveUser(e) {
    e.preventDefault();
    this.props.deleteUserTodo({id: e.target.id});
      // TODO implement this here;
      const todosArray = Object.keys(this.props.todos);
      if(todosArray.length <= 1) {
        this.props.history.push(`/`);
      }else {
        let nextTodo = todosArray.indexOf(this.props.match.params.id) - 1;
        if(nextTodo < 0) {
          nextTodo = 1;
        }
        this.props.history.push(`/${todosArray[nextTodo]}`);
      }
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }
  // const users = () => {
  //     return(
  //       <span>
  //         {
  //           todo.users.map(user => {
  //             const isOwner = this.props.user.current_user.id === todo.owner_id;
  //             const isMe = user.id === this.props.user.current_user.id;
  //             return (
  //               <a key={user.id} onClick={isOwner ? this.handleRemoveUser : null}>{user.username}</a>
  //             )
  //           })
  //         }
  //       </span>
  //     )
  //   }

  // subtask add button is deprecated.
  // <i className="material-icons add-icon" title="add subtask" onClick={this.handleNewSubTask}>add_circle_outline</i>
  // <i className="material-icons add-icon" style={{fontSize: "1.5em"}} onClick={(e) => {document.getElementsByClassName('subtask-input')[0].hidden = document.getElementsByClassName('subtask-input')[0].hidden ? false : true;}}>add_circle_outline</i>
  render() {
    function inviteToast() {
      // if(!!this.props.errors.length) {
      //   // const inviteToast = document.createElement('div');
      //   // <InviteToast email={this.props.errors.user_email}/>
      // }
    }

    function auto_grow(e) {
      e.target.style.height = "5px";
      e.target.style.height = (e.target.scrollHeight)+"px";
    }

    const subTaskItems = () => (
      <ul>
        {
          this.props.subTasks.map(subTask => (
            <SubTask key={subTask.id} subTask={subTask}/>
          ))
        }
      </ul>
    )

    const todoUsers = () => {
      const isOwner = this.props.user.current_user.id === this.todo.owner_id;
      if(isOwner) {
        return (
          <div className="user-list">Shared: {
              this.users.map(user => {
                return (<span key={user.id} className="user-name">{user.username}<i id={user.user_todo_id} className="material-icons remove-user" onClick={this.handleRemoveUserAsOwner}>cancel</i></span>);
              })
            }
            <i className="material-icons add-icon" title="add user" onClick={this.newUserInput}>add_circle_outline</i>
          </div>
        )
      } else {
        return(
          <div className="user-list">Shared: {
              this.users.map(user => {
                const isMe = user.id === this.props.user.current_user.id;
                return (<span key={user.id} className="user-name">{user.username}{isMe ? <i id={user.user_todo_id} className="material-icons remove-user" onClick={this.handleRemoveUser}>cancel</i> : null}</span>);
              })
            }
          </div>
        )
      }
    }

    if(!!this.todo) {
      return (
        <div className="sub-tasks">
          <h1 className="task-title" disabled={this.todo.done} style={this.todo.done ? {textDecoration: "line-through"} : {}}>{this.todo.title}</h1>
          <div className="shared-users-list">
            <div className="owner">Owner: <span className="user-name">{this.owner.username}</span></div>
            {todoUsers()}
          </div>
          <ErrorList errors={this.props.errors} clearErrors={this.props.clearErrors}/>
          <div className="subtask-add">
            <textarea className="subtask-input" onKeyUp={auto_grow} rows="1" onChange={this.handleInput} onKeyDown={this.handleEnter} onBlur={this.handleEnter} title="add subtask" name="newSubTask" type="text" placeholder="eg. Talk to Carol from HR..." value={this.state.newSubTask}/>
          </div>
          <div>
            {subTaskItems()}
          </div>
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
  deleteUserTodoAsOwner: userTodo => dispatch(deleteUserTodoAsOwner(userTodo)),
  getTodo: todoId => dispatch(getTodo(todoId)),
  clearErrors: () => dispatch(clearErrors()),
  receiveErrors: (errors) => dispatch(receiveErrors(errors)),
});

const mapStateToProps = (state) => ({
  todos: state.todos,
  subTasks: allSubTasks(state),
  user: state.user,
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetail));

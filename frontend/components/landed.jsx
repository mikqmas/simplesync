import React from 'react'
import {logout} from '../actions/user_actions';
import {createTodo, fetchTodos} from '../actions/todo_actions';
import {connect} from 'react-redux';
import TodoList from './todo_list/todo_list_container';
import TodoContent from './todo_list/todo_content';

import {withRouter} from 'react-router';
import {Link, Switch, Route} from 'react-router-dom';

class Landed extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodos().then(() => {
      const todoList = Object.keys(this.props.todos);
      const firstTodo = '/' + todoList[todoList.length - 1];
      this.props.history.push(firstTodo);
    });
  }

  handleLogout(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.logout()
    .then(() => {
      if(!this.props.user.current_user) {
        window.location.replace('/');
      }
    });
  }

  handleAdd(e) {
    e.preventDefault();
    const todo = {
      owner_id: this.props.user.current_user.id,
      title: "",
      body: "",
      done: false
    };
    this.props.createTodo({todo});
  }

  handleAccount(e) {
    e.preventDefault();
    e.target.children[0].style.display = e.target.children[0].style.display == "none" ? "flex" : "none";
  }

  render() {


    // if(!!Object.keys(this.props.todos).length && !this.props.match.params.id) {
    //   this.props.history.push('/' + Object.keys(this.props.todos)[0]);
    // }

    return (
      <div className="app">
        <div className="toolbar">
          <div className="toolbar_left">
            <input type="text" placeholder="search" className="searchfield noselect"></input>
            <span className="searchcancel"></span>
            <i className="material-icons" onClick={this.handleAdd} title="add note">add_circle_outline</i>
          </div>

          <div className="toolbar_right">
            <div className="headerlog">
              <div className="popover">
                <span id="user_account_menu">
                  <ul className="material-icons" onClick={this.handleAccount}>account_circle
                    <li id="profile" style={{display:"none", position:"absolute"}} onClick={this.handleLogout}>{this.props.user.current_user ?
                      this.props.user.current_user.username : "Logging Out"}</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="main_content">
          <div className="content_left">
            <TodoList />
          </div>

          <div className="content_right">
            <TodoContent />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchTodos: () => dispatch(fetchTodos()),
  createTodo: todo => dispatch(createTodo(todo))
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Landed));

import React from 'react'
import {logout} from '../actions/user_actions';
import {createTodo, fetchTodos} from '../actions/todo_actions';
import {connect} from 'react-redux';
import TodoList from './todo_list/todo_list_container';
import TodoContent from './todo_list/todo_content';
import Settings from './settings';

import {withRouter} from 'react-router';
import {Link, Switch, Route} from 'react-router-dom';

class Landed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"search": "", "modalIsOpen": false}
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.toggleAccount = this.toggleAccount.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodos().then(() => {
      const todoList = Object.keys(this.props.todos);
      const firstTodo = '/' + todoList[todoList.length - 1];
      this.props.history.push(firstTodo);
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

  toggleAccount(e) {
    let children;
    if(e.preventDefault == null) {
      children = Array.from(e.children);
    } else {
      e.preventDefault();
      children = Array.from(e.target.children);
    }
    const isOpen = children[0].style.display != "none";
    if(isOpen) {
      children.forEach((child) => {
        child.style.display = "none";
      })
    }else {
      children.forEach((child) => {
        child.style.display = "flex";
      })
    }
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({"search": e.target.value});
  }

  toggleModal(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggleAccount(e.target.parentElement);
    this.setState({"modalIsOpen": !this.state.modalIsOpen});
  }

  handleLogout(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggleAccount(e.target.parentNode);
    this.props.logout()
    .then(() => {
      if(!this.props.user.current_user) {
        window.location.replace('/');
      }
    });
  }

  render() {


    // if(!!Object.keys(this.props.todos).length && !this.props.match.params.id) {
    //   this.props.history.push('/' + Object.keys(this.props.todos)[0]);
    // }

    return (
      <div className="app">
        {this.state.modalIsOpen ? <Settings onClose={this.toggleModal}
          modalIsOpen={this.state.modalIsOpen} /> : null}
        <div className="toolbar">
          <div className="toolbar_left">
            <input type="text" placeholder="search" onChange={this.handleSearch} value={this.state.search} className="searchfield noselect"/>
            <span className="searchcancel"></span>
            <i className="material-icons" onClick={this.handleAdd} title="add note">add_circle_outline</i>
          </div>

          <div className="toolbar_right">
            <span id="user_account_menu">
              <ul onClick={this.toggleAccount} className="profile_icon">{this.props.user.current_user ?
                this.props.user.current_user.username : "Logging Out"}
                <li id="profile" style={{"display": "none"}} onClick={this.handleLogout}>Logout</li>
                <li id="settings" style={{"display": "none"}} onClick={this.toggleModal}>Settings</li>
              </ul>
            </span>
          </div>
        </div>

        <div className="main_content">
          <div className="content_left">
            <TodoList search={this.state.search}/>
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

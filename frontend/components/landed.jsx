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
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout().then(() => {
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

  render() {
    return (
      <div className="app">
        <div className="toolbar">
          <div className="toolbar_left">
            <input type="text" className="searchfield"></input>
            <span className="searchcancel"></span>
            <a onClick={this.handleAdd} title="add note" className="addnote">Add</a>
          </div>

          <div className="toolbar_right">
            <div className="headerlog">
              <div className="popover">
                <span id="user_account_menu">
                  <a id="profile" onClick={this.handleLogout}>{this.props.user.current_user ?
                    this.props.user.current_user.username : "Logging Out"}</a>
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
  user: state.user
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

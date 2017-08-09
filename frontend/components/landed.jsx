import React from 'react'
import {logout} from '../actions/user_actions';
import {connect} from 'react-redux';
import TodoList from './todo_list/todo_list_container';
import TodoContent from './todo_list/todo_content';

class Landed extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout().then(() => {
      if(!this.props.user.current_user) {
        window.location.replace('/');
      }
    });
  }

  render() {
    return (
      <div>
        <a onClick={this.handleLogout}>{this.props.user.current_user ?
            this.props.user.current_user.username : "Logging Out"}</a>
        <TodoList />
        <TodoContent />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landed);

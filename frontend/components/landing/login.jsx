import {connect} from 'react-redux';
import React from 'react';
import {updateUser, login} from '../../actions/user_actions';
import {ErrorList} from '../error';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  handleSignup(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.createUser({user}).then(
      this.setState({
        username: "",
        password: ""
      }) // reset form
    );
  }

  handleLogin(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login({user}).then(() => {
      if(this.props.user.current_user) {
        window.location.replace("/");
      }
      this.setState({
        username: "",
        password: ""
      });
    }
    );
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout().then(
      this.setState({
        username: "",
        password: ""
      })
    );
  }

  render() {
    return (
      <div className="login_page">
        <ErrorList errors={this.props.errors}/>
          <form className="log-form">
            <input
              className="login_input"
              ref="username"
              value={this.state.username}
              placeholder="email"
              onChange={this.update('username')}
              required/>
            <input
              type="password"
              className="login_input"
              ref="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.update('password')}
              required/>
            <button className="login-button" id='login' onClick={this.handleLogin}>LogIn</button>
          </form>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

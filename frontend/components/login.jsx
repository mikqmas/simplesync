import {connect} from 'react-redux';
import React from 'react';
import {createUser, updateUser, login, logout} from '../actions/user_actions';
import {ErrorList} from './error';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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
    this.props.login({user});
  }

  render() {
    return (
      <div>
        <ErrorList errors={this.props.errors}/>
          <form className="log-form">
            <label>Username:
              <input
                className="input"
                ref="username"
                value={this.state.username}
                placeholder="username"
                onChange={this.update('username')}
                required/>
            </label>
            <label>Password:
              <input
                className="input"
                ref="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.update('password')}
                required/>
            </label>
            <button className="create-button" id='login' onClick={this.handleLogin}>LogIn</button>
            <button className="create-button" id='signup' onClick={this.handleSignup}>SignUp</button>
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
  createUser: user => dispatch(createUser(user)),
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

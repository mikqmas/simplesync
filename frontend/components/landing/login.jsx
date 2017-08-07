import {connect} from 'react-redux';
import React from 'react';
import {createUser, updateUser, login, logout} from '../../actions/user_actions';
import {ErrorList} from '../error';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.greeting = this.greeting.bind(this);
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

  greeting() {
    if(this.props.user.current_user) {
      return(<div>Hello, {this.props.user.current_user.username}</div>);
    }else {
      return(
        <div>
        <div>{this.props.user.current_user ? this.props.user.current_user.username : ""}</div>
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
            <button className="login-button" id='login' onClick={this.handleLogin}>LogIn</button>
            <button className="create-button" id='signup' onClick={this.handleSignup}>SignUp</button>
            <button className="logout-button" id='logout' onClick={this.handleLogout}>LogOut</button>
          </form>
          </div>
        )
    }
  }

  render() {
    return (
      <div>{this.greeting()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUser(user)),
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

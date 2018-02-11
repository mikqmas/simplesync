import {connect} from 'react-redux';
import React from 'react';
import {createUser, updateUser, login, logout} from '../../actions/user_actions';
import {ErrorList} from '../error';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    const idx = props.location.search.match(/\?invite=/);
    this.state = {
      username: idx ? props.location.search.substring(idx[0].length) : "",
      password:""
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  handleSignup(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.createUser({user}).then(() => {
      this.setState({
        username: "",
        password: ""
      }); // reset form
      this.handleLogin(this.props.user.current_user);
    });
  }

  handleLogin(user) {
    this.props.login(user).then(() => {
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

  greeting() {

      return(
        <div>
        <div>{this.props.user.current_user ? this.props.user.current_user.username : ""}</div>
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
            <button className="create-button" id='signup' onClick={this.handleSignup}>SignUp</button>
          </form>
          </div>
        )
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
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

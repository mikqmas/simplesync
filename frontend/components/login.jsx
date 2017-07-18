import {connect} from 'react-redux';
import React from 'react';
import {createUser, updateUser} from '../actions/user_actions';

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

  handleLogin(e) {
    e.preventDefault();
    debugger;
    const user = Object.assign({}, this.state);
    this.props.createUser({user}).then(
      this.setState({
        username: "",
        password: ""
      }) // reset form
    );
  }

  render() {
    return (
      <div>
        <div>{this.props.errors}</div>
          <form className="log-form" onSubmit={this.handleLogin}>
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
            <input type="submit" name="action" value="Signup" />
            <input type="submit" name="action" value="Login" />
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
  createUser: user => dispatch(createUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

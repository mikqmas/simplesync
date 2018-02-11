import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {deleteUser} from '../actions/user_actions';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.showEditPassword = this.showEditPassword.bind(this);
    this.handleEditEmail = this.handleEditEmail.bind(this);
    this.handleEditPassword = this.handleEditPassword.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  toggleEdit(e) {
    e.preventDefault();
    let display = e.target.nextSibling.style.display;
    if(display == "none") {
      e.target.nextSibling.style.display = "flex";
    } else {
      e.target.nextSibling.style.display = "none";
    }
  }

  showEditPassword(e) {
    e.preventDefault();
  }

  handleEditEmail(e) {
    e.preventDefault();
  }

  handleEditPassword(e) {
    e.preventDefault();
  }

  handleDeleteAccount(e) {
    e.preventDefault();
    debugger;
    this.props.deleteUser(this.props.user.current_user);
  }

  render() {
    if(!this.props.modalIsOpen) {
      return null;
    }


    return (
      <div className="modalBg">
        <div className="modal">
          <button id="closeButton" onClick={this.props.onClose}>
            Close
          </button>

          <h1>Email Address</h1>
          <a href="javascript:$(this).click();" style={{cursor:'pointer'}} onClick={this.toggleEdit}>EDIT</a>
            <div className="editSettings" style={{display: "none"}}>
              <span>New Email Address <input type="text"></input></span>
              <span>Confirm Email Address <input type="text"></input></span>
              <span>Password <input type="password"></input></span>
              <button onClick={this.handleEditEmail}>Change Email</button>
            </div>

          <h1>Password</h1>
          <a href="javascript:$(this).click();" style={{cursor:'pointer'}} onClick={this.toggleEdit}>EDIT</a>
            <div className="editSettings" style={{display: "none"}}>
              <span>Old Password <input type="password"></input></span>
              <span>New Password <input type="password"></input></span>
              <span>Confirm Password <input type="password"></input></span>
              <button onClick={this.handleEditPassword}>Change Password</button>
            </div>
          <h1>Delete Account</h1>
          <a href="javascript:$(this).click();" style={{cursor:'pointer'}} onClick={this.toggleEdit}>DELETE</a>
            <div className="editSettings" style={{display: "none"}}>
              <h2>Confirmation</h2>
              <span><input type="checkbox"/>Permanently delete my account</span>
              <span>Password <input type="password"></input></span>
              <button onClick={this.handleDeleteAccount}>Delete Account</button>
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
  deleteUser: () => dispatch(deleteUser())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings));

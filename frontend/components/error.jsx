import React from 'react';
import {createTodo} from '../actions/todo_actions';
import {createUser} from '../actions/user_actions';

export const ErrorList = ({errors, clearErrors}) => {
  if(errors.length === 0) return null;
  const errorItems = Object.values(errors).map(error => <li key={ error[0] }>{ error[1] }</li>);
  const newUser = Object.values(errors)[0][0];

  function handleInviteUser(e) {
    e.preventDefault();
    debugger
    $.ajax({
      method: 'POST',
      url: '/api/user/invite',
      data: {inviter: window.store.getState().user.current_user.username, email: newUser}
    }).done((response)=> {
      // console.log(response);
    }).error(() => {
    })
  }

  return(
    <ul className="error-list" style={{display:'flex', flexDirection:'row'}}>
      {errorItems}
      <div>
        <input type="button" name="invite" value="invite" onClick={handleInviteUser}/>
        <input type="button" name="close" value="close" onClick={clearErrors} />
      </div>
    </ul>
  )

};

import React from 'react';
import {createTodo} from '../actions/todo_actions';

export const ErrorList = ({errors, clearErrors}) => {
  if(errors.length === 0) return null;
  const errorItems = Object.values(errors).map(error => <li key={ error }>{ error }</li>);

  function handleInviteUser() {
    const todo = {
      owner_id: this.props.user.current_user.id,
      title: "",
      body: "",
      done: false
    };
    createTodo({todo});
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

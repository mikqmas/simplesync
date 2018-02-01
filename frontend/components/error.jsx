import React from 'react'

export const ErrorList = ({errors, clearErrors}) => {
  if(errors.length === 0) return null;
  const errorItems = Object.values(errors).map(error => <li key={ error }>{ error }</li>);

  return(
    <ul className="error-list" style={{display:'flex', flexDirection:'row'}}>
      {errorItems}
      <div>
        <input type="button" name="invite" value="invite"/>
        <input type="button" name="close" value="close" onClick={clearErrors} />
      </div>
    </ul>
  )
};

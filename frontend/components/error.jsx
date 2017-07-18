import React from 'react'

export const ErrorList = ({errors}) => {
  if(errors.length === 0) return null;
  const errorItems = Object.values(errors).map(error => <li key={ error }>{ error }</li>);

  return(
    <ul className="error-list">
      {errorItems}
    </ul>
  )
};

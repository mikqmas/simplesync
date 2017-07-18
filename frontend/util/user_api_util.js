export const createUser = user => (
  $.ajax({
    method: 'POST',
    url: '/api/user',
    data: user
  }).done((response)=> {
    console.log(response);
  })
);

export const updateUser = user => (
  $.ajax({
    method: 'PUT',
    url: '/api/user',
    data: user
  })
);

export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

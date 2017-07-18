const createUser = user => (
  $.ajax({
    method: 'POST',
    url: '/api/user',
    data: user
  }).done((response)=> {
    console.log(response);
  })
);

const updateUser = user => (
  $.ajax({
    method: 'PUT',
    url: '/api/user',
    data: user
  })
);

const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: {user},
    error(xhr){
      error("login", xhr.responseJSON);
    }
  })
);

const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session',
    error(xhr){
      error("logout", xhr.responseJSON);
    }
  })
);

export const fetchTodos = () => (
  $.ajax({
    method: 'GET',
    url: '/api/todos'
  })
);

export const getTodo = todoId => (
  $.ajax({
    method: 'GET',
    url: `/api/todos/${todoId}`
  })
);

export const createTodo = todo => (
 $.ajax({
    method: 'POST',
    url: '/api/todos',
    data: todo
  })
);

export const updateTodo = todo => (
  $.ajax({
    method: 'PUT',
    url: `/api/todos/${todo.id}`,
    data: {todo}
  })
)

export const deleteTodo = todo => (
  $.ajax({
    method: 'DELETE',
    url: `/api/todos/${todo.id}`
  })
)

export const shareTodo = newUser => (
  $.ajax({
    method: 'PUT',
    url: `/api/todos/${newUser.todo_id}`,
    data: {newUser}
  })
)

export const removeUserFromTodo = user => (
  $.ajax({
    method: 'PUT',
    url: `/api/todos/${user.todo_id}`,
    data: {user}
  })
)

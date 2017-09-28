export const createUserTodo = (userTodo) => (
  $.ajax({
    method: 'POST',
    url: `/api/todos/${userTodo.todo_id}/user_todos`,
    data: {userTodo}
  })
)

export const deleteUserTodo = (userTodo) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/todos/${userTodo.todo_id}/user_todos/${userTodo.id}`
  })
)

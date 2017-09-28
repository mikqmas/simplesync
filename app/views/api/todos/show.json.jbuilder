json.partial! 'api/todos/todos', locals: {todo: @todo}

# json.(@todo, :id, :title, :body, :done, :list_order, :created_at, :updated_at)
#
# json.users @todo.user_todos do |userTodo|
#   user = userTodo.user
#   json.id userTodo.user_id
#   json.username user.username
#   json.user_todo_id userTodo.id
#   json.is_owner userTodo.is_owner
# end
# json.userTodos @todo.user_todos
# json.userTodo do
#   json.array! @todo.user_todos, :id
# end

# json.userTodos do
#   json.id
# end
# json.title do
#   json.title @todo.title
#   json.body @todo.body
#   json.users @todo.users
#   json.userTodo @todo.user_todos
# end

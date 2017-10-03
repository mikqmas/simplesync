json.(todo, :id, :title, :body, :done, :list_order, :owner_id, :created_at, :updated_at)

json.users todo.user_todos do |userTodo|
  user = userTodo.user
  json.id userTodo.user_id
  json.username user.username
  json.user_todo_id userTodo.id
  json.is_owner userTodo.is_owner
end

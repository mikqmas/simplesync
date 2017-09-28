# json.array! @todos, partial: 'api/todos/todos', as: :todo
json.partial! 'api/todos/todos', collection: @todos, as: :todo

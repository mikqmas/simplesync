class Api::UserTodosController < ApplicationController
  def create
    # Update Share with new User
    todoId = userTodo_params['todo_id']
    permission = userTodo_params['permission']
    user = User.find_by_username(userTodo_params['user_email'])
    @todo = Todo.find_by_id(todoId)
    if user && !@todo.users.include?(user) && @todo.user_todos.create!({user_id: user.id, todo_id: todoId, permission: permission})
      render 'api/todos/show'
    elsif user && @todo.users.include?(user)
      render json: {messages: ["User #{userTodo_params['user_email']} already shared"]}, status: 422
    else
      render(
        json: {
          messages: ["User #{userTodo_params['user_email']} is not a teammate yet. Send this task and invite?"]
        },
        status: 422
      )
      # render(
      #   json: {
      #       messages: ["user does not exist"]
      #     },
      #     status: 422
      # )
    end
  end

  def destroy
    # userTodo = @todo.user_todos.find_by(user_id: userTodo_params['user_id'])
    userTodo = UserTodo.find_by_id(params['id'])
    @todo = Todo.find_by_id(userTodo.todo_id)
    if userTodo && !userTodo.is_owner && (current_user.id == userTodo.todo.owner.user_id || current_user.id == userTodo.user_id)
      userTodo.destroy()
      render 'api/todos/show'
    else
      render json: todo.errors.full_messages, status: 422
    end
  end

  private
  def userTodo_params
    params.require(:userTodo).permit(:id, :todo_id, :user_id, :user_email, :permission, :is_owner)
  end
end

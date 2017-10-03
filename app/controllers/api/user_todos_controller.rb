class Api::UserTodosController < ApplicationController
  def create
    # Update Share with new User
    todoId = userTodo_params['todo_id']
    permission = userTodo_params['permission']
    user = User.find_by_username(userTodo_params['user_email'])
    @todo = Todo.find_by(id: todoId)
    if user && !@todo.users.include?(user) && @todo.user_todos.create!({user_id: user.id, todo_id: todoId, permission: permission})
      render 'api/todos/show'
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def destroy
    # userTodo = @todo.user_todos.find_by(user_id: userTodo_params['user_id'])
    userTodo = UserTodo.find_by_id(params['id'])
    if userTodo && !userTodo.is_owner && current_user.id == userTodo.todo.owner.user_id
      userTodo.destroy()
      @todo = userTodo.todo
      puts @todo
      render 'api/todos/show'
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  private
  def userTodo_params
    params.require(:userTodo).permit(:id, :todo_id, :user_id, :user_email, :permission, :is_owner)
  end
end

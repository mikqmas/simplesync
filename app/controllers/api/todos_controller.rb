class Api::TodosController < ApplicationController
  def index
    @todos = current_user.todos
    render json: @todos.to_json(include: :users)
  end

  def create
    # //need to build create/new so that it has relation to update.
    @todo = current_user.todos.create(todo_params)
    if @todo.save
      @todo.user_todos.first.update_attribute(:is_owner, true)
      render json: @todo.to_json(include: :users)
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def show
    @todo = Todo.find_by(id: params[:id])
    if @todo
      render json: @todo.to_json(include: :users)
    else
      render json: nil, status: 422
    end
  end

  def update
    # Update Share with new User
    if(params[:newUser])
      todoId = newUser_params['todo_id']
      permission = newUser_params['permission']
      user = User.find_by_username(newUser_params['user_email'])
      @todo = Todo.find_by(id: todoId)
      if user && !@todo.users.include?(user) && @todo.user_todos.create!({user_id: user.id, todo_id: todoId, permission: permission})
        render json: @todo.to_json(include: :users)
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    # Update Todo
    if(params[:todo])
      @todo = Todo.find_by(id: params[:id])
      if @todo.update_attributes(todo_params)
        render json: @todo.to_json(include: :users)
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @todo = Todo.find_by(id: params[:id])
    if @todo && @todo.destroy
      render json: @todo
    else
      render json: nil, status: 422
    end
  end

  private
  def todo_params
    params.require(:todo).permit(:id, :title, :body, :done)
  end

  def newUser_params
    params.require(:newUser).permit(:todo_id, :user_id, :user_email, :permission, :is_owner)
  end
end

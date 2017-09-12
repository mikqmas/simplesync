class Api::TodosController < ApplicationController
  def index
    @todos = current_user.todos
    render json: @todos
  end

  def create
    # //need to build create/new so that it has relation to update.
    @todo = current_user.todos.create(todo_params)
    if @todo.save
      @todo.user_todos.first.update_attribute(:is_owner, true)
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def show
    @todo = Todo.find_by(id: params[:id])
    if @todo
      render json: @todo
    else
      render json: nil, status: 422
    end
  end

  def update
    @todo = Todo.find_by(id: params[:id])
    if @todo.update_attributes(todo_params)
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: 422
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
end

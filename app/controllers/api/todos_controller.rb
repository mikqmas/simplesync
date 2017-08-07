class Api::TodosController < ApplicationController
  def index
    @todos = current_user.todos
    render json: @todos
  end

  def create
    @todo = current_user.todos.new(todo_params)
    if @todo.save
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  def update
    @todo = Todo.find(params[:id])
    if @todo.update_attributes(todo_params)
      render json: @todo
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def destroy
    @todo = Todo.find(params[:id]).destroy
    render json: @todo
  end

  private
  def todo_params
    params.require(:todo).permit(:title, :body, :done)
  end
end

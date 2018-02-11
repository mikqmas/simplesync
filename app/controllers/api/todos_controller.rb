class Api::TodosController < ApplicationController
  before_action -> {check_token_or_log(params['token'])}, only: [:show, :create, :update, :delete]

  def index
    # specify current user if not signed in. if signed in, use current user
    if current_user
      @todos = current_user.todos
    elsif params['user']
      @todos = User.find_by_username(params['user']).todos
    else
      render json: nil, status: 422
      return
    end
    render :index
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
    # for current_user
    # do one for api users
    @todo = Todo.find_by(id: params[:todo_id])
    if @todo
      # render json: @todo.to_json(include: :users)
      render :show
    else
      render json: nil, status: 422
    end
  end

  def update
    @todo = Todo.find_by(id: params[:todo_id])
    if @todo.update_attributes(todo_params)
      render json: @todo.to_json(include: :users)
    else
      render json: @todo.errors.full_messages, status: 422
    end
  end

  def destroy
    @todo = Todo.find_by_id(params[:todo_id])
    if @todo && @todo.destroy
      render json: @todo
    else
      render json: nil, status: 422
    end
  end

  private
  def todo_params
    # require api and user in order to check if valid query
    params.require(:todo).permit(:todo_id, :title, :body, :done, :owner_id, :token)
  end
end

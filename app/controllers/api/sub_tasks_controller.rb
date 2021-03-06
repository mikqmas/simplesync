class Api::SubTasksController < ApplicationController
  before_action -> {check_token_or_log(params['token'])}

  def index
    render json: SubTask.where(todo_id: params['todo_id'])
  end

  def create
    @subtask = SubTask.create(subtask_params)
    if @subtask.save
      render json: @subtask
    else
      render json: @subtask.errors.full_messages, status: 422
    end
  end

  def show
    @subtask = SubTask.find_by(id: params[:subtask_id])
    if @subtask
      render json: @subtask
    else
      render json: nil, status: 422
    end
  end

  def destroy
    @subtask = SubTask.find_by(id: params[:subtask_id])
    debugger
    if @subtask.destroy
      render json: @subtask
    else
      render json: @subtask.errors.full_messages, status: 422
    end
  end

  def update
    @subtask = SubTask.find(params[:subtask_id])
    if @subtask.update_attributes(subtask_params)
      render json: @subtask
    else
      render json: @subtask.errors.full_messages, status: 422
    end
  end

  private
  def subtask_params
    params.require(:subTask).permit(:subtask_id, :todo_id, :body, :done, :list_order, :archived_time, :deleted_time)
  end
end

class Api::SubTasksController < ApplicationController
  def index
    render json: SubTask.find_by(subtask_params)
  end

  def create
    @subtask = SubTask.create(subtask_params)
    if @subtask.save
      render json: @subtask
    else
      render json: @subtask.errors.full_messages, status: 422
    end
  end

  def destroy
    subtask = SubTask.find_by(subtask_params).destroy
    render json: subtask
  end

  def update
    subtask = SubTask.find(params[:id])
    if subtask.update_attributes(subtask_params)
      render json: subtask
    else
      render json: subtask.errors.full_messages, status: 422
    end
  end

  private
  def subtask_params
    params.require(:subtask).permit(:id, :todo_id, :body, :done, :list_order, :archived_time, :deleted_time)
  end
end

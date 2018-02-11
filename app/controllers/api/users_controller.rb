
class Api::UsersController < ApplicationController
  before_action :require_no_user!, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      # Tell the UserMailer to send a welcome email after save
      UserMailer.welcome_email(@user).deliver_now
      # format.html { redirect_to(@user, notice: 'User was successfully created.') }

      login_user!(@user)
      # render json: @user
      redirect_to '/'
      # format.json { render json: @user, status: :created, location: @user }
    else
      render json: @user.errors, status: 422
    end
  end

  def invite
    UserMailer.invite_email(invite_params).deliver_now
    # render json: {"hello": "world"}, status: 200
  end

  def destroy
    @user = current_user
    todos = @user.user_todos.select{|ut| ut.is_owner}.map{|ut| ut.todo} if @user
    if @user && @user.destroy
      session[:session_token] = nil
      todos.each{|todo| todo.destroy}
      redirect_to '/'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:id, :password, :username)
  end

  def invite_params
    params.require([:inviter, :email])
  end
end


class Api::UsersController < ApplicationController
  before_action :require_no_user!

  def create
    @user = User.new(user_params)
    if @user.save
      # Tell the UserMailer to send a welcome email after save
      UserMailer.welcome_email(@user).deliver_now
      # format.html { redirect_to(@user, notice: 'User was successfully created.') }

      login_user!(@user)
      render json: @user
      # format.json { render json: @user, status: :created, location: @user }
    else
      render json: @user.errors, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end

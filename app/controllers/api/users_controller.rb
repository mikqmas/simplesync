
class Api::UsersController < ApplicationController
  before_action :require_no_user!

  def create
    debugger
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

  def invite
    UserMailer.invite_email(invite_params).deliver_now
    # render json: {"hello": "world"}, status: 200
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

  def invite_params
    params.require([:inviter, :email])
  end
end

class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(session_params[:username], session_params[:password])

    if @user.nil?
      render(
        json: {
          base: ["Invalid username / password"]
        },
        status: 401
      )
    else
      login_user!(@user)
      render json: @user
    end
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end

class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(session_params[:username], session_params[:password])

    if @user.nil?
      render(
        json: {
          messages: ["Invalid username / password"]
        },
        status: 401
      )
    else
      login_user!(@user)
      redirect_to '/'
      # + @user.todos.last.id.to_s
    end
  end

  def destroy
    if current_user.nil?
      render(
        json: {
          base: ["No User Logged In"]
        },
        status: 400
      )
    else
      logout_user!
      redirect_to '/'
    end
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end
end

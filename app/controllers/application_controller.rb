class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :check_token

  def check_token_or_log(token)
    # check token w/ DB
    # true if current_user || token
    todo = Todo.find_by_id(params['todo_id'])
    unless todo && todo.users.include?(current_user)
      head(401)
    end
  end

  def require_no_user!
    redirect_to "/" if current_user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_logged_in
    render json: {base: ['invalid credentials']}, status: 401 if !current_user
  end

end

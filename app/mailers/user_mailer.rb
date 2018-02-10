class UserMailer < ApplicationMailer
  default from: 'samkim86@gmail.com'

  def welcome_email(user)
    @user = user
    @url = 'http://example.com/login'
    mail(to: @user.username, subject: 'Welcome to SimpleSync')
  end
end

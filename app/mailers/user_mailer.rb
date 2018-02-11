class UserMailer < ApplicationMailer
  default from: 'samkim86@gmail.com'

  def welcome_email(user)
    @user = user
    @url = 'https://simplesync.com/'
    mail(to: @user.username, subject: 'Welcome to SimpleSync')
  end

  def invite_email(params)
    @email = params['email']
    @inviter = params['inviter']
    @url = "http://localhost:3000/signup?invite=" + @email

    mail(to: @email, subject: `Your friend, #{@inviter}, wants to share a task with you on SimpleSync.`)
  end
end

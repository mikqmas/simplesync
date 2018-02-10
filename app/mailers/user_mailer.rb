class UserMailer < ApplicationMailer
  default from: 'samkim86@gmail.com'

  def welcome_email(user)
    @user = user
    @url = 'http://example.com/login'
    mail(to: @user.username, subject: 'Welcome to SimpleSync')
  end

  def invite_email(params)
    debugger
    @email = params[1]
    @inviter = params[0]

    @url = `https://simplesync.com/signup?invite=#{@email}`
    mail(to: @email, subject: `Your friend, #{@inviter}, wants to share a task with you on SimpleSync.`)
  end
end

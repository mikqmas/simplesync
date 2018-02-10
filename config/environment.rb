# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!


# I recommend using this line to show error
# config.action_mailer.raise_delivery_errors = true

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.gmail.com',
  :domain         => 'mail.google.com',
  :port           => 587,
  :user_name      => 'tasksyncs@gmail.com',
  :password       => 'test123test',
  :authentication => :plain
}

ActionMailer::Base.raise_delivery_errors = true

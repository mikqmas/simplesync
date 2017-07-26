class Todo < ApplicationRecord
  belongs_to :user

  validates(
    :title,
    :body,
    :user_id,
    presence: true
  )

  validates :done, inclusion: { in: [true, false] }
end

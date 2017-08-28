class Todo < ApplicationRecord
  has_many :user_todos
  has_many :users, through: :user_todos

  has_many :sub_tasks
end

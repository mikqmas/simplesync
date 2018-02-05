class Todo < ApplicationRecord
  has_many :user_todos
  has_many :users, through: :user_todos

  has_many :sub_tasks, dependent: :destroy

  def owner
    owner = self.user_todos.to_a.select do |el| el.is_owner end
    owner.first
  end

end

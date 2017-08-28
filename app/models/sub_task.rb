class SubTask < ApplicationRecord
  belongs_to :todo

  validates(
    :body,
    :todo_id,
    :done,
    :list_order,
    presence: true
  )
end

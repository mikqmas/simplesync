Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :create, :show, :destroy, :update], param: :todo_id do
      member do
        resources :sub_tasks, only: [:index, :create, :show, :destroy, :update], param: :subtask_id
        resources :user_todos, only: [:destroy, :create], param: :user_todo_id
      end
    end
    resource :user, only: [:create, :show, :update, :destroy]
    post 'user/invite', :to => 'users#invite'
    resource :session, only: [:create, :destroy]
  end

  root "static_pages#root"
  get '*path', to: 'static_pages#root'
end

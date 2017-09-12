Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :create, :show, :destroy, :update] do
      resources :sub_tasks, only: [:index, :create, :show, :destroy, :update]
    end
    resource :user, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
  end
  root "static_pages#root"
  get '*path', to: 'static_pages#root'
end

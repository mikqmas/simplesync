Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :create, :show, :destroy, :update]
    resource :user, only: [:create, :show, :update, :destroy]
  end
  root "static_pages#root"
end

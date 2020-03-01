Rails.application.routes.draw do
  root controller: :channels, action: :index
  
  resources :messages
  resources :channels
end

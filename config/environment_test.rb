require 'bundler'
Bundler.require(:default, :test)

root = ENV['PWD']
set :public_folder, "#{root}/app/assets"
set :views, "#{root}/app/views"

require_all 'app'
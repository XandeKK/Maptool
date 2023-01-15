require 'bundler'
Bundler.require(:default)
Bundler.require(ENV['APP_ENV']) if ENV['APP_ENV']

root = ENV['PWD']
set :public_folder, "#{root}/app/assets"
set :views, "#{root}/app/views"

set :faye, {
	mount: '/faye',
	timeout: 20,
	engine: {
		type: nil,
		local: 'localhost',
		port: 9292
	}
}

require_all 'app'
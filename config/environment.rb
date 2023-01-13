require 'bundler'
Bundler.require

root = settings.root.sub(/\/config$/, '')

set :root, root
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
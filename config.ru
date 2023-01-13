require_relative 'config/environment'

Faye::WebSocket.load_adapter 'thin'

App = Faye::RackAdapter.new Application, settings.faye

App.add_extension(FayeHandler.new)

run App
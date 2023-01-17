class Client::MessageHandler
	def initialize(faye_client)
		@faye_client = faye_client
	end

	def handle_message message
		msg = Maptool::Message.decode message

		@faye_client.publish(msg)
	end
end
class Client::Faye
	def initialize(faye_client, channel)
		@faye_client = faye_client
		@channel = channel
	end

	def publish message
		@faye_client.publish(@channel, message)
	end
end
class Client
	def initialize(options = {})
		@options = options
		@player = Player.new(@options[:name], @options[:password])
		@faye_client = Client::Faye.new(@options[:faye_client], @options[:channel])
	end

	def start
		@thread = Thread.new do
			@connection = Connection.new(@options[:host_name], @options[:port])
			@client_handshake = Client::Handshake.new(
				@connection, @player, @options[:version], @faye_client
			)
			@client_message_handler = Client::MessageHandler.new(@faye_client)

			begin 
				@connection.connect
			rescue Errno::ECONNREFUSED => e
				@faye_client.publish({ error: e })
				@thread.kill
			end

			@client_handshake.start_handshake

			loop do
				close if @connection.current_state == :error

				msg = ''
				msg = @connection.messages_to_read.pop if @connection.has_message_to_read?

				if @connection.current_state == :success
					@client_message_handler.handle_message(msg) unless msg.empty?
				else
					@client_handshake.handle_message(msg) unless msg.empty?
				end
			end
		end
	end

	def add_message message
		begin
			msg = Maptool::Message.decode_json(message.to_json)
			@connection.add_message(Maptool::Message.encode(msg))
		rescue Google::Protobuf::ParseError
			@faye_client.publish({ error: "Invalid Json", data: message })
		end
	end

	def close
		@connection.close
		@faye_client.publish({ error: "Closed" })
		@thread.kill
	end
end
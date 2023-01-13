class ServerSocket
	attr_reader :port, :messages
	def initialize
		@thread = []
		@messages = []

		@thread << Thread.new { start }
		until !@port.nil?; end
		@thread << Thread.new { read_message }
	end

	def start
		@server = TCPServer.new('localhost', 0)
		@port = @server.addr[1]
	end

	def send_message message
		accept_client
		length = message.length

		@client.write (length >> 24).chr
		@client.write (length >> 16).chr
		@client.write (length >> 8).chr
		@client.write length.chr
		@client.write message
		@client.flush
	end

	def read_message
		accept_client
		loop do
			msg = @client.recv(1028)

			@messages << msg[4..] unless msg.empty?
		end
	end

	def accept_client
		while @client.nil?
			begin
				Timeout::timeout(0.1) { @client = @server.accept }
			rescue Timeout::Error, IOError
			end
		end
	end

	def close
		@server.close
		@thread.each { |t| t.kill }
	end
end
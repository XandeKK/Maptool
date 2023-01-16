# A note to future me
# If possible change everything to support eventmachine
# and add the messages on the redis server
class Connection
	attr_accessor :current_state
	attr_reader :messages_to_read

	def initialize(host_name="127.0.0.1", port="51234")
		@host_name = host_name
		@port = port
		@messages_to_send = Queue.new
		@messages_to_read = Queue.new
		@threads = Array.new
	end

	def connect
		@socket = TCPSocket.new(@host_name, @port)
		@socket.sync = false

		@threads << Thread.new { send_message }
		@threads << Thread.new { read_message }
		@current_state = :connecting
	end

	def close
		@threads.each { |thr| thr.kill }
		@socket.close
		@current_state = :closed
	end

	def add_message message
		@messages_to_send << message
	end

	def has_message_to_read?
		!@messages_to_read.empty?
	end

	private

	def send_message
		loop do
			begin
				message = @messages_to_send.pop
				length = message.length
				bytes = length.chr(Encoding::UTF_16).bytes
				bytes_hash = bytes_to_hash(bytes)

				@socket.write bytes_hash[:b32].chr
				@socket.write bytes_hash[:b24].chr
				@socket.write bytes_hash[:b16].chr
				@socket.write bytes_hash[:b8].chr
				@socket.write message
				@socket.flush
			rescue Errno::EPIPE
				@current_state = :error
				break
			end
		end
	end

	def read_message
		loop do
			if @socket.closed?
				@current_state = :error
				break
			end
			b32 = hex_to_int @socket.recv(1)
			b24 = hex_to_int @socket.recv(1)
			b16 = hex_to_int @socket.recv(1)
			b8  = hex_to_int @socket.recv(1)

			length = (b32 << 24) + (b24 << 16) + (b16 << 8) + b8

			@current_state = :error if length <= 0

			msg = @socket.recv(length)
			@messages_to_read << msg unless msg.empty?
		end
	end

	def hex_to_int hex
		remove_hex_escape(hex).to_i(16)
	end

	def remove_hex_escape hex
		hex.unpack("H*")[0]
	end

	def bytes_to_hash bytes
		bytes_hash = {
			b8: bytes.pop,
			b16: bytes.pop || 0,
			b24: bytes.pop || 0,
			b32: bytes.pop || 0,
		}
	end
end
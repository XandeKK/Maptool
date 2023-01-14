require_relative '../helper/server_socket'

RSpec.describe Connection do
	before(:each) do
		@server = ServerSocket.new
		@connection = Connection.new('localhost', @server.port)
	end

	describe '#connect' do
		it 'should change current state from nil to connecting' do
			expect(@connection.current_state).to be_nil
			@connection.connect
			expect(@connection.current_state).to eq(:connecting)
		end

		it 'raise Errno::ECONNREFUSED' do
			connection = Connection.new('localhost', @server.port - 1)
			expect { connection.connect }.to raise_error(Errno::ECONNREFUSED)
		end
	end

	describe '#close' do
		it 'check current_state' do
			@connection.connect
			@connection.close
			expect(@connection.current_state).to eq(:closed)
		end
	end

	describe '#add_message' do
		before(:each) do
			@connection.connect
		end

		it 'return foda' do
			@connection.add_message "foda"
			while @server.messages.empty?; end
			expect(@server.messages.first).to eq("foda")
		end

		it 'should be empty' do
			expect(@server.messages.empty?).to be true
		end

		after(:each) do
			@connection.close
		end
	end

	describe '#has_message_to_read?' do
		before(:each) do
			@connection.connect
		end

		it 'return false' do
			expect(@connection.has_message_to_read?).to be_falsy
		end

		it 'return true' do
			@server.send_message "foda"
			while !@connection.has_message_to_read?; end
			expect(@connection.has_message_to_read?).to be_truthy
		end

		after(:each) do
			@connection.close
		end
	end
end
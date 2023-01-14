RSpec.describe Client do
	let(:name) { "Alexandre" }
	let(:password) { "123" }
	let(:channel) { '/test' }
	let(:host_name) { '0.0.0.0' }
	let(:port) { 6969 }

	before(:each) do
		@faye_client = double(:faye_client)
		@client = Client.new(
			name: name, password: password, faye_client: @faye_client, channel: channel,
			host_name: host_name, port: port, version: '0.0.0'
		)
		@connection = double(:connection)
		@client_handshake = double(:client_handshake)
		@client_message_handler = double(:client_message_handler)

		allow(Connection).to receive(:new).with(host_name, port).and_return(@connection)
		allow(Client::Handshake).to receive(:new).and_return(@client_handshake)
		allow(Client::MessageHandler).to receive(:new).and_return(@client_message_handler)
	end

	describe '#start' do
		it 'flow of client message handler' do
			expect(@connection).to receive(:connect)
			expect(@client_handshake).to receive(:start_handshake)
			expect(@connection).to receive(:current_state).and_return(:connecting)
			expect(@connection).to receive(:has_message_to_read?).and_return(true)
			expect(@connection).to receive(:messages_to_read).and_return(["foda"])
			expect(@connection).to receive(:current_state).and_return(:success)
			expect(@client_message_handler).to receive(:handle_message).with("foda")
			expect(@connection).to receive(:current_state).and_return(:error)
			expect(@connection).to receive(:close)
			expect(@faye_client).to receive(:publish).with(channel, { error: "Closed" })

			@client.start.join
		end

		it 'flow of client handshake' do
			expect(@connection).to receive(:connect)
			expect(@client_handshake).to receive(:start_handshake)
			expect(@connection).to receive(:current_state).and_return(:connecting)
			expect(@connection).to receive(:has_message_to_read?).and_return(true)
			expect(@connection).to receive(:messages_to_read).and_return(["foda"])
			expect(@connection).to receive(:current_state).and_return(:awaiting_use_auth_type)
			expect(@client_handshake).to receive(:handle_message).with("foda")
			expect(@connection).to receive(:current_state).and_return(:error)
			expect(@connection).to receive(:close)
			expect(@faye_client).to receive(:publish).with(channel, { error: "Closed" })

			@client.start.join
		end

		it 'flow of error' do
			expect(@connection).to receive(:connect)
			expect(@client_handshake).to receive(:start_handshake)
			expect(@connection).to receive(:current_state).and_return(:error)
			expect(@connection).to receive(:close)
			expect(@faye_client).to receive(:publish).with(channel, { error: "Closed" })

			@client.start.join
		end

		it 'raise Errno::ECONNREFUSED' do
			error = Errno::ECONNREFUSED.new
			allow(@connection).to receive(:connect).and_raise(error)
			expect(@faye_client).to receive(:publish).with(channel, { error: error })

			@client.start.join
		end
	end

	describe '#add_message' do
		it 'add message' do
			msg = Maptool::Message.new
			@client.instance_variable_set(:@connection, @connection)
			expect(@connection).to receive(:add_message).with(Maptool::Message.encode(msg))

			@client.add_message(msg)
		end

		it 'rescue Google::Protobuf::ParseError' do
			expect(@faye_client).to receive(:publish).with(channel, { error: "Invalid Json", data: 'foda' })

			@client.add_message("foda")
		end
	end

	describe '#close' do
		it 'close connection' do
			@client.instance_variable_set(:@connection, @connection)
			expect(@connection).to receive(:close)
			@client.instance_variable_set(:@thread, Thread.new {})
			expect(@faye_client).to receive(:publish).with(channel, { error: "Closed" } )

			@client.close
		end
	end
end
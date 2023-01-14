RSpec.describe Client::Handshake do
	before(:each) do
		@connection = double(:connection)
		player = Player.new("Alexandre", "123")
		@faye_client = double(:faye_client)
		@client_handshake = Client::Handshake.new(
			@connection, player, '0.0.0', @faye_client
		)
	end

	describe '#add_message' do
		it 'add message in queue' do
			msg = "foda"
			expect(@connection).to receive(:add_message).with(msg)
			@client_handshake.add_message(msg)
		end
	end

	describe '#start_handshake' do
		it 'add a message and put current state on awaiting_use_auth_type' do
			expect(@connection).to receive(:add_message)
			expect(@connection).to receive(:current_state=).with(:awaiting_use_auth_type)

			@client_handshake.start_handshake
		end
	end

	describe '#handle_message' do
		let(:handshake_msg) { Maptool::HandshakeMsg.new }
		context 'I will receive the error' do
			before(:each) { expect(@connection).to receive(:current_state=).with(:error) }

			it 'get invalid password' do
				expect(@faye_client).to receive(:publish).with({ error: "Invalid Password" })
				message = add_response_msg(handshake_msg, :INVALID_PASSWORD)
				@client_handshake.handle_message(message)
			end

			it 'get invalid public key' do
				expect(@faye_client).to receive(:publish).with({ error: "Invalid Public key" })
				message = add_response_msg(handshake_msg, :INVALID_PUBLIC_KEY)
				@client_handshake.handle_message(message)
			end

			it 'get server denied' do
				expect(@faye_client).to receive(:publish).with({ error: "Server denied" })
				message = add_response_msg(handshake_msg, :SERVER_DENIED)
				@client_handshake.handle_message(message)
			end

			it 'get player already connected' do
				expect(@faye_client).to receive(:publish).with({ error: "Player already connected" })
				message = add_response_msg(handshake_msg, :PLAYER_ALREADY_CONNECTED)
				@client_handshake.handle_message(message)
			end

			it 'get wrong version' do
				expect(@faye_client).to receive(:publish).with({ error: "Wrong version" })
				message = add_response_msg(handshake_msg, :WRONG_VERSION)
				@client_handshake.handle_message(message)
			end

			it 'get unknow error' do
				expect(@faye_client).to receive(:publish).with({ error: "Invalid handshake" })
				message = add_response_msg(handshake_msg, 0)
				@client_handshake.handle_message(message)
			end
		end

		context 'I am awaiting use auth type' do
			it 'set current state awaiting connection successful' do
				allow(@connection).to receive(:current_state).and_return(:awaiting_use_auth_type)
				allow(@connection).to receive(:current_state=).with(:awaiting_connection_successful)
				expect(@connection).to receive(:add_message)

				handshake_msg.use_auth_type_msg = Maptool::UseAuthTypeMsg.new
				message = Maptool::HandshakeMsg.encode(handshake_msg)

				@client_handshake.handle_message(message)
			end

			it 'get player blocked' do
				allow(@connection).to receive(:current_state).and_return(:awaiting_use_auth_type)
				allow(@connection).to receive(:current_state=).with(:error)
				expect(@faye_client).to receive(:publish).with({ error: "Player blocked" })

				handshake_msg.player_blocked_msg = Maptool::PlayerBlockedMsg.new
				message = Maptool::HandshakeMsg.encode(handshake_msg)

				@client_handshake.handle_message(message)
			end

			it 'get invalid handshake' do
				allow(@connection).to receive(:current_state).and_return(:awaiting_use_auth_type)
				allow(@connection).to receive(:current_state=).with(:error)
				expect(@faye_client).to receive(:publish).with({ error: "Invalid handshake" })

				message = Maptool::HandshakeMsg.encode(handshake_msg)

				@client_handshake.handle_message(message)
			end
		end

		context 'I am awaiting connection successful' do
			it 'set current state success' do
				allow(@connection).to receive(:current_state).and_return(:awaiting_connection_successful)
				allow(@connection).to receive(:current_state=).with(:success)

				handshake_msg.connection_successful_msg = Maptool::ConnectionSuccessfulMsg.new
				message = Maptool::HandshakeMsg.encode(handshake_msg)

				@client_handshake.handle_message(message)
			end

			it 'get invalid handshake' do
				allow(@connection).to receive(:current_state).and_return(:awaiting_connection_successful)
				allow(@connection).to receive(:current_state=).with(:error)
				expect(@faye_client).to receive(:publish).with({ error: "Invalid handshake" })

				message = Maptool::HandshakeMsg.encode(handshake_msg)

				@client_handshake.handle_message(message)
			end
		end
	end

	def add_response_msg handshake_msg, msg
		handshake_msg.handshake_response_code_msg = msg
		Maptool::HandshakeMsg.encode(handshake_msg)
	end
end
class Client::Handshake
	def initialize(connection, player, version, faye_client)
		@connection = connection
		@player = player
		@version = version
		@faye_client = faye_client
		@key_pair = CipherUtil.generate_key_pair
	end

	def start_handshake
		md5 = CipherUtil.public_key_md5(@key_pair.public_key.to_s)
		client_init_msg = Maptool::ClientInitMsg.new(
      player_name: @player.name,
      version: @version,
      public_key_md5: md5
    )
    handshake_msg = Maptool::HandshakeMsg.new(
    	client_init_msg: client_init_msg
    )

    add_message(Maptool::HandshakeMsg.encode(handshake_msg))
    @connection.current_state = :awaiting_use_auth_type
	end

	def add_message message
		@connection.add_message(message)
	end

	def handle_message message
		handshake_msg = Maptool::HandshakeMsg.decode message
		msg_type = handshake_msg.message_type

		if msg_type == :handshake_response_code_msg
			code = handshake_msg.handshake_response_code_msg

			if code == :INVALID_PASSWORD
				@faye_client.publish({ error: "Invalid Password" })
			elsif code == :INVALID_PUBLIC_KEY
				@faye_client.publish({ error: "Invalid Public key" })
			elsif code == :SERVER_DENIED
				@faye_client.publish({ error: "Server denied" })
			elsif code == :PLAYER_ALREADY_CONNECTED
				@faye_client.publish({ error: "Player already connected" })
			elsif code == :WRONG_VERSION
				@faye_client.publish({ error: "Wrong version" })
			else
				@faye_client.publish({ error: "Invalid handshake" })
			end

			@connection.current_state = :error
			return
		end

		case @connection.current_state
		when :awaiting_use_auth_type
			if msg_type == :use_auth_type_msg
				handle_use_auth_type_msg(handshake_msg.use_auth_type_msg)
			elsif msg_type == :player_blocked_msg
				@faye_client.publish({ error: "Player blocked" })
				@connection.current_state = :error
			else
				@faye_client.publish({ error: "Invalid handshake" })
				@connection.current_state = :error
			end
		when :awaiting_connection_successful
			if msg_type == :connection_successful_msg
				handle_connection_successful_msg(handshake_msg.connection_successful_msg)
			else
				@faye_client.publish({ error: "Invalid handshake" })
				@connection.current_state = :error
			end
		end
	end

	private

	def handle_use_auth_type_msg use_auth_type_msg
		client_auth_msg = Maptool::ClientAuthMsg.new

		iv = use_auth_type_msg.iv
		response_iv = SecureRandom::bytes(CipherUtil::CIPHER_BLOCK_SIZE)
		@player.password_salt use_auth_type_msg.salt

		use_auth_type_msg.challenge.each do |challenge|
			begin
				key = @player.password
				handshake_challenge = HandshakeChallenge.from_symmetric_challenge_bytes(
					@player.name, challenge, key, iv
				)
				expected_response = handshake_challenge.expected_response(response_iv)
				client_auth_msg.challenge_response = expected_response
				client_auth_msg.iv = response_iv
				break
			rescue OpenSSL::Cipher::CipherError => e
				# I did this to prevent an error from happening when decrypting on the server
				client_auth_msg.challenge_response = SecureRandom::bytes 16
				client_auth_msg.iv = SecureRandom::bytes 16
				next
			end
		end

		handshake_msg = Maptool::HandshakeMsg.new(client_auth_message: client_auth_msg)
		add_message(Maptool::HandshakeMsg.encode(handshake_msg))
		@connection.current_state = :awaiting_connection_successful
	end

	def handle_connection_successful_msg connection_successful_msg
		@connection.current_state = :success
	end
end
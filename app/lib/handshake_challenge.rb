class HandshakeChallenge
	class InvalidChallenge < StandardError;	end

	def initialize(challenge, expected_response, key)
		@challenge = challenge
		@expected_response = expected_response
		@key = key
	end

	def self.from_symmetric_challenge_bytes(username, challenge, key, iv)
		if key.asymmetric
			# todo
		else
			from_challenge_bytes(username, challenge, key, iv)
		end
	end

	def self.from_challenge_bytes(username, challenge, key, iv)
		descryptor = nil
		
		if key.asymmetric
			# todo
		else
			descryptor = CipherUtil.create_symmetric_decryptor(key, iv)
		end

		challenge_string = descryptor.update(challenge) + descryptor.final

		unless challenge_string.start_with? username
			raise InvalidChallenge, "Handshake challenge #{challenge_string} does not with username #{username}"
		end

		response_string = challenge_string[username.length..]
		rev_password = response_string.reverse
		response = rev_password

		if key.asymmetric
			# todo
		else
			return HandshakeChallenge.new(challenge, response, key)
		end
	end

	def expected_response iv
		encryptor = CipherUtil.create_symmetric_encryptor(@key, iv)
		encryptor.update(@expected_response) + encryptor.final
	end
end
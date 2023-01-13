RSpec.describe HandshakeChallenge do
	let(:username) { "Alexandre" }
	let(:salt) { CipherUtil.create_salt 16 }
	let(:password) { "password" }
	let(:key) { CipherUtil.create_key(password, salt) }
	let(:iv) { key.secret_key_spec.random_iv }
	let(:challenge_correct) do
		encryptor = CipherUtil.create_symmetric_encryptor(key, iv)
		encryptor.update(username) + encryptor.final
	end
	let(:challenge_incorrect) do
		encryptor = CipherUtil.create_symmetric_encryptor(key, iv)
		encryptor.update("foda") + encryptor.final
	end

	describe '#from_challenge_bytes' do
		it 'return HandshakeChallenge' do
			handshake_challenge = HandshakeChallenge.from_challenge_bytes(
				username, challenge_correct, key, iv
			)

			expect(handshake_challenge.class).to eq(HandshakeChallenge)
		end

		it 'raise invalid challenge' do
			expect do 
				HandshakeChallenge.from_challenge_bytes(
					username, challenge_incorrect, key, iv
				)
			end.to raise_error(HandshakeChallenge::InvalidChallenge)
		end
	end

	describe '#expected_response' do
		it 'get response encrypted of 16 bytes' do
			handshake_challenge = HandshakeChallenge.from_challenge_bytes(
				username, challenge_correct, key, iv
			)
			expect(handshake_challenge.expected_response(iv).length).to eq(16)
		end
	end
end
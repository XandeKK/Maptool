RSpec.describe CipherUtil do
	let(:key_pair) { CipherUtil.generate_key_pair }
	let(:salt) { CipherUtil.create_salt 16 }
	let(:password) { "password" }
	let(:iv) { SecureRandom.bytes 16 }
	let(:key) { CipherUtil.create_key(password, salt) }

	describe '#generate_key_pair' do
		it 'return a object OpenSSL::PKey::RSA' do
			expect(key_pair.class).to eq(OpenSSL::PKey::RSA)
		end

		it 'get public key' do
			public_key = key_pair.public_key.to_s.strip!

			expect(public_key).to start_with(CipherUtil::PUBLIC_KEY_FIRST_LINE)
			.and end_with(CipherUtil::PUBLIC_KEY_LAST_LINE)
		end
	end

	describe '#public_key_md5' do
		it 'return public key md5' do
			public_key = key_pair.public_key.to_s
			md5 = Digest::MD5.hexdigest(public_key.strip.gsub(" ", ""))

			expect(CipherUtil.public_key_md5(public_key)).to eq(md5)
		end

		it 'raise ArgumentError' do
			expect { CipherUtil.public_key_md5("foda") }.to raise_error(ArgumentError, "Not a public key string")
		end
	end

	describe '#create_salt' do
		it 'return salt of 0 bytes' do
			expect(CipherUtil.create_salt(0).length).to eq(0)
		end

		it 'return salt of 16 bytes' do
			expect(CipherUtil.create_salt(16).length).to eq(16)
		end
	end

	describe '#create_key' do
		it 'return CipherUtil::Key' do
			key = CipherUtil.create_key(password, salt)
			pbkdf2_hmac_sha1 = OpenSSL::PKCS5.pbkdf2_hmac_sha1(
				password, salt, CipherUtil::KEY_ITERATION_KEY_COUNT, 16
			)

			expect(key.class).to eq(CipherUtil::Key)
			expect(key.pbkdf2_hmac_sha1).to eq(pbkdf2_hmac_sha1)
			expect(key.salt).to eq(salt)
			expect(key.secret_key_spec.class).to eq(OpenSSL::Cipher)
		end
	end

	describe '#create_cipher' do
		it 'return OpenSSL::Cipher in encrypt mode' do
			cipher = CipherUtil.create_cipher(:ENCRYPT_MODE, key, iv)

			expect(cipher.class).to eq(OpenSSL::Cipher)
			expect(cipher.name).to eq(CipherUtil::KEY_ALGORITHM)
		end

		it 'return OpenSSL::Cipher in decrypt mode' do
			cipher = CipherUtil.create_cipher(:DECRYPT_MODE, key, iv)

			expect(cipher.class).to eq(OpenSSL::Cipher)
			expect(cipher.name).to eq(CipherUtil::KEY_ALGORITHM)
		end
	end

	describe '#create_symmetric_encryptor' do
		it 'return OpenSSL::Cipher' do
			cipher = CipherUtil.create_symmetric_encryptor(key, iv)

			expect(cipher.class).to eq(OpenSSL::Cipher)
			expect(cipher.name).to eq(CipherUtil::KEY_ALGORITHM)
		end
	end

	describe '#create_symmetric_decryptor' do
		it 'return OpenSSL::Cipher' do
			cipher = CipherUtil.create_symmetric_decryptor(key, iv)
			
			expect(cipher.class).to eq(OpenSSL::Cipher)
			expect(cipher.name).to eq(CipherUtil::KEY_ALGORITHM)
		end
	end
end
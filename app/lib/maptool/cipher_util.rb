module CipherUtil
	PUBLIC_KEY_FIRST_LINE = "-----BEGIN PUBLIC KEY-----"
  PUBLIC_KEY_LAST_LINE  = "-----END PUBLIC KEY-----"
  CIPHER_BLOCK_SIZE = 16
  DEFAULT_GENERATED_KEY_LEN = 128
  DEFAULT_SALT_SIZE = DEFAULT_GENERATED_KEY_LEN
  KEY_ITERATION_KEY_COUNT = 2000
  KEY_ALGORITHM = "AES-128-CBC"

  class Key
  	attr_reader :pbkdf2_hmac_sha1, :secret_key_spec, :salt, :asymmetric
  	def initialize pbkdf2_hmac_sha1, secret_key_spec, salt, asymmetric=false
  		@pbkdf2_hmac_sha1 = pbkdf2_hmac_sha1
  		@secret_key_spec = secret_key_spec 
  		@salt = salt 
  		@asymmetric = asymmetric
  	end
  end

  def self.generate_key_pair
  	OpenSSL::PKey::RSA.new(2048)
  end

	def self.public_key_md5 public_key_string
		public_key_string.strip!
		unless public_key_string.start_with?(PUBLIC_KEY_FIRST_LINE) ||
			public_key_string.end_with?(PUBLIC_KEY_LAST_LINE)
			
			raise ArgumentError.new("Not a public key string")
		end

		Digest::MD5.hexdigest(public_key_string.gsub(" ", ""))
	end

	def self.create_salt size
		SecureRandom::bytes size
	end

	def self.create_key password, salt
		pbkdf2_hmac_sha1 = OpenSSL::PKCS5.pbkdf2_hmac_sha1(
			password, salt, KEY_ITERATION_KEY_COUNT, 16
		)

		secret_spec = OpenSSL::Cipher.new KEY_ALGORITHM
		secret_spec.key = pbkdf2_hmac_sha1
		secret_spec.iv = secret_spec.random_iv

		Key.new(pbkdf2_hmac_sha1, secret_spec, salt)
	end

	def self.create_cipher encrypt_mode, key, iv
		if key.asymmetric
			# todo
		else
			cipher = OpenSSL::Cipher.new KEY_ALGORITHM

			if encrypt_mode == :ENCRYPT_MODE
				cipher.encrypt
			else
				cipher.decrypt
			end

			cipher.key = key.pbkdf2_hmac_sha1
			cipher.iv = iv
			
			return cipher
		end
	end

	def self.create_symmetric_encryptor key, iv
		raise "Expected symmetric key, got asymmetric" if key.asymmetric
		raise "Expected Algorithm #{KEY_ALGORITHM} got #{key.secret_key_spec.name}" if key.secret_key_spec.name != KEY_ALGORITHM

		create_cipher(:ENCRYPT_MODE, key, iv)
	end

	def self.create_symmetric_decryptor(key, iv)
		raise "Expected symmetric key, got asymmetric" if key.asymmetric
		raise "Expected Algorithm #{KEY_ALGORITHM} got #{key.secret_key_spec.name}" if key.secret_key_spec.name != KEY_ALGORITHM

		create_cipher(:DECRYPT_MODE, key, iv)
	end
end

class Player
	attr_reader :name, :plain_text_password, :password

	def initialize name, plain_text_password
		@name = name
		@password = nil
		@plain_text_password = plain_text_password

		password_salt(CipherUtil.create_salt(CipherUtil::DEFAULT_SALT_SIZE))
	end

	def password_salt salt
		if @password.nil? || @password.salt != salt
			@password = CipherUtil.create_key(@plain_text_password, salt)
		end
	end
end
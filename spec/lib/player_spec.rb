RSpec.describe Player do
	subject(:player) { Player.new("Alexandre", "123") }
	let(:salt) { CipherUtil.create_salt 16 }

	describe '#password_salt' do
		it 'return CipherUtil::Key' do
		 	expect(player.password_salt(salt).class).to eq(CipherUtil::Key)
		end
	end
end
RSpec.describe Client::MessageHandler do
	before(:each) do
		@faye_client = double(:faye_client)
		@message_handler = Client::MessageHandler.new(@faye_client)
		@message = Maptool::Message.encode(Maptool::Message.new)
	end

	describe '#handle_message' do
		it 'publish message' do
			msg = Maptool::Message.decode @message
			expect(@faye_client).to receive(:publish).with(msg)

			@message_handler.handle_message @message
		end
	end
end

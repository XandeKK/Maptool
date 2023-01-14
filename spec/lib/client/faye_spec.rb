RSpec.describe Client::Faye do
	let(:channel) { '/test' }
	let(:message) { 'opa, como vai' }
	let(:server) { Faye::RackAdapter.new(:mount => '/faye', :timeout => 20) }
	let(:faye_client) { Client::Faye.new(server.get_client, channel) }

	describe '#publish' do
		it 'publish a message' do		
			EM.run {
			  EventMachine.add_timer(0.5) { EM.stop; raise "Time limit passed" }
				
				server.on(:publish) do |client_id, b_channel, b_message|
			    expect(b_channel).to eq(channel)
			    expect(b_message).to eq(message)
			    EM.stop
			  end

			  faye_client.publish(message)
			}
		end
	end
end

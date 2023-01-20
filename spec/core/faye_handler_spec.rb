RSpec.describe FayeHandler do
	let(:host_name) { '0.0.0.0' }
	let(:port) { 6969 }
	let(:name) { 'Fodão' }
	let(:password) { '123' }
	let(:version) { '0.0.0' }
	let(:faye_client) { double(:faye_client) }
	let(:channel) { '/test' }
	let(:client) { double(:client) }
	let(:callback) { double(:callback) }
	let(:message) {
		{
			'channel'=> nil,
			'subscription'=> '/test',
			'maptool' => {
				'address' => host_name,
				'port' => port,
				'name' => name,
				'password' => password,
				'version' => version,
				'faye_client' => faye_client,
				'channel' => channel
			}
		}
	}

	subject { 
		allow(Faye::Client).to receive(:new).and_return(faye_client)
		FayeHandler.new
	}

	describe '#incoming' do
		it 'subscribe a channel' do
			message['channel'] = '/meta/subscribe'
			expect(Client).to receive(:new).with(
				host_name: host_name, port: port, name: name,
				password: password, version: version, faye_client: faye_client,
				channel: channel
			).and_return(client)

			expect(client).to receive(:start)
			expect(callback).to receive(:call).with(message)

			subject.incoming(message, callback)
		end

		it 'disconnect a channel' do
			message['channel'] = '/meta/disconnect'
			message['clientId'] = 'random'

			client_1 = double(:client_1)

			expect(client_1).to receive(:close)
			expect(callback).to receive(:call).with(message)

			subject.instance_variable_set(:@clients, {'random'=> {client: client_1}})

			subject.incoming(message, callback)
		end

		it 'add a message' do
			message['channel'] = 'foda-se'
			message['clientId'] = 'random'
			message['data'] = 'hoje não'

			client_1 = double(:client_1)

			expect(callback).to receive(:call).with(message)
			expect(client_1).to receive(:add_message).with(message['data'])

			subject.instance_variable_set(:@clients, {'random'=> {client: client_1}})

			subject.incoming(message, callback)
		end

		it 'else message' do
			message['channel'] = '/meta'
			expect(callback).to receive(:call).with(message)

			subject.incoming(message, callback)
		end
	end

	describe '#add_client' do
		it 'should add a client' do
			message['clientId'] = '123'
			expect(Client).to receive(:new).with(
				host_name: host_name, port: port, name: name,
				password: password, version: version, faye_client: faye_client,
				channel: channel
			).and_return(client)

			expect(client).to receive(:start)

			subject.add_client(message)

			expect(subject.instance_variable_get(:@clients).count).to eq(1)
		end
	end

	describe '#add_message' do
		it 'add message' do
			message['clientId'] = 'random'
			message['data'] = 'não sei o que dizer'
			client_1 = double(:client_1)

			subject.instance_variable_set(:@clients, {'random'=> {client: client_1}})

			expect(client_1).to receive(:add_message).with(message['data'])

			subject.add_message(message)
		end
	end

	describe '#remove_client' do
		it 'remove client' do
			message['clientId'] = 'random'
			client_1 = double(:client_1)

			subject.instance_variable_set(:@clients, {'random'=> {client: client_1}})

			expect(client_1).to receive(:close)

			subject.remove_client(message)
		end
	end
end
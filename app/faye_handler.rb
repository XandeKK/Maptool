class FayeHandler
	def initialize
		@users = {}
		@client = Faye::Client.new('http://localhost:9292/faye')
	end

	def incoming(message, callback)
		if message['channel'] == '/meta/subscribe'
			add_user(message)
		elsif message['channel'] == '/meta/disconnect'
			remove_user message
		elsif !message['channel'].start_with?('/meta') && message['maptool']
			add_message message
			return
		end

    callback.call(message)
  end

  def add_user message
  	client = Client.new(
      host_name: message['maptool']['address'],
      port: message['maptool']['port'],
      name: message['maptool']['name'],
      password: message['maptool']['password'],
      version: message['maptool']['version'],
      faye_client: @client,
      channel: message['subscription']
    )

    @users[message['clientId']] = { client: client, channel: message['subscription'] }

    client.start
  end

  def add_message message
  	@users[message['clientId']][:client].add_message(message['data'])
  end

  def remove_user message
  	@users[message['clientId']][:client].close
  	@users.delete(message['clientId'])
  end
end
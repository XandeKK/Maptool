class Client {
	constructor(controller) {
		this.controller = controller;
		this.debug = false;
		this.channel = `/${Random.generate_uuid()}`;
		this.client = new Faye.Client('http://localhost:9292/faye');

		this.client.addExtension({
			incoming: this.incoming.bind(this),
			outgoing: this.outgoing.bind(this)
		});
	}

	disable_debug() {
		console.log('Disabling debug');
		Alert.add('Disabling debug', 'info');
		this.debug = false;
	}

	enable_debug() {
		console.log('Enabling debug');
		Alert.add('Enabling debug', 'info');
		this.debug = true;
	}

	outgoing(message, callback) {
		message.maptool = this.controller.form.data;
		callback(message);
	}

	incoming(message, callback) {
		if (message['data'] && this.debug) console.log(message['data']);
		callback(message);
	}

	handler(message) {
		this.controller.message_handler.handler(message);
	}

	subscribe() {
		this.subscription = this.client.subscribe(this.channel, this.handler.bind(this))
	}

	unsubscribe() {
		this.subscription.cancel();
		this.controller.form.show_form();
		this.controller.status = 'unsubscribed';
	}
}
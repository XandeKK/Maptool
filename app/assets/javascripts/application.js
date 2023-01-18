//= require_tree .

class Client {
	constructor(form_id) {
		this.faye_client = new Faye.Client( 'http://localhost:9292/faye' );
		this.faye_client.addExtension({
			outgoing: this.outgoing.bind(this),
			incoming: this.incoming.bind(this),
		});
		this.uuid = this.generate_uuid();
		this.channel = `/${this.uuid}`
		this.form = document.getElementById(form_id);
		this.handlers = new Handlers();
		this.add_event_listener();
	}

	add_event_listener() {
		this.event_submit = this.submit.bind(this)
		this.form.addEventListener('submit', this.event_submit);
	}

	submit(event) {
		event.preventDefault();
    const data = new FormData(this.form);
    this.maptool = Object.fromEntries(data.entries());
    this.subscribe();
	}

	generate_uuid() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}

	outgoing(message, callback) {
		message.maptool = this.maptool;
	  callback(message);
	}

	incoming(message, callback) {
		if (message['data']) console.log(message['data']);
		callback(message);
	}

	handler(message) {
		if (message['error']) {
			this.unsubscribe();
		} else {
			this.handlers.handler(Object.keys(message)[0], message)
		}
	}

	unsubscribe() {
		this.subscription.unsubscribe()
	}

	subscribe() {
		this.subscription = this.faye_client.subscribe(this.channel, this.handler.bind(this));
	}
}

class Handlers {
	handler(key, message) {
		if (this[key]) {
			this[key](message);
		}
	
}}

const client = new Client('form');
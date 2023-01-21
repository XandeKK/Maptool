class Controller {
	constructor() {
		this.form = new Form(this);
		this.client = new Client(this);
		this.maptool = new Maptool(this);
		this.message_handler = new MessageHandler(this);
		this.chat = new Chat(this);
		this.status = 'unsubscribed';
	}

	reset() {
		this.chat.clear();
		
		// clear tokens and users

		this.maptool = new Maptool(this);
		this.status = 'unsubscribed';
	}
}
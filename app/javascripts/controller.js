class Controller {
	constructor() {
		this.form = new FormServer(this);
		this.client = new Client(this);
		this.maptool = new Maptool(this);
		this.message_handler = new MessageHandler(this);
		this.chat = new Chat(this);
		this.status = 'unsubscribed';
	}

	reset() {
		this.chat.clear();
		this.maptool.users.clear();
		
		// clear tokens and users

		this.maptool = new Maptool(this);
		this.status = 'unsubscribed';
	}
}
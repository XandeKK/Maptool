class Controller {
	constructor() {
		this.form = new ServerForm(this);
		this.client = new Client(this);
		this.maptool = new Maptool(this);
		this.message_handler = new MessageHandler(this);
		this.chat = new Chat(this);
		this.status = 'unsubscribed';
	}

	reset() {
		this.chat.clear();
		this.maptool.players.clear();
		this.maptool.tokens.clear();

		this.maptool = new Maptool(this);
		this.status = 'unsubscribed';
	}
}
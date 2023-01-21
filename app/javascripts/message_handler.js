class MessageHandler {
	constructor(controller) {
		this.controller = controller;
	}

	handler(message) {
		const key = Object.keys(message)[0];
		if (key == 'error') {
			Alert.add(message[key], 'danger');
			this.controller.client.unsubscribe();
			this.controller.reset();
		} else if (this[key]) {
			this[key](message);
		} else {
			console.log(message);
		}
	}

	playerConnectedMsg(message) {
		const player = message['playerConnectedMsg']['player'];
		this.controller.maptool.users.add(player);
		this.controller.maptool.set_role(player);
	}

	playerDisconnectedMsg(message) {
		const player = message['playerDisconnectedMsg']['player'];
		this.controller.maptool.users.remove(player);
	}
}
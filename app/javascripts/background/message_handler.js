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
		this.controller.maptool.players.add(player);
		this.controller.maptool.set_role(player);
	}

	playerDisconnectedMsg(message) {
		const player = message['playerDisconnectedMsg']['player'];
		this.controller.maptool.players.remove(player);
	}

	messageMsg(message) {
		const data = message['messageMsg']['message'];
		this.controller.chat.handler(data);
	}

	setCampaignMsg(message) {
		const campaign = message['setCampaignMsg']['campaign'];
		this.controller.maptool.configure_campaign(campaign);
	}

	putTokenMsg(message) {
		const token = message['putTokenMsg']['token'];
		this.controller.maptool.tokens.handler_token_msg(token);
	}

	editTokenMsg(message) {
		const token = message['editTokenMsg']['token'];
		const zone_id = message['editTokenMsg']['zoneGuid'];
		this.controller.maptool.tokens.handler_token_msg(token, zone_id);
	}
}
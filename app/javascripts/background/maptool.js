class Maptool {
	constructor(controller) {
		this.controller = controller;
		this.players = new Players(controller);
		this.tokens = new Tokens(controller);
		this.campaign = null;
	}

	set_player(player) {
		this.player = {
			name: player['name'],
			role: null
		};
	}

	set_role(player) {
		if (this.player['name'] == player['name']) {
			this.player['role'] = player['role'].toLowerCase();
		}
	}

	configure_campaign(campaign) {
		this.campaign = campaign;
		this.tokens.add_many_tokens(campaign['zones']);
	}

	get_properties(type) {
		return this.campaign.properties.tokenTypes[type]['properties'];
	}
}
class Maptool {
	constructor(controller) {
		this.controller = controller;
		this.users = new Users(controller);
		this.tokens = {};
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
}
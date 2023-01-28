class Players extends Player {
	constructor(controller) {
		super();
		this.controller = controller;
		this.players = {};
	}

	add(player) {
		if (this.have_this_player(player)) return;

		const div = this.create_div(player);

		this.players[player['name']] = {
			role: player['role'],
			div: div
		}
		this.controller.chat.add_message(`${player['role'].toLowerCase()} ${player['name']} joined.`)
		document.getElementById('players-list').appendChild(div);
	}

	remove(player) {
		if (!this.have_this_player(player)) return;

		this.players[player['name']].div.remove();

		delete this.players[player['name']];
		this.controller.chat.add_message(`${player['role'].toLowerCase()} ${player['name']} left.`)
	}

	have_this_player(player) {
		return this.players[player['name']]
	}

	whisper(player) {
		this.controller.chat.whisper(player);
	}

	clear() {
		document.getElementById('players-list').innerHTML = '';
	}
}
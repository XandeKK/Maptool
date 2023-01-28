class Tokens extends Token {
	constructor(controller) {
		super(controller);
		this.controller = controller;
		this.tokens = {};
	}

	handler_token_msg(token_tmp, zone_id) {
		if (!this.is_my_token(token_tmp)){
			if (this.have_this_player(token_tmp)) {
				this.remove(token_tmp);
			}
			return;
		}

		if (this.is_my_token(token_tmp) && !this.have_this_player(token_tmp)) {
			const zone = this.controller.maptool.campaign.zones.find((zone)=> {
				if (zone_id == zone['id']) return zone;
			});

			token_tmp['zone'] = {
				id: zone_id,
				name: zone['name']
			}

			this.create_div(token_tmp);

			this.tokens[token_tmp['id']] = token_tmp;
			return;
		}

		let token = this.tokens[token_tmp['id']];
		token_tmp['zone'] = token['zone'];
		this.tokens[token_tmp['id']] = token_tmp;

		this.update_view(token_tmp);
	}

	add_many_tokens(zones) {
		zones.forEach((zone) => {
			zone['tokens'].forEach(this.add.bind(this, zone['id'], zone['name']));
		});
	}

	add(zone_id, zone_name, token) {
		if (!this.is_my_token(token)) return;

		token['zone'] = {id: zone_id, name: zone_name};

		this.create_div(token);

		this.tokens[token['id']] = token;
	}

	remove(token) {
		delete this.tokens[token['id']];
		document.getElementById(`token-${token['id']}`).remove();
	}

	have_this_player(token) {
		return this.tokens[token['id']];
	}

	is_my_token(token) {
		if (!token['ownerList']) return false;
		return token['ownerList'].includes(this.controller.maptool.player['name']);
	}

	update_token(properties, token) {
		event.preventDefault();

		token['name'] = document.getElementById(`name-${token['id']}`).value;
		token['notes'] = document.getElementById(`notes-${token['id']}`).value;

		for (let i in properties) {
			const name = properties[i]['name'];
			const value = document.getElementById(`${name}-${token['id']}`).value;

			token['properties'][name] = value;
		}

		let token_tmp = Object.assign({}, token);

		delete token_tmp.zone;

		this.controller.client.send_message({
	    "editTokenMsg": {
	        "zoneGuid": token.zone.id,
	        'token': token_tmp
	    }
		})
	}

	clear() {
		document.getElementById('token-tab-content').innerHTML = '';
	}
}
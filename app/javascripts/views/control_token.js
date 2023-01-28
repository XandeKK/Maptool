class ControlToken {
	static append(controller, token, parent) {
		const div_buttons = document.createElement('div');
		const start_button = document.createElement('button');
		const stop_button = document.createElement('button');
		const div_arrows = document.createElement('div');
		const arrows = [
			{
				name: 'up_left',
				rotate: '-rotate-45',
				bind: this.up_left.bind(this, controller, token)
			},
			{
				name: 'up',
				rotate: '',
				bind: this.up.bind(this, controller, token)
			},
			{
				name: 'up_right',
				rotate: 'rotate-45',
				bind: this.up_right.bind(this, controller, token)
			},
			{
				name: 'left',
				rotate: '-rotate-90',
				bind: this.left.bind(this, controller, token)
			},
			{
				name: 'middle',
				bind: this.waypoint.bind(this, controller, token)
			},
			{
				name: 'right',
				rotate: 'rotate-90',
				bind: this.right.bind(this, controller, token)
			},
			{
				name: 'bottom_left',
				rotate: '-rotate-135',
				bind: this.bottom_left.bind(this, controller, token)
			},
			{
				name: 'bottom',
				rotate: 'rotate-180',
				bind: this.bottom.bind(this, controller, token)
			},
			{
				name: 'bottom_right',
				rotate: 'rotate-135',
				bind: this.bottom_right.bind(this, controller, token)
			}
		]

		div_buttons.className = 'grid grid-cols-2 gap-2 mb-8';

		start_button.className = 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
		start_button.type = 'button';
		start_button.textContent = 'Start move';

		stop_button.className = 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
		stop_button.type = 'button';
		stop_button.textContent = 'Stop move';

		start_button.addEventListener('click', this.start_button.bind(this, controller, token));
		stop_button.addEventListener('click', this.stop_button.bind(this, controller, token));

		div_buttons.appendChild(start_button);
		div_buttons.appendChild(stop_button);
		parent.appendChild(div_buttons);

		div_arrows.className = 'grid grid-cols-3 gap-2 justify-items-center text-gray-900 dark:text-gray-200';

		for (let i in arrows) {
      const arrow = arrows[i];

      if (arrow.name != 'middle') {
      	const arrow_button = document.createElement('button');

      	arrow_button.className = `${arrow.rotate} hover:bg-gray-200 dark:hover:bg-zinc-500 focus:ring-2 focus:outline-none focus:ring-emerald-500 rounded-full`;
      	arrow_button.innerHTML = '<svg class="w-20 h-20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 8l6 6H6z" /></svg>';

      	arrow_button.addEventListener('click', arrow.bind);
      	div_arrows.appendChild(arrow_button);
      } else {
      	const middle = document.createElement('button');

      	middle.className = 'hover:bg-gray-200 dark:hover:bg-zinc-500 focus:ring-2 focus:outline-none focus:ring-emerald-500 rounded-full';
      	middle.innerHTML = '<svg class="w-20 h-20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>';

      	middle.addEventListener('click', arrow.bind);
      	div_arrows.appendChild(middle);
      }
		}

		parent.appendChild(div_arrows);
	}

	static start_button(controller, token) {
		controller.client.send_message({
	    "startTokenMoveMsg": {
	      "playerId": controller.maptool.player.name,
	      "zoneGuid": token.zone.id,
	      "keyTokenId": token.id,
	      "selectedTokens": [
	      	  token.id
	        ]
	    	}
	    }
	  )
	}

	static stop_button(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		controller.client.send_message(
		{
	    "stopTokenMoveMsg": {
	    	"zoneGuid": token.zone.id,
	      "keyTokenId": token.id
	    }
		})

		let token_copy = Object.assign({}, token);

		delete token_copy.zone

		controller.client.send_message({
			"putTokenMsg": {
        "zoneGuid": token.zone.id,
        "token": token_copy
    	}
		})
	}

	static send_move(controller, token) {
		if (!token.x) token.x = 0;
		if (!token.y) token.y = 0;
		controller.client.send_message(
			{
	    "updateTokenMoveMsg": {
	      "zoneGuid": token.zone.id,
	      "keyTokenId": token.id,
	      "point": {
	      	"x": token.x,
	        "y": token.y
	      }
	    }
	  })
	}

	static get_grid(controller, token) {
		let zone_id = token['zone']['id'];
		let zone = controller.maptool.campaign.zones.find(
			(zone)=>{ if (zone.id == zone_id) return zone }
		);
		return zone.grid.size;
	}

	static waypoint(controller, token) {
		controller.client.send_message({
	    "toggleTokenMoveWaypointMsg": {
	        "zoneGuid": token['zone']['id'],
	        "keyTokenId": token.id,
	        "point": {
	            "x": token.x,
	            "y": token.y
	        }
	    	}
			}
		)
	}

	static up(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);
		token.y -= grid_size;

		this.send_move(controller, token);
	}

	static bottom(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.y += grid_size;

		this.send_move(controller, token);
	}

	static left(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x -= grid_size;

		this.send_move(controller, token);
	}

	static right(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x += grid_size;

		this.send_move(controller, token);
	}

	static up_left(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x -= grid_size;
		token.y -= grid_size;

		this.send_move(controller, token);
	}

	static up_right(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x += grid_size;
		token.y -= grid_size;

		this.send_move(controller, token);
	}

	static bottom_left(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x -= grid_size;
		token.y += grid_size;

		this.send_move(controller, token);
	}

	static bottom_right(controller, token_tmp) {
		const token = controller.maptool.tokens.tokens[token_tmp['id']];
		let grid_size = this.get_grid(controller, token);	
		token.x += grid_size;
		token.y += grid_size;

		this.send_move(controller, token);
	}
}
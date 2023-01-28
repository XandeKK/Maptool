class Chat {
	constructor(controller) {
		this.controller = controller;
		this.chat_body = document.getElementById('chat-body');
		this.chat_message = document.getElementById('chat-message');
		this.chat_button = document.getElementById('chat-button');
		this.limit = 125;

		this.chat_button.addEventListener('click', this.send_message.bind(this));
		this.auto_expand();
	}

	add_message(message) {
		const div = document.createElement('div');

		div.className = 'bg-white dark:bg-zinc-800 p-3 rounded';
		div.innerHTML = message;
		
		this.chat_body.appendChild(div);
		this.chat_body.scrollBy({
      top: this.chat_body.scrollHeight,
      left: 0,
      behavior: "smooth"
    })
    
    this.notify();
	}

	send_message() {
		let message = this.chat_message.value;
		const player = this.controller.maptool.player['name'];

		if (message.match(/^@/)){
			this.send_whisper(message);
			return;;
		}

		const data = {
			'messageMsg': {
				'message': {
					'channel': 1,
					'message': `<div class='say'><table class='ava-msg'><tr valign='top'><td class='avatar'></td><td class='message'><span class='prefix'>${player}:</span> <span style='color:#000000'>${message}</span></td></tr></table></div>`,
					'source': player
				}
			}
		}

		this.controller.client.send_message(data);
		this.chat_message.value = '';
	}

	send_whisper(message) {
		const players = this.controller.maptool.players.players;
		const player = this.controller.maptool.player['name'];
		let target = null;

		for (let player in players) {
			let message_tmp = message.substring(0, player.length + 2);
			if (message_tmp == `@${player} `) {
				target = player;
				message = message.replace(message_tmp, '');
				break;
			}
		}

		if (!target) {
			Alert.add('The player you are trying to whisper does not exist, check that it is correct', 'warning', 5000);
			return;
		}

		const data = {
	    'messageMsg': {
	      'message': {
	        'channel': 5,
	        'target': target,
	        'message': `<div class='whisper'>${player} whispers: ${message}</div>`,
	        'source': player
        }
    	}
		}

		this.controller.client.send_message(data);
		this.chat_message.value = '';
	}

	handler(data) {
		let message = data['message'].replace('#000000', '');
		if (!data['target']) {
			this.add_message(message);
		} else {
			const player = this.controller.maptool.player['name'];
			if (data['target'] == player) {
				this.add_message(message);
			} else if (data['source'] == player) {
				message = message.substring(`${player} whispers:`.length);
				message = `You whispered to ${data['target']}:` + message;
				this.add_message(message);
			}
		}
	}

	whisper(player) {
		this.chat_message.value = `@${player['name']} ${this.chat_message.value}`
		window.tabs.show('chat');
		this.chat_message.focus();
	}

	auto_expand() {
		this.chat_message.addEventListener('keyup', (event) => {
			event.preventDefault();

			if (event.key == 'Enter' && event.ctrlKey) this.send_message();

		  this.chat_message.style.height = "";
		  this.chat_message.style.height = Math.min(this.chat_message.scrollHeight + 2, this.limit) + "px";
		});
	}

	notify() {
		if (window.tabs.getActiveTab().id == 'chat') return;

		Alert.add('new message', 'info', 3000);
	}

	clear() {
		document.getElementById('chat-body').innerHTML = '';
	}
}
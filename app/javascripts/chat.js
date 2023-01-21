class Chat {
	constructor(controller) {
		this.controller = controller;
		this.chat_body = document.getElementById('chat-body');
		this.chat_message = document.getElementById('chat-message');
		this.limit = 125;

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

	whisper(player) {
		this.chat_message.value = `@${player['name']} ${this.chat_message.value}`
		window.tabs.show('chat');
		this.chat_message.focus();
	}

	auto_expand() {
		this.chat_message.addEventListener('keyup', (event) => {
			event.preventDefault();

		  this.chat_message.style.height = "";
		  this.chat_message.style.height = Math.min(this.chat_message.scrollHeight, this.limit) + "px";
		});
	}

	clear() {
		document.getElementById('chat-body').innerHTML = '';
	}

	notify() {
		if (window.tabs.getActiveTab().id == 'chat') return;

		Alert.add('new message', 'info', 2000);
	}
}
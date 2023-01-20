class Chat {
	static chat_body = document.getElementById('chat-body');
	static chat_message = document.getElementById('chat-message');
	static limit = 125;
	
	static add_message(message) {
		const div = document.createElement('div');

		div.className = 'bg-white dark:bg-zinc-800 p-3 rounded';
		div.innerHTML = message;
		
		this.chat_body.appendChild(div);
		this.chat_body.scrollBy({
      top: this.chat_body.scrollHeight,
      left: 0,
      behavior: "smooth"
    })
	}

	static auto_expand() {
		this.chat_message.addEventListener('keyup', (event) => {
			event.preventDefault();

		  this.chat_message.style.height = "";
		  this.chat_message.style.height = Math.min(this.chat_message.scrollHeight, this.limit) + "px";
		});
	}
}
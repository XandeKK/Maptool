let textarea_chat = document.getElementById('chat');
let limit = 125;

textarea_chat.addEventListener('keyup', (event) => {
	event.preventDefault();

	if (event.key == 'Control') return;

	if (event.key == 'Enter' && event.ctrlKey) {
		// send
		event.target.value = ''
	}

  event.target.style.height = "";
  event.target.style.height = Math.min(event.target.scrollHeight, limit) + "px";
})

class Alert {
	static colors = {
		'info': 'blue',
		'danger': 'red',
		'success': 'green',
		'warning': 'yellow'
	}
	static options = {
	  transition: 'transition-opacity',
	  duration: 1000,
	  timing: 'ease-out',
	  onHide: (context, target) => {
	  	setTimeout(()=> {target.remove();}, 200)
	  }
	};
	static body_div = [
	  `<svg class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">`,
	    `<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>`,
	  `</svg>`,
	].join('');
	static body_button = [
	  `<span class="sr-only">Dismiss</span>`,
	  `<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">`,
	    `<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>`,
	  `</svg>`
	].join('');

	static add(message, level='info', timeout=8000, parent='alerts') {
		const color = this.colors[level];
		const div = document.createElement('div');
		const div_message = document.createElement('div');
		const button_dismiss = document.createElement('dismiss');

		div.id = `alert-${Random.generate_uuid()}`;
		div.className = `flex w-64 md:w-96 p-4 text-${color}-700 bg-${color}-100 border-t-4 border-${color}-500 dark:text-${color}-400 dark:bg-gray-800`
		div.role = 'alert';

		div_message.className = 'ml-3 text-sm font-medium';
		div_message.innerHTML = message;

		button_dismiss.type = 'button';
		button_dismiss.className = `ml-auto -mx-1.5 -my-1.5 bg-${color}-100 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${color}-300 dark:hover:bg-gray-700 cursor-pointer`;
		button_dismiss.ariaLabel = 'Close';
		
		button_dismiss.innerHTML = this.body_button;
		div.innerHTML = this.body_div;
		div.appendChild(div_message);
		div.appendChild(button_dismiss);

		document.getElementById(parent).appendChild(div);

		const dismiss = new Dismiss(div, button_dismiss, this.options);
		setTimeout(()=> {dismiss.hide();}, timeout)
	}
}
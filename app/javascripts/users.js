class Users {
	constructor(controller) {
		this.controller = controller;
		this.users = {};
	}

	create_dropdown_button(player) {
		const button = document.createElement('button');

		button.id = `dropdown-button-${player['name']}`
		button.className = 'inline-flex items-center p-2 text-center text-gray-900 bg-transparent rounded-lg hover:bg-zinc-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-zinc-600 dark:focus:ring-zinc-500';
		button.type = 'button';

		button.innerHTML = [
	    `<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">`,
	      `<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>`,
	    `</svg>`
    ].join('');

		return button;
	}

	create_dropdown_menu(player) {
		const div = document.createElement('div');
		const ul = document.createElement('ul');
		const li = document.createElement('li');
		const whisper = document.createElement('button');

		div.id = `dropdown-menu-${player['name']}`;
    div.className = 'z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-zinc-700 dark:divide-gray-600';

    ul.className = 'py-1 text-sm text-gray-700 dark:text-gray-200';
    ul.ariaLabelleady = `dropdownMenu-${player['name']}`;

    whisper.className = 'block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white';
    whisper.innerHTML = 'Whisper';

    whisper.addEventListener('click', this.whisper.bind(this, player));

    li.appendChild(whisper);
    ul.appendChild(li);
    div.appendChild(ul);

    return div;
	}

	create_div(player) {
		const li = document.createElement('li');
		const div = document.createElement('div');
		const dropdown_div = document.createElement('div');
		const dropdown_menu = this.create_dropdown_menu(player);
		const dropdown_button = this.create_dropdown_button(player);

		li.className = 'py-3 sm:py-4';

		div.id = `user-${player['name']}`;
		div.className = 'flex items-center space-x-4';
		
		dropdown_div.className = 'inline-flex items-center text-base font-semibold';

		div.innerHTML = [
	    `<div class="flex-1 min-w-0">`,
	      `<p class="text-sm font-medium text-gray-900 truncate dark:text-white">`,
	        `${player['name']}`,
	      `</p>`,
	      `<p class="text-sm truncate">`,
	        `${player['role']}`,
	      `</p>`,
	    `</div>`
		].join('');

    dropdown_div.appendChild(dropdown_button);
    dropdown_div.appendChild(dropdown_menu);
    div.appendChild(dropdown_div);
    li.appendChild(div);

    const dropdown = new Dropdown(dropdown_menu, dropdown_button);

    return li;
	}

	have_this_player(player) {
		return this.users[player['name']]
	}

	add(player) {
		if (this.have_this_player(player)) return;

		const div = this.create_div(player);

		this.users[player['name']] = {
			role: player['role'],
			div: div
		}
		this.controller.chat.add_message(`${player['role'].toLowerCase()} ${player['name']} joined.`)
		document.getElementById('users-list').appendChild(div);
	}

	remove(player) {
		if (!this.have_this_player(player)) return;

		this.users[player['name']].div.remove();

		delete this.users[player['name']];
		this.controller.chat.add_message(`${player['role'].toLowerCase()} ${player['name']} left.`)
	}

	clear() {
		document.getElementById('users-list').innerHTML = '';
	}

	whisper(player) {
		this.controller.chat.whisper(player);
	}
}
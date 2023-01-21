class Form {
	constructor(controller) {
		this.controller = controller;
		this.form = document.getElementById('form-server');
		this.button_unsubscribe = document.getElementById('button-unsubscribe');
		this.add_events();
	}

	add_events() {
		this.form.addEventListener('submit', () => {
			event.preventDefault();

			if (this.controller.status == 'subscribed') return;

			this.data = this.form_to_json();
			this.controller.maptool.set_player(this.data);
			this.controller.client.subscribe();
			this.controller.status = 'subscribed';

			this.hide_form();
		}); 

		this.button_unsubscribe.addEventListener('click', () => {
			event.preventDefault();

			if (this.controller.status != 'subscribed') return;

			this.controller.reset();
			this.controller.client.unsubscribe();
			
			this.show_form();
		});
	}

	show_form() {
		this.button_unsubscribe.classList.add('hidden');
		this.form.classList.remove('hidden');
	}

	hide_form() {
		this.button_unsubscribe.classList.remove('hidden');
		this.form.classList.add('hidden');
	}

	form_to_json() {
		return {
			address: document.getElementById('address').value,
			port: document.getElementById('port').value,
			name: document.getElementById('username').value,
			password: document.getElementById('password').value,
			version: document.getElementById('version').value
		};
	}
}
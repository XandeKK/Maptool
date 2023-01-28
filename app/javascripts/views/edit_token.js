class EditToken {
	static append(token, parent, properties, submit_bind) {
		const form = document.createElement('form');
		const submit = document.createElement('button');

		form.id = `form-${token['id']}`;
		form.className = 'md:p-5';
		form.autocomplete = 'off';

		form.appendChild(this.create_input('name', token));
		form.appendChild(this.create_textarea('notes', token));

		submit.className = 'text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'
		submit.textContent = 'Update';
		submit.addEventListener('click', submit_bind)

		for (let i in properties) {
			const name = properties[i]['name'];

			form.appendChild(this.create_input(name, token, true));
		}

		form.appendChild(submit);
		parent.appendChild(form);
	}

	static create_input(name, token, is_property=false) {
		const div = document.createElement('div');
		const label = document.createElement('label');
		const input = document.createElement('input');
		let value;

		if (is_property) {
			value = token['properties'][name] || '';
		} else {
			value = token[name] || '';
		}

		div.className = 'mb-6';

		label.className = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
		label.htmlFor = `${name}-${token['id']}`;
		label.textContent = name;

		input.id = `${name}-${token['id']}`;
		input.className = 'bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500';
		input.type = 'text';
		input.value = value;

		div.appendChild(label);
		div.appendChild(input);

		return div;
	}

	static create_textarea(name, token) {
		const div = document.createElement('div');
		const label = document.createElement('label');
		const textarea = document.createElement('textarea');
		const value = token[name] || '';

		div.className = 'mb-6';

		label.className = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
		label.htmlFor = `${name}-${token['id']}`;
		label.textContent = name;

		textarea.id = `${name}-${token['id']}`;
		textarea.className = 'bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500';
		textarea.value = value;
		textarea.rows = 3;

		div.appendChild(label);
		div.appendChild(textarea);

		return div;
	}
}
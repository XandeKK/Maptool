class Token {
	constructor(controller) {
		this.controller = controller;
	}

	create_div(token) {
		const id = token['id']
		const div = document.createElement('div');
		const h1 = document.createElement('h1');
		const ul = document.createElement('ul');
		const tab_content = document.createElement('div');
		const tabElements = [];
		const tabs = [ 'edit', 'control' ];

		ul.role = 'tablist';

		div.id = `token-${token['id']}`;
		div.className = 'bg-white md:rounded-lg dark:bg-zinc-800 mb-5';
		h1.className = 'flex w-full justify-between bg-emerald-600 text-white p-3 md:rounded-t-lg items-center font-bold';
		ul.className = 'flex -mb-px text-sm font-medium text-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700';

		h1.id = `h1-${token['id']}`;
		h1.textContent = `${token['name']} - ${token['zone']['name']}`;

		for (let i in tabs) {
			const li = document.createElement('li');
			const button = document.createElement('button');
			const body = document.createElement('div');

			li.role = 'presentation';

			button.id = `${tabs[i]}-${id}-tab`;
			button.className = 'inline-block p-4 border-b-2 rounded-t-lg';
			button.type = 'button';
			button.role = 'tab';
			button.ariaControls = `${tabs[i]}-${id}`;
			button.ariaSelected = 'false'
			button.textContent = tabs[i].charAt(0).toUpperCase() + tabs[i].slice(1);

			body.id = `${tabs[i]}-${token['id']}`;
			body.className = 'p-4'
			body.role = 'tabpanel';
			body.ariaLabelledby = `${tabs[i]}-${token['id']}-tab`;

			this[`create_${tabs[i]}`](token, body);

			li.appendChild(button);
			ul.appendChild(li);
			tab_content.appendChild(body);

			tabElements.push({
				id: tabs[i],
				triggerEl: button,
				targetEl: body
			});
		}

		const options = {
	    defaultTabId: `tab-${token[id]}`,
	    activeClasses: 'text-emerald-600 hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-400 border-emerald-600 dark:border-emerald-500',
	    inactiveClasses: 'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
		};

		new Tabs(tabElements, options);

		div.appendChild(h1);
		div.appendChild(ul);
		div.appendChild(tab_content);

		document.getElementById('token-tab-content').appendChild(div);
	}

	create_edit(token, parent) {
		const properties = this.controller.maptool.get_properties(token['propertyType']);
		EditToken.append(token, parent, properties, this.update_token.bind(this, properties, token));
	}

	create_control(token, parent) {
		ControlToken.append(this.controller, token, parent);
	}

	update_view(token) {
		document.getElementById(`h1-${token['id']}`).textContent = `${token['name']} - ${token['zone']['name']}`;
		document.getElementById(`form-${token['id']}`).remove();
		this.create_edit(token, document.getElementById(`edit-${token['id']}`));
	}
}
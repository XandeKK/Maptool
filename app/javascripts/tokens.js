class Tokens {
	constructor(controller) {
		this.controller = controller;
		this.tokens = {};
	}

	get_value_property(token, property) {
		return token['properties'][property] || '';
	}

	update_token(properties, token) {
		event.preventDefault();
		for (let i in properties) {
			const name = properties[i]['name'];
			const value = document.getElementById(`${name}-${token['id']}`).value;

			token['properties'][name] = value;
		}

		let token_tmp = Object.assign({}, token);

		delete token_tmp.zone;

		this.controller.client.send_message({
	    "editTokenMsg": {
	        "zoneGuid": token.zone.id,
	        'token': token_tmp
	    }
		})
		Alert.add('Updated', 'success');
	}

	create_edit(token) {
		const properties = this.controller.maptool.get_properties(token['propertyType']);
		const form = document.createElement('form');
		const div = document.createElement('div');
		const submit = document.createElement('button');
    
		div.id = `edit-${token['id']}`;
		div.className = 'p-4'
		div.role = 'tabpanel';
		div.ariaLabelledby = `edit-${token['id']}-tab`;

		form.id = `form-${token['id']}`;
		form.className = 'md:p-5';
		form.autocomplete = 'off';

		submit.className = 'text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'
		submit.textContent = 'Update';
		submit.addEventListener('click', this.update_token.bind(this, properties, token))

		for (let i in properties) {
			const name = properties[i]['name'];

			form.appendChild(this.create_property_field(name, token));
		}

		form.appendChild(submit);
		div.appendChild(form);

		return div;
	}

	create_property_field(property, token) {
		const value = this.get_value_property(token, property);
		const div = document.createElement('div');
		const label = document.createElement('label');
		const input = document.createElement('input');

		div.className = 'mb-6';

		label.className = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
		label.htmlFor = `${property}-${token['id']}`;
		label.textContent = property;

		input.id = `${property}-${token['id']}`;
		input.className = 'bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500';
		input.type = 'text';
		input.value = value;

		div.appendChild(label);
		div.appendChild(input);

		return div;
	}

	create_control(token) {
		const div = document.createElement('div');
    
		div.id = `control-${token['id']}`;
		div.className = 'p-4'
		div.role = 'tabpanel';
		div.ariaLabelledby = `control-${token['id']}-tab`;

		Control.append_control(this.controller, token, div);

		return div;
	}

	create_div(token) {
		const id = token['id']
		const div = document.createElement('div');
		const h1 = document.createElement('h1');
		const ul = document.createElement('ul');
		const tab_content = document.createElement('div');
		const tabElements = [];
		const tabs = [ 'Edit', 'Control' ];

		ul.role = 'tablist';

		div.className = 'bg-white md:rounded-lg dark:bg-zinc-800 mb-5';
		h1.className = 'flex w-full justify-between bg-emerald-600 text-white p-3 md:rounded-t-lg items-center font-bold';
		ul.className = 'flex -mb-px text-sm font-medium text-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700';

		h1.textContent = `${token['name']} - ${token['zone']['name']}`;

		for (let tab in tabs) {
			const li = document.createElement('li');
			const button = document.createElement('button');
			const body = this[`create_${tabs[tab].toLowerCase()}`](token)

			li.role = 'presentation';

			button.id = `${tabs[tab]}-${id}-tab`;
			button.className = 'inline-block p-4 border-b-2 rounded-t-lg';
			button.type = 'button';
			button.role = 'tab';
			button.ariaControls = `${tabs[tab]}-${id}`;
			button.ariaSelected = 'false'
			button.textContent = tabs[tab];

			li.appendChild(button);
			ul.appendChild(li);
			tab_content.appendChild(body);

			tabElements.push({
				id: tabs[tab],
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

	is_my_token(token) {
		if (!token['ownerList']) return false;
		return token['ownerList'].includes(this.controller.maptool.player['name']);
	}

	add_many_tokens(zones) {
		zones.forEach((zone) => {
			zone['tokens'].forEach(this.add.bind(this, zone['id'], zone['name']));
		});
	}

	add(zone_id, zone_name, token) {
		if (!this.is_my_token(token)) return;

		token['zone'] = {id: zone_id, name: zone_name};

		this.create_div(token);

		this.tokens[token['id']] = token;
	}
}
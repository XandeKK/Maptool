class Maptool {
	constructor(controller) {
		this.controller = controller;
		this.users = new Users(controller);
		this.tokens = {};
		this.campaign = null;
	}
}
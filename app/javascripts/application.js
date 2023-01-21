//= require flowbite/dist/flowbite.min.js
//= require_tree .

const controller = new Controller();

window.enable_debug = () => { controller.client.enable_debug() };
window.disable_debug = () => { controller.client.disable_debug() };
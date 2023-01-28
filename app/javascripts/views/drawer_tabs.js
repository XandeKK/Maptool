const tabElements = [
    {
        id: 'server',
        triggerEl: document.querySelector('#server-tab'),
        targetEl: document.querySelector('#server-tab-content')
    },
    {
        id: 'players',
        triggerEl: document.querySelector('#players-tab'),
        targetEl: document.querySelector('#players-tab-content')
    },
    {
        id: 'token',
        triggerEl: document.querySelector('#token-tab'),
        targetEl: document.querySelector('#token-tab-content')
    },
    {
        id: 'chat',
        triggerEl: document.querySelector('#chat-tab'),
        targetEl: document.querySelector('#chat-tab-content')
    }
];

const options = {
    defaultTabId: 'drawer-tabs',
    activeClasses: 'text-emerald-600 hover:text-emerald-600 dark:text-emerald-500 dark:hover:text-emerald-400 border-emerald-600 dark:border-emerald-500',
    inactiveClasses: 'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
};

window.tabs = new Tabs(tabElements, options);
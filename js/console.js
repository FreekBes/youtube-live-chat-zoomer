const consoleLog = function(...logMessages) {
	console.log('%c[YouTube Live Chat Zoomer]', 'font-weight: bold; color: darkred;', ...logMessages);
};

const consoleWarn = function(...logMessages) {
	console.warn('%c[YouTube Live Chat Zoomer]', 'font-weight: bold; color: darkred;', ...logMessages);
};

const consoleError = function(...logMessages) {
	console.error('%c[YouTube Live Chat Zoomer]', 'font-weight: bold; color: darkred;', ...logMessages);
};

// Rest of the console functions are rarely used, so they are not included here.

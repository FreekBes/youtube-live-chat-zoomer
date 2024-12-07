consoleLog('loading apply.js content script');

const setCSSVariable = function(variableName, value) {
	document.documentElement.style.setProperty(`--yt-live-chat-zoomer-${variableName}`, value);
};

const scrollToChatBottom = function() {
	try {
		const scrollElement = document.querySelector('.yt-live-chat-renderer#contents .yt-live-chat-item-list-renderer#item-scroller');
		if (scrollElement) {
			consoleLog('Found scroll element, scrolling to the bottom the chat', scrollElement);
			scrollElement.scrollTop = scrollElement.scrollHeight;
		}
		else {
			consoleWarn('Scroll element not found, unable to scroll to the bottom of the chat');
		}
	}
	catch (err) {
		consoleError('Error scrolling to the bottom of the chat:', err);
	}
};

const applySettings = async function() {
	consoleLog('Applying settings...');

	// Apply zoom
	const zoomAmount = await getSetting('zoom');
	consoleLog(`Applying zoom of ${zoomAmount}%`);
	setCSSVariable('zoom', `${zoomAmount / 100}`);

	// Apply hide input
	const hideInput = await getSetting('hide-input');
	consoleLog(`Hiding chat input: ${hideInput}`);
	try {
		const chatInput = document.querySelector('.yt-live-chat-renderer#input-panel');
		if (chatInput) {
			chatInput.classList.toggle('hidden', hideInput);
		}
	}
	catch (error) {
		consoleError('Error hiding chat input:', error);
	}

	// Scroll to the bottom of the chat after applying all settings
	scrollToChatBottom();
};

applySettings();

// Listen to settings changes
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
	switch (request.message) {
		case 'settings-changed':
			consoleLog('Settings changed, applying new settings...');
			applySettings();
			break;
		default:
			consoleWarn('Unknown message received:', request);
			break;
	}
});

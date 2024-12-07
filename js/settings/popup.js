const showRangeValue = function(ev) {
	const rangeValueOutput = ev.target.nextElementSibling;
	rangeValueOutput.textContent = ev.target.value;
};

const notifyContentScriptOfSettingChange = function() {
	chrome.tabs.query({ url: 'https://*.youtube.com/live_chat*' }, async function(tabs) {
		for (const tab of tabs) {
			try {
				await chrome.tabs.sendMessage(tab.id, { message: 'settings-changed' });
			}
			catch (err) {
				console.error('Error sending message to content script:', err);
			}
		}
	});
};

const saveSetting = function(ev) {
	const key = `settings-${ev.target.id}`;
	const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
	chrome.storage.local.set({ [key]: value }, function() {
		console.log(`Settings saved: ${key} = ${value}`);
		notifyContentScriptOfSettingChange();
	});
};

const loadSetting = function(settingsInput, value) {
	switch(settingsInput.type) {
		case "checkbox":
			settingsInput.checked = value;
			break;
		case "range":
			settingsInput.value = value;
			showRangeValue({ target: settingsInput });
			break;
		default:
			settingsInput.value = value;
			break;
	}
}

const loadSettings = function(settingsInputs) {
	for (const settingsInput of settingsInputs) {
		const key = `settings-${settingsInput.id}`;
		chrome.storage.local.get([key], function(result) {
			const value = result[key];
			if (value !== undefined) {
				console.log(`Loading value for setting: ${key}, value: ${value}`);
				loadSetting(settingsInput, value);
			}
			else {
				// Initialize default value if no setting value is found in storage
				console.log(`Initializing default value for setting: ${key}, value: ${DEFAULT_VALUES[key]}`);
				loadSetting(settingsInput, DEFAULT_VALUES[key]);
			}
		});
	}
};

const initSettings = function() {
	const settingsIngputs = document.getElementsByClassName('settings-input');
	loadSettings(settingsIngputs);
	for (let i = 0; i < settingsIngputs.length; i++) {
		settingsIngputs[i].addEventListener('change', saveSetting);
		if (settingsIngputs[i].type === 'range') {
			showRangeValue({ target: settingsIngputs[i] });
			settingsIngputs[i].addEventListener('input', showRangeValue);
		}
	}
};

initSettings();

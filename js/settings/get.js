const getSetting = function(key) {
	chrome.storage.local.get(null, function(result) {
		consoleLog(result);
	});
	return new Promise(function(resolve) {
		const settingsKey = `settings-${key}`;
		chrome.storage.local.get([settingsKey], function(result) {
			consoleLog(result);
			if (result[settingsKey] === undefined) {
				// Return default value if no setting value is found in storage
				// This happens when the extension's popup has not been opened yet
				resolve(DEFAULT_VALUES[settingsKey]);
				return;
			}
			resolve(result[settingsKey]);
		});
	});
};

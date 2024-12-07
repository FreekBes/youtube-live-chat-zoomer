#!/bin/bash

# Delete existing zip
rm -f youtube-live-chat-zoomer.zip

# Zip the files
zip -r youtube-live-chat-zoomer.zip . \
	-x ".*" \
	-x "*/.*" \
	-x "build.sh" \
	-x "README.md" \
	-x "imgs/icon/icon.psd" \
	-x "youtube-live-chat-zoomer.zip"

echo "youtube-live-chat-zoomer.zip created"
ls -lah youtube-live-chat-zoomer.zip

#!/bin/bash

# Start ollama in the background
ollama serve &
while ! curl -s localhost:11434 >/dev/null; do
    echo "Waiting for ollama to start..."
    sleep 1
done
ls -la
pwd
node /opt/app/app.js


#!/bin/bash
chmod a+x run.sh

if [ "$1" == "dev" ] || [ "$1" == "-d" ]; then
    echo "running local development watch"
    npm run watch
    npm run dev
else
    echo "running without watch"
    npm start
fi

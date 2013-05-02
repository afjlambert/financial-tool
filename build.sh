#!/bin/bash

echo "Linting..."
jsl -process financial-tool.js
SUCCESS=$?

if [ $SUCCESS = "0" ]; then
    echo "Building"
    cat lib/jquery.min.js lib/jquery-cookie.js financial-tool.js | jsmin > "build/financial-tool.min.js"
    echo "Done"
else
    echo
    echo "Build failed"
fi
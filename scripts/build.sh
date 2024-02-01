#!/bin/sh

rm -rf dist/ tsconfig.tsbuildinfo
tsc
cp -R src/templates dist/templates
chmod u+x dist/index.js

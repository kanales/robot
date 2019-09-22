#! /bin/sh

mkdir build && tsc && browserify build/* -o lrta.js; rm -rf build

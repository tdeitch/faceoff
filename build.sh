#!/bin/sh
java -jar yuicompressor-2.4.1.jar decide.js > build/decide.js
java -jar yuicompressor-2.4.1.jar style.css > build/style.css
cp index.html build/
cd build 
python ../merge-js-css-html.py index.html > ../dist/index.html
inkscape -z -e touch-icon-iphone.png -w 60 -h 60 ../icon.svg 
inkscape -z -e touch-icon-ipad.png -w 76 -h 76 ../icon.svg 
inkscape -z -e touch-icon-iphone-retina.png -w 120 -h 120 ../icon.svg 
inkscape -z -e touch-icon-ipad-retina.png -w 152 -h 152 ../icon.svg
cp ../startup.png .
cp *.png ../dist/

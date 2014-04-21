ICONS = images/touch-icon-iphone.png images/touch-icon-ipad.png images/touch-icon-iphone-retina.png images/touch-icon-ipad-retina.png

default: ${ICONS} build/decide.js build/style.css
	cp index.html dist/
	cp build/decide.js dist/
	cp build/style.css dist/
	cp ${ICONS} dist/

build/decide.js:
	java -jar lib/yuicompressor-2.4.1.jar decide.js > build/decide.js

build/style.css:
	java -jar lib/yuicompressor-2.4.1.jar style.css > build/style.css

images/touch-icon-iphone.png:
	inkscape -z -e images/touch-icon-iphone.png -w 60 -h 60 images/icon.svg 

images/touch-icon-ipad.png:
	inkscape -z -e images/touch-icon-ipad.png -w 76 -h 76 images/icon.svg 

images/touch-icon-iphone-retina.png:
	inkscape -z -e images/touch-icon-iphone-retina.png -w 120 -h 120 images/icon.svg 

images/touch-icon-ipad-retina.png:
	inkscape -z -e images/touch-icon-ipad-retina.png -w 152 -h 152 images/icon.svg


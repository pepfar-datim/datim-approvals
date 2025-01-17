
######################
# BUILD


init:
	rm -rf build_temp
	mkdir build_temp

build_search:
	# build search		
	(cd search && npm run import && npm run build)
#	mv search/dist build_temp
#	mv build_temp/dist build_temp/search
	cp -r search/dist/* build_temp

build_view:
	# build search		
	(cd view && npm run import && npm run build)
	#mv view/dist build_temp
	#mv build_temp/dist build_temp/view
	mv view/dist/index.html view/dist/view.html
	cp -r view/dist/* build_temp

manifest:
	# manifest
	cp -r meta/* build_temp

zip:
	#zip
	(rm -f Approvals.zip && cd build_temp && zip ../Approvals.zip -r .)

build:
	make init
	make build_search
	make build_view
	make manifest
	make zip


######################
# INSTALL
######################
reinstall:
	(cd service && rm -rf node_modules && rm package-lock.json && npm --force install)
	(cd page && rm -rf node_modules && rm package-lock.json && npm --force install)
	(cd search && rm -rf node_modules && rm package-lock.json && npm --force install && npm run import)
	(cd view && rm -rf node_modules && rm package-lock.json && npm --force install && npm run import)

install:
	(cd service && npm --force install)
	(cd page && npm --force install)
	(cd search && npm --force install && npm run import)
	(cd view && npm --force install && npm run import)
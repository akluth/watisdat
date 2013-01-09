all:
	@echo "Checking prerequisites..."
	@perl prereq.pl
clean:
	@rm -rf node_modules

install:
	mkdir /usr/share/watisdat
	cp -vrf ./src /usr/share/watisdat
	chmod +xxx /usr/share/nyssrad/src/watisdat
	cp -vrf ./node_modules /usr/share/watisdat
	ln -s /usr/share/nyssrad/src/watisdat /usr/bin/watisdat

uninstall:
	rm -vrf /usr/share/watisdat
	rm /usr/bin/watisdat

.PHONY: all clean

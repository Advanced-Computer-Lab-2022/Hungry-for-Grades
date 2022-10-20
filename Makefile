
CMD:=yarn run
client:=cd client
server:=cd client
root:=cd ..

up:
	docker-compose up --build -d

install:
	yarn &&
	$(client) && yarn
	$(root) &&
	$(server) && yarn

runserver:
	$(server) && $(CMD) dev

runclient:
	$(client) && $(CMD) dev

testclient:
	$(client) && $(CMD) test

testserver:
	$(server) && $(CMD) test

test:
	testclient &&  testserver

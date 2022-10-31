APP_NAME = typescript-express
APP_NAME := $(APP_NAME)

CMD:=yarn run
client:=cd client
server:=cd server
root:=cd ..

# Docker Compose
up:
	docker-compose up --build -d

# to install dependencies in root & client & server
install:
	yarn run installall

# to run the server
runserver:
	$(server)
	$(CMD) dev

# to run the client
runclient:
	$(client)
	$(CMD) dev

# to run the server and client concurrently
run:
	$(CMD) dev

# to test client
testclient:
	$(client)
	$(CMD) test

# to test server
testserver:
	$(server)
	$(CMD) test

# to test the server and client concurrently
test:
	$(CMD) test

# to lint client
lintclient:
	$(client)
	$(CMD) lint

# to lint server
lintserver:
	$(server)
	$(CMD) lint

# to lint the server and client concurrently
lint:
	$(CMD) lint
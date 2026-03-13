.PHONY: install clean dev build kill-ports

# Default port for Vite
PORT ?= 5173
PORT_ALT ?= 5174

help:
	@echo "Available commands:"
	@echo "  make dev      - Kills existing processes on Vite ports and starts the dev server"
	@echo "  make install  - Installs npm dependencies"
	@echo "  make build    - Builds the project for production"
	@echo "  make clean    - Removes node_modules and package-lock.json"
	@echo "  make kill     - Force kills any processes running on ports $(PORT) and $(PORT_ALT)"

install:
	npm install

clean:
	rm -rf node_modules package-lock.json
	
kill: kill-ports

kill-ports:
	@echo "Checking for processes on port $(PORT)..."
	@-lsof -t -i:$(PORT) | xargs kill -9 2>/dev/null || true
	@echo "Checking for processes on port $(PORT_ALT)..."
	@-lsof -t -i:$(PORT_ALT) | xargs kill -9 2>/dev/null || true

dev: kill-ports
	npm run dev

build:
	npm run build

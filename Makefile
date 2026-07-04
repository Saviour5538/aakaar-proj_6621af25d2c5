.PHONY: install dev build test docker-up docker-down clean

install:
	# Install backend dependencies
	pip install -r backend/requirements.txt
	# Install frontend dependencies
	cd frontend && npm install

dev:
	# Start the development environment
	./scripts/dev.sh

build:
	# Build the frontend for production
	cd frontend && npm run build

test:
	# Run backend tests
	pytest backend/tests
	# Run frontend tests
	cd frontend && npm test

docker-up:
	# Start the application using Docker Compose
	docker-compose up --build -d

docker-down:
	# Stop and remove Docker containers
	docker-compose down

clean:
	# Remove Python cache files
	find . -type d -name "__pycache__" -exec rm -r {} +
	# Remove node_modules
	rm -rf frontend/node_modules
	# Remove Docker containers, images, and volumes
	docker-compose down --volumes --rmi all
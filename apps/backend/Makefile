DB_CONTAINER = stx-support-pg
DB_PASSWORD = password
DB_PORT = 5431
DB_URL = postgres://postgres:$(DB_PASSWORD)@localhost:$(DB_PORT)/postgres?sslmode=disable

.PHONY: restart-db

mig:
	@bun gen
	@bun mig

stop-container:
	@echo "Stopping existing container..."
	docker stop $(DB_CONTAINER) || true

remove-container:
	@echo "Removing container..."
	docker rm $(DB_CONTAINER) || true

start-container:
	@echo "Starting new container..."
	docker run --name $(DB_CONTAINER) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-p $(DB_PORT):5432 \
		-d postgres

restart-db:
	$(MAKE) stop-container
	$(MAKE) remove-container
	$(MAKE) start-container
	@echo "Waiting for PostgreSQL to start..."
	@sleep 3
	@echo "Enabling UUID extension..."
	@docker exec -i $(DB_CONTAINER) psql -U postgres -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

psql:
	@docker exec -it $(DB_CONTAINER) psql -U postgres

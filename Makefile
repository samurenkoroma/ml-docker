start:
	docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d --build --remove-orphans
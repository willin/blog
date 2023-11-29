.PHONY: clean dev build
all: clean dev

clean:
	rm -rf `find . -name build -not -path "./node_modules/*"`
	rm -rf .cache

dev:
	pnpm dev

build:
	cd scripts && npm install
	node scripts/content.mjs
	NODE_ENV=production npx remix build

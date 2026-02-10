# Makefile for Band App
.PHONY: deploy check dev build install help

# Default target
.DEFAULT_GOAL := help

deploy: ## Deploy to Render (push to main)
	@echo "🚀 Deploying to Render..."
	@git add .
	@git commit -m "chore: deploy via make" || echo "No changes to commit"
	@git push origin main
	@echo "✅ Pushed to main. Render should start building automatically."
	@echo "⏳ Wait a few minutes and run 'make check' to verify."

check: ## Check deployment status
	@./check-deploy.sh

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

install: ## Install dependencies
	npm install

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

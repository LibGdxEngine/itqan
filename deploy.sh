#!/bin/bash

# Production deployment script for Next.js + Django API

set -e

echo "🚀 Starting production deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp env.example .env
    echo "📝 Please edit .env file with your configuration before running again."
    exit 1
fi

# Build and start services
echo "🔨 Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Health check
echo "🏥 Performing health checks..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Nginx is healthy"
else
    echo "❌ Nginx health check failed"
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Next.js app is healthy"
else
    echo "❌ Next.js app health check failed"
fi

echo "🎉 Deployment completed!"
echo "📱 Frontend: http://localhost"
echo "🔧 API: http://localhost:8000"
echo "📊 View logs: docker-compose -f docker-compose.prod.yml logs -f"

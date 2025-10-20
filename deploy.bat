@echo off
REM Production deployment script for Next.js + Django API

echo 🚀 Starting production deployment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating from example...
    copy env.example .env
    echo 📝 Please edit .env file with your configuration before running again.
    exit /b 1
)

REM Build and start services
echo 🔨 Building Docker images...
docker-compose -f docker-compose.prod.yml build --no-cache

echo 🛑 Stopping existing containers...
docker-compose -f docker-compose.prod.yml down

echo 🚀 Starting services...
docker-compose -f docker-compose.prod.yml up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Health check
echo 🏥 Performing health checks...
curl -f http://localhost/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Nginx is healthy
) else (
    echo ❌ Nginx health check failed
)

curl -f http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Next.js app is healthy
) else (
    echo ❌ Next.js app health check failed
)

echo 🎉 Deployment completed!
echo 📱 Frontend: http://localhost
echo 🔧 API: http://localhost:8000
echo 📊 View logs: docker-compose -f docker-compose.prod.yml logs -f
pause

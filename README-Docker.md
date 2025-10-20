# Docker Production Setup

This project is configured for production deployment using Docker containers with Nginx as a reverse proxy.

## Architecture

- **Next.js Frontend**: React application served on port 3000
- **Django API**: Backend API server on port 8000
- **Nginx**: Reverse proxy handling routing and SSL termination
- **PostgreSQL**: Database (optional, uncomment in docker-compose.prod.yml)

## Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit configuration
nano .env
```

### 2. Development

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f
```

### 3. Production Deployment

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## Configuration

### Environment Variables

Key environment variables to configure in `.env`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://your-domain.com
API_BASE_URL=http://django-api:8000

# Django API
DJANGO_API_URL=http://django-api:8000
DJANGO_MEDIA_URL=http://your-domain.com/media

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@db:5432/database
POSTGRES_DB=your_database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
```

### Nginx Configuration

The Nginx configuration routes:
- `/api/*` → Django API
- `/media/*` → Django media files
- `/static/*` → Django static files
- `/admin/*` → Django admin
- `/*` → Next.js application

### SSL Setup (Production)

1. Place SSL certificates in `nginx/ssl/`:
   - `cert.pem` - SSL certificate
   - `key.pem` - Private key

2. Update `nginx/conf.d/default.conf` to enable HTTPS

## Docker Commands

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production

```bash
# Build and start production
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop production
docker-compose -f docker-compose.prod.yml down
```

### Maintenance

```bash
# Rebuild specific service
docker-compose build nextjs-app

# Update and restart
docker-compose pull && docker-compose up -d

# Clean up
docker system prune -a
```

## Monitoring

### Health Checks

- Frontend: `http://localhost/health`
- API: `http://localhost:8000/health`

### Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs-app
docker-compose logs -f django-api
docker-compose logs -f nginx
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 443, 3000, 8000 are available
2. **Permission issues**: Run with `sudo` if needed
3. **Build failures**: Check Dockerfile and dependencies
4. **Network issues**: Verify docker network configuration

### Debug Commands

```bash
# Check container status
docker ps -a

# Inspect container
docker inspect container_name

# Execute shell in container
docker exec -it container_name sh

# Check network
docker network ls
docker network inspect app-network
```

## Security Considerations

- Change default passwords
- Use strong SSL certificates
- Configure firewall rules
- Regular security updates
- Monitor logs for suspicious activity

## Performance Optimization

- Enable gzip compression
- Configure caching headers
- Use CDN for static assets
- Monitor resource usage
- Optimize Docker images

## Backup Strategy

```bash
# Backup volumes
docker run --rm -v nginx-ssl:/data -v $(pwd)/backup:/backup alpine tar czf /backup/nginx-ssl.tar.gz -C /data .

# Restore volumes
docker run --rm -v nginx-ssl:/data -v $(pwd)/backup:/backup alpine tar xzf /backup/nginx-ssl.tar.gz -C /data
```

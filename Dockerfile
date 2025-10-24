# -------------------------------
# Base image
# -------------------------------
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# -------------------------------
# Dependencies
# -------------------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./

# Install all deps (including devDeps, needed for build)
RUN npm install

# -------------------------------
# Build stage
# -------------------------------
FROM base AS builder
WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js app
RUN npm run build

# -------------------------------
# Production runner
# -------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary output only
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]


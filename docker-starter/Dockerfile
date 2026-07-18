# Dockerfile

# ── STAGE 1: Install dependencies ────────────────────────────
FROM node:18-slim AS deps
WORKDIR /app
# Copy package.json only first (layer caching trick)
# If package.json unchanged → npm install uses cache
COPY package.json .
RUN npm install --production

# ── STAGE 2: Production image ─────────────────────────────────
FROM node:18-slim AS runner
WORKDIR /app

# Security: run as non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy only what we need from stage 1
COPY --from=deps /app/node_modules ./node_modules
COPY src/ ./src/
COPY package.json .

# Switch to non-root user
USER appuser

EXPOSE 3000

# Health check built into image
HEALTHCHECK --interval=30s --timeout=10s \
  --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]

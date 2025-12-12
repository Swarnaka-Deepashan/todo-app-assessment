# -------------------------
# Stage 1: Build the app
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cache layer)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build NestJS project
RUN npm run build


# -------------------------
# Stage 2: Run the app
# -------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose NestJS port (default 3000)
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main.js"]
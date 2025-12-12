# Stage 1 — Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build from first stage
COPY --from=build /app/dist /usr/share/nginx/html
# (For CRA use: /app/build instead of /app/dist)

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
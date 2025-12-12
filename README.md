# Todo Fullstack Project

This project contains a fullstack Todo application with a React frontend, NestJS backend, and MySQL database, all managed with Docker Compose.

## Prerequisites
- Docker and Docker Compose installed
- Node.js and npm (for local development, optional)

## Quick Start (Recommended)

1. **Clone the repository**
   ```sh
   git clone https://github.com/Swarnaka-Deepashan/todo-app-assessment.git
   cd todo-fe
   ```

2. **Build and run all services with Docker Compose**
   ```sh
   docker-compose up -d --build
   ```
   This will build and start:
   - MySQL database (port 3306)
   - NestJS backend API (port 3000)
   - React frontend (port 80)

3. **Access the application**
   - Frontend: [http://localhost](http://localhost)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - MySQL: localhost:3306 (user: app_user, pass: app_pass, db: app_db)

4. **Stop all services**
   ```sh
   docker-compose down
   ```

## Local Development (Optional)

### Frontend (React)
```sh
cd todo-web
npm install
npm run dev
```
- Access at [http://localhost:5173](http://localhost:5173) by default.

### Backend (NestJS)
```sh
cd todo-backend
npm install
npm run start:dev
```
- Access at [http://localhost:3000](http://localhost:3000)

## Troubleshooting
- If you do not see the latest changes, run:
  ```sh
  docker-compose down --rmi all --volumes --remove-orphans
  docker-compose up -d --build
  ```
- If port 3306 is in use, stop any other MySQL service or change the port mapping in `docker-compose.yml`.

## Project Structure
- `todo-web/` - React frontend
- `todo-backend/` - NestJS backend
- `docker-compose.yml` - Multi-service orchestration

---

For any issues, please open an issue or contact the maintainer.

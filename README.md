# Workflow Example

`workflow-example` is an Express application built with TypeScript, integrated with PostgreSQL, and containerized using Docker. It demonstrates workflow processing application in a scalable environment.

## Features

- Express server with TypeScript
- PostgreSQL database integration
- Xstate for workflow management
- Docker and Docker Compose for containerization
- Nginx for load balancing

## Prerequisites

- Node.js
- Docker and Docker Compose

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/adrianhdezm/workflow-example.git
cd workflow-example
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=s3cr3t
DB_NAME=app
```

### 3. Build and Run the Project

Use Docker Compose to build and start the services:

```bash
docker-compose up --build
```

### 4. Access the Application

API Root: http://localhost:8080

### 5. Stop the Services

```bash
docker-compose down
```

## Create Database Migrations using Knex

To create a new migration, run the following command:

```bash
npx knex migrate:make migration_name -x ts
```

this will create a new migration file in the `migrations` directory.

To run the migrations, execute:

```bash
npx knex migrate:latest
```

this will run all pending migrations.

To rollback the last migration, run:

```bash
npx knex migrate:rollback
```

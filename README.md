# 🛒 Orders MicroService

<p align="center">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="300"/>
</p>

Microservice built with NestJS to manage order-related operations. This microservice uses **PostgreSQL** as the database for storing order information and runs in a Docker container.

<p align="center">
  <img src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg" alt="PostgreSQL Logo" width="200"/>
  <img src="https://www.vectorlogo.zone/logos/docker/docker-ar21.svg" alt="Docker Logo" width="200"/>
</p>

## 🚀 Development Setup

1. **📥 Clone the repository:**
   git clone https://github.com/YourUsername/orders-microservice
   cd orders-microservice

2. **📦 Install dependencies:**
   npm install

3. **🔧 Set up environment variables:**
   Create a `.env` file based on the provided `.env.template`:
   cp .env.template .env
   Edit the `.env` file to add the required environment variables.

4. **🐳 Start the PostgreSQL database with Docker Compose:**
   Ensure Docker is installed and run the following command to start the PostgreSQL database:
   docker compose up -d

5. **🗃️ Run Prisma migrations and generate the client:**
   npx prisma migrate dev
   npx prisma generate

6. **🛠️ Start the application in development mode:**
   npm run start:dev

7. **🧪 Test the microservice:**
   Use tools like **Postman**, **Insomnia**, or `curl` to send HTTP requests and test the microservice endpoints. Both Postman and Insomnia are powerful tools that allow you to easily create requests, view responses, and debug APIs.

## 📚 Documentation

- For more details about the endpoints and their usage, refer to the `docs` folder or the Postman/Insomnia collection provided.
- Learn more about NestJS at [nestjs.com](https://nestjs.com).

---

Built with ❤️ using NestJS.

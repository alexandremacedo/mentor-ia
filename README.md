<h3 align="center">
    Mentor IA - A basic agent
</h3>

<h4 align="center">
  NestJS + Docker + Typescript + Ports & Adapters
</h4>
</br>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/AlexandreMacedo/mentor-ia?color=%2304D361">

  <a href="https://github.com/AlexandreMacedo">
    <img alt="Made by Alexandre" src="https://img.shields.io/badge/made%20by-Alexandre-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/AlexandreMacedo/user/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/AlexandreMacedo/mentor-ia?style=social">
  </a>
</p>

<p align="center">
  <a href="#needed">Needed</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technical-decisions">Technical Decisions</a>
</p>

# mentor-ia

This project was built with NestJS and TypeScript to book trips

## Needed

- Git (https://git-scm.com/)
- Node (https://nodejs.org/en/)
- Docker (https://www.docker.com/products/docker-desktop)

## How to use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) or higher installed on your computer. From your command line:

Cloning

```bash
# Clone this repository
$ git clone https://github.com/alexandremacedo/mentor-ia.git

# Go into the repository
$ cd mentor-ia
```

To run in dev mode

```bash
# Install all dependencies
$ npm install
```

To run with containers

```bash
# Create and start the production server
$ docker compose up --build -d

# Server is running at http://localhost:3000
```

To easily test the api requests
```bash
# You will need to download the REST Client extension
# And access the path /api/counsel.http
```

To start the database

```sql
# Creating table
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536)
);

# Index with ivfflat is usefull after insert multiple memories
CREATE INDEX IF NOT EXISTS memories_embedding_idx
ON memories
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

To run the tests

```bash
# Running all tests
$ npm run test

# Running test coverage
$ npm run test:cov
```

## Endpoints

Routes:

| Method | Endpoint                | Controller                | Action           |
| ------ | ----------------------- | ------------------------- | ---------------- |
| POST   | /counsel                | \counsel.controller       | create a counsel |
| GET    | /health                 | \health.controller        | check service    |

## Technical Decisions

This project was designed with **production-grade concerns** in mind, prioritizing maintainability, resilience, and scalability over experimentation or framework-driven design.

---

### Architecture: Ports & Adapters (Hexagonal)

The core domain is fully isolated from external frameworks and providers using **Ports & Adapters (Hexagonal Architecture)**.

All integrations (LLMs, embeddings, persistence) are implemented behind explicit interfaces, enabling:

- Provider replacement without touching business logic  
- Clean unit testing with fakes, stubs, and mocks  
- Long-term evolution without architectural rewrites  

The domain layer contains no framework dependencies and no infrastructure concerns.

---

### LLM Integration: Backoff & Fallback

LLM access is handled through a **resilient adapter** that composes two key strategies:

- **Exponential backoff** for transient failures (timeouts, network instability)
- **Fallback strategy** to switch providers when the primary LLM is unavailable or degraded

This approach ensures:
- Predictable latency
- Controlled retry behavior
- High availability without leaking infrastructure logic into the domain layer

---

### Embeddings & Semantic Memory with pgvector

Semantic memory is implemented using **PostgreSQL + pgvector**, keeping the stack simple and production-proven.

Key decisions:
- Embeddings are generated through a dedicated **Embedding Port**
- Vectors are stored and queried using **cosine similarity**
- Memory retrieval is transparent to the use case layer

This enables contextual reasoning while avoiding the operational complexity of specialized vector databases.

---

### NestJS as Application Shell

NestJS is used strictly as an **application shell**, responsible for:

- Dependency injection
- HTTP layer
- Module composition

Business logic remains **framework-agnostic**, allowing the system to be tested, refactored, and evolved independently of NestJS or any specific runtime framework.

# License

The mentor-ia is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

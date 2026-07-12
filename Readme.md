# SupportIQ

SupportIQ is a full-stack **AI-powered customer support platform** that combines Retrieval-Augmented Generation (RAG), intelligent ticket escalation, and role-based support workflows.

Organizations can upload their knowledge base, allow customers to ask questions through an AI assistant, and manage support tickets when human assistance is needed.

## Features

- **AI Assistant** — Answers customer questions using organization-specific knowledge.
- **RAG Pipeline** — Retrieves relevant document context before generating responses.
- **Knowledge Base** — Upload and process PDF documents for AI-powered retrieval.
- **Smart Ticket Escalation** — Creates support tickets when AI confidence is low.
- **Role-Based Access Control** — Separate dashboards and permissions for Admins, Agents, and Customers.
- **Agent Management** — Create agents, manage skills, and assign support tickets.
- **Customer Support Portals** — Workspace-specific onboarding through `/support/[slug]`.
- **Analytics Dashboard** — Track tickets, agents, documents, and support activity.
- **Secure Authentication** — JWT access and refresh token authentication.

## User Roles

### Admin
Manages the organization, knowledge base, agents, customers, tickets, and analytics.

### Agent
Handles assigned support tickets and customer requests.

### Customer
Uses the AI assistant and tracks support tickets.

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

**Backend**
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

**AI & Infrastructure**
- Gemini API
- Retrieval-Augmented Generation (RAG)
- ChromaDB
- Cloudinary
- JWT Authentication

## How It Works

```text
Organization uploads PDF documents
              ↓
Text is extracted and split into chunks
              ↓
Gemini generates vector embeddings
              ↓
Embeddings are stored in ChromaDB
              ↓
Customer asks a question
              ↓
Relevant context is retrieved
              ↓
Gemini generates a contextual answer
              ↓
Low-confidence queries can be escalated to support tickets
```

## Customer Onboarding

Each organization receives a unique support portal:

```text
/support/[workspace-slug]
```

Customers can create an account for that organization and access their AI assistant and support tickets.

## Project Structure

```text
SupportIQ/
├── client/     # Next.js frontend
└── server/     # Express.js backend
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/soham1006/SupportIQ
cd SupportIQ
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure environment variables

Create `.env` files for the client and server using your database, authentication, AI, storage, and deployment credentials.

### 4. Run the application

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## Author

**Soham Mewada**

Built as a full-stack AI project demonstrating modern web development, RAG-based AI integration, authentication, role-based authorization, and customer support workflows.
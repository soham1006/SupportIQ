# SupportIQ Architecture

## Overview

SupportIQ is a multi-tenant AI-powered customer support platform. It combines a Next.js frontend, an Express.js REST API, PostgreSQL for relational data, and ChromaDB for vector retrieval.

```text
Admin / Agent / Customer
          │
          ▼
   Next.js Frontend
          │
          ▼
    Express REST API
       │        │
       ▼        ▼
 PostgreSQL   ChromaDB
   (Prisma)   (Vectors)
       │
       ▼
 Gemini AI
```

## Core Components

### Frontend

The frontend is built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui.

It provides separate role-based experiences for:

- Admins
- Agents
- Customers

TanStack Query is used for server-state management and API communication.

### Backend

The backend is built with Node.js, Express.js, and TypeScript.

The application follows a modular structure:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

This separates HTTP handling, business logic, and database access.

### Database

PostgreSQL stores application data through Prisma ORM.

Core entities include:

- Organizations
- Users
- Documents
- Tickets
- Refresh Tokens
- Analytics Events

Users belong to an organization and have one of three roles:

```text
ADMIN
AGENT
CUSTOMER
```

Organization IDs are used to isolate data between different workspaces.

## Authentication and Authorization

SupportIQ uses JWT-based authentication with:

- Short-lived access tokens
- Refresh tokens
- Password hashing
- Protected API routes

Role-based access control is enforced on the backend.

Admins can manage organization resources, agents, customers, knowledge documents, and analytics.

Agents can access their support workflow and assigned tickets.

Customers can access the AI assistant and their support tickets.

## Customer Onboarding

Each organization receives a unique workspace slug:

```text
/support/[workspace-slug]
```

The flow is:

```text
Public Support Portal
        ↓
Customer Registration
        ↓
Customer linked to Organization
        ↓
Customer Login
        ↓
AI Assistant and Tickets
```

This allows customers to join the correct organization without being manually created by an administrator.

## RAG Pipeline

SupportIQ uses Retrieval-Augmented Generation to answer questions from organization-specific documents.

```text
PDF Upload
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Gemini Embeddings
    ↓
ChromaDB Vector Storage
    ↓
Customer Question
    ↓
Query Embedding
    ↓
Semantic Retrieval
    ↓
Relevant Context
    ↓
Gemini Response
```

Vector metadata includes organization information so retrieval remains scoped to the correct workspace.

## Ticket Workflow

When a customer requires human assistance, SupportIQ uses the ticket workflow:

```text
Customer Query
      ↓
AI Support
      ↓
Ticket Escalation
      ↓
Agent Assignment
      ↓
Agent Handles Request
      ↓
Ticket Resolution
```

Agents can be matched to support work based on their configured skills and availability.

## Security

SupportIQ applies:

- Password hashing
- JWT authentication
- Refresh token handling
- Server-side role authorization
- Organization-level data isolation
- Request validation with Zod
- Environment variables for secrets
- CORS restrictions for allowed frontend origins

## Deployment

```text
Frontend
   ↓
Vercel

Backend
   ↓
Render

Relational Database
   ↓
PostgreSQL

Vector Database
   ↓
ChromaDB
```

## Future Improvements

- Streaming AI responses
- Background document processing
- Real-time ticket notifications
- Advanced analytics and reporting
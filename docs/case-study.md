# SupportIQ — Case Study

## Problem

Customer support teams often manage repetitive questions, scattered knowledge, and manual ticket routing. Customers may wait for answers that already exist in company documentation, while support agents spend time handling repetitive requests.

## Approach

I built SupportIQ as a multi-tenant AI-powered customer support platform that combines Retrieval-Augmented Generation (RAG) with traditional ticket management.

Organizations can upload PDF documents to create their own knowledge base. The documents are extracted, split into chunks, converted into embeddings using Gemini, and stored in ChromaDB.

When a user asks a question, SupportIQ retrieves relevant document context and uses Gemini to generate a context-aware response. The platform also supports ticket workflows, agent management, role-based access control, analytics, and workspace-specific customer onboarding.

The application uses separate Admin, Agent, and Customer roles with organization-level data isolation.

## Result

SupportIQ provides a complete customer support workflow:

- Organizations can build an AI-searchable knowledge base from PDF documents.
- Customers can receive answers based on organization-specific information.
- Support requests can be managed through a structured ticket workflow.
- Admins can manage agents and monitor support activity.
- Agents can access their support workflow and assigned tickets.
- Each organization receives a unique customer onboarding portal.

The application is deployed as a full-stack production project with a Next.js frontend, Express.js backend, PostgreSQL database, and vector-based document retrieval.

## What I Learned

Building SupportIQ strengthened my understanding of full-stack application architecture, multi-role authentication, authorization, and organization-level data isolation.

I also gained practical experience building a RAG pipeline, generating embeddings, storing and retrieving vectors, integrating Gemini into a production application, and connecting AI functionality with conventional application workflows such as ticket management.

The project also highlighted practical production challenges including CORS configuration, authentication state management, deployment environment variables, vector database integration, and designing role-specific user experiences.
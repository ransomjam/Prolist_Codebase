# ProList Marketplace - System Architecture

## Overview

ProList is a comprehensive marketplace platform built for the Cameroon market, focusing on trust-based commerce. The platform serves multiple user types including buyers, vendors, professionals, and administrators, providing a secure environment for transactions through escrow services, vendor verification, and community engagement.

## System Architecture

### Frontend Architecture

The application is built using React 18 with TypeScript and Vite as the build tool. Key architectural decisions:

- **Single Page Application (SPA)**: Uses Wouter for lightweight client-side routing
- **Component-Based Design**: Modular components with shadcn/ui for consistent UI elements
- **State Management**: React Query (TanStack Query) for server state and React hooks for local state
- **Styling**: Tailwind CSS with custom design tokens matching ProList branding
- **Mobile-First**: Responsive design with bottom navigation for mobile users

### Backend Architecture  

The backend is built with Express.js and TypeScript, providing a REST API:

- **RESTful API**: Standard HTTP methods for CRUD operations
- **Middleware Stack**: JSON parsing, CORS handling, request logging
- **Authentication**: Session-based authentication (preparation for JWT)
- **WebSocket Support**: Real-time features for chat and notifications
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Data Layer

The application uses Drizzle ORM with PostgreSQL as the primary database:

- **Database**: PostgreSQL with Neon serverless configuration
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod schemas for runtime type checking
- **Migrations**: Automated database migrations through Drizzle Kit
- **Connection Pooling**: Optimized for serverless environments

## Key Components

### User Management System
- Multi-role user system (buyer, vendor, professional, admin)
- Vendor verification workflow with document upload
- Trust scoring and rating system
- Profile management with image uploads

### Marketplace Features
- Product listings with category filtering
- Real-time auction system with bidding
- Professional services marketplace
- Real estate listings
- Market directory for local vendors

### Communication System
- In-app messaging between users
- Comments system for listings
- WhatsApp integration for external communication
- Notification system for important updates

### Transaction Management
- Escrow payment system for buyer protection
- Order management workflow
- Vendor sales tracking
- Admin panel for transaction oversight

## Data Flow

1. **User Registration**: User creates account → Verification process → Account activation
2. **Product Listing**: Verified vendor → Creates listing → Admin review → Public visibility
3. **Purchase Flow**: Buyer selection → Escrow payment → Vendor fulfillment → Buyer confirmation → Fund release
4. **Communication**: User initiation → Real-time messaging → Notification delivery

## External Dependencies

### Core Framework Dependencies
- React 18 with TypeScript for frontend development
- Express.js for backend API server
- PostgreSQL via Neon for data persistence
- Drizzle ORM for database operations

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI components for accessible primitives
- shadcn/ui for pre-built component library
- Heroicons and Lucide React for iconography

### Communication and Media
- SendGrid for transactional emails
- WebSocket support for real-time features
- File upload capabilities for images and documents

### Development Tools
- Vite for fast development and building
- TypeScript for type safety
- Zod for schema validation
- React Query for server state management

## Deployment Strategy

### Development Environment
- Replit-based development with hot module replacement
- Memory storage fallback for development testing
- Environment variable configuration for database connections

### Production Considerations
- Serverless-optimized database connections
- CDN integration for static assets
- Environment-based configuration management
- Automated database migrations

The architecture prioritizes scalability, user experience, and trust through verification systems while maintaining the flexibility to adapt to local market needs in Cameroon.

## Changelog
```
Changelog:
- June 30, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```
# replit.md

## Overview

This is a full-stack budget tracking application called "DNA Budget" built with modern web technologies. The application allows users to manage their personal finances by creating categories, tracking expenses, and monitoring budget progress through an intuitive dashboard interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: SWR for server state management
- **Build Tool**: Vite for development and production builds
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple
- **API Design**: RESTful API endpoints with JSON responses
- **Security**: bcryptjs for password hashing, express-session for session management

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon HTTP driver for database connectivity
- **Validation**: Zod schemas for runtime type checking and validation

## Key Components

### Database Schema
- **Users Table**: Stores user authentication and profile information
- **Categories Table**: Budget categories with names, budgets, colors, and user associations
- **Expenses Table**: Individual expense records with amounts, descriptions, dates, and recurring options

### Authentication System
- Session-based authentication using Passport.js
- Password hashing with bcryptjs
- Protected routes with middleware authentication checks
- User registration and login flows

### Frontend Features
- **Dashboard**: Monthly budget overview with visual progress indicators
- **Categories Management**: CRUD operations for budget categories
- **Expense Tracking**: Add, edit, and delete expenses with category associations
- **Drag & Drop**: Sortable budget cards using @dnd-kit
- **Command Menu**: Keyboard shortcuts for navigation (Ctrl/Cmd + K)
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### UI/UX Features
- Professional theme with customizable colors
- Interactive charts and progress bars
- Hover cards and tooltips for enhanced user experience
- Loading states and skeleton screens
- Toast notifications for user feedback

## Data Flow

1. **Authentication Flow**: Users register/login → session created → protected routes accessible
2. **Category Management**: Users create categories → stored in database → displayed on dashboard
3. **Expense Tracking**: Users add expenses → linked to categories → budget calculations updated
4. **Dashboard Updates**: Real-time budget progress calculations based on current month expenses
5. **State Synchronization**: SWR manages client-server state with automatic revalidation

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Data Fetching**: SWR for server state management
- **Form Handling**: React Hook Form, @hookform/resolvers
- **Validation**: Zod for schema validation
- **Drag & Drop**: @dnd-kit packages
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Server**: Express.js
- **Authentication**: Passport.js, passport-local
- **Security**: bcryptjs for password hashing
- **Session**: express-session, connect-pg-simple
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite, esbuild
- **TypeScript**: Full TypeScript support with strict configuration
- **Development**: Hot module replacement and file watching

## Deployment Strategy

### Production Build Process
1. Frontend assets built using Vite to `dist/public`
2. Backend TypeScript compiled using esbuild to `dist/index.js`
3. Database migrations applied using Drizzle Kit
4. Environment variables required: `DATABASE_URL`, `SESSION_SECRET`

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with file watching
- **Production**: Compiled JavaScript execution with NODE_ENV=production
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Sessions**: Secure session configuration with production-appropriate settings

### Database Management
- Schema definitions in `db/schema.ts`
- Migrations stored in `./migrations` directory
- Development commands: `db:push` for schema sync, `db:migrate` for running migrations

## Changelog
```
Changelog:
- June 29, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```
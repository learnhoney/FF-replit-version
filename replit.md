# FinanceFetish - Financial Education Platform

## Overview

FinanceFetish is a modern financial education platform that combines music streaming aesthetics with educational content. The application features a Spotify-inspired interface for browsing financial courses, video playlists, and educational content. It's built as a full-stack web application with a React frontend and Express backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme (Spotify-inspired)
- **UI Components**: Radix UI with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot reloading with Vite middleware integration

## Key Components

### Database Schema
The application uses five main entities:
- **Users**: Authentication and user management
- **Courses**: Premium and free financial courses with pricing, ratings, and metadata
- **Playlists**: Organized collections of educational content with icons and gradients
- **Videos**: YouTube-integrated video content linked to playlists
- **Newsletters**: Email subscription management

### UI Components
- **Course Cards**: Display course information with premium badges, ratings, and pricing
- **Sidebar**: Navigation with playlist browsing (Spotify-style)
- **Player Bar**: Mock audio player interface for educational content
- **Newsletter Signup**: Email subscription with gradient design
- **Responsive Design**: Mobile-first approach with breakpoint management

### API Endpoints
- `GET /api/courses` - Retrieve all courses
- `GET /api/courses/:id` - Get individual course details
- `GET /api/playlists` - Fetch all playlists
- `GET /api/playlists/:id/videos` - Get videos for a specific playlist
- `POST /api/newsletter` - Newsletter subscription endpoint

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle requests and validate data
3. **Database Layer**: Drizzle ORM manages PostgreSQL interactions
4. **Response**: JSON data flows back through the API to update UI components
5. **State Management**: TanStack Query handles caching, loading states, and error handling

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icons
- **Payments**: Stripe integration (configured but not active)

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast backend bundling for production
- **Vite**: Development server with hot module replacement
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with Express middleware
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **File Watching**: Automatic server restarts with tsx
- **Error Handling**: Runtime error overlays for debugging

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database**: Drizzle migrations for schema management

### Build Commands
- `npm run dev` - Development mode with hot reloading
- `npm run build` - Production build for both frontend and backend
- `npm run start` - Production server startup
- `npm run db:push` - Push database schema changes

## Changelog

Changelog:
- July 03, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
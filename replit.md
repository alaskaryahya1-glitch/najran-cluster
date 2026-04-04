# Najran Health Cluster Portal

## Overview

A bilingual (Arabic/English) web portal for Najran Health Cluster (تجمع نجران الصحي), a healthcare organization in Saudi Arabia. The application serves as an informational website showcasing the organization's structure, services, hospitals, and employee resources. Built with a React frontend and Express backend, featuring RTL (right-to-left) layout support for Arabic content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and interactions
- **Fonts**: Cairo (Arabic headlines) and Inter (English body text)
- **Direction**: RTL-first design with `dir="rtl"` on the HTML document
- **Internationalization**: Custom i18n system with Arabic/English support

### Internationalization (i18n) System
- **Implementation**: Custom React Context-based solution in `client/src/lib/i18n.tsx`
- **Language Toggle**: Globe icon button in the Header component
- **Supported Languages**: Arabic (ar) - default, English (en)
- **Persistence**: Language preference stored in localStorage
- **Direction Switching**: Automatic RTL/LTR direction based on selected language
- **Font Switching**: Conditional `font-arabic` or `font-sans` classes based on language
- **Usage**: Import `useI18n` hook to get `t()` function and current `language`
- **Translation Keys**: Organized by section (home, nav, footer, employeeServices, etc.)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **Development**: Hot module replacement via Vite middleware

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` with Zod validation via drizzle-zod
- **Migrations**: Managed via `drizzle-kit push`

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route contracts
└── attached_assets/  # Static assets and images
```

### API Design
- RESTful endpoints defined in `shared/routes.ts`
- Currently implements a read-only services API (`GET /api/services`)
- Services are seeded on startup with healthcare-related links and resources
- Response validation using Zod schemas

### UI Component Pattern
- shadcn/ui components in `client/src/components/ui/`
- Custom components use the `cn()` utility for class merging
- CSS variables for theming with healthcare-appropriate color palette (teal/cyan tones)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **pg**: Node.js PostgreSQL client
- **connect-pg-simple**: Session storage for Express (available but not currently active)

### UI Libraries
- **@radix-ui/***: Primitive UI components (dialogs, dropdowns, tooltips, etc.)
- **react-icons**: Social media icons (X, LinkedIn, YouTube, etc.)
- **lucide-react**: General-purpose icons
- **embla-carousel-react**: Carousel/slider functionality
- **recharts**: Chart components (available via shadcn/ui)

### Form & Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation

### Build & Development
- **Vite**: Frontend build tool with React plugin
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **tsx**: TypeScript execution for development

### Approved Logo Format
The official logo format uses `logo2_1767055332336.png` (the original logo without baked-in text) with a separate text element underneath showing "شركة الصحة القابضة" (Arabic) / "Health Holding Co" (English). The text is positioned with these exact styles:
- Font: `text-blue-200/80 text-[10px] sm:text-xs`, uses `font-arabic` or `font-sans` based on language
- Position: `absolute -bottom-0.5 left-[4.5rem]`
- The text changes language dynamically based on the selected language
- This format must be used everywhere the logo appears (footer, etc.)

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Development/production mode
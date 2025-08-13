# Gryphon Gaming Website

A modern, full-stack web application for the Gryphon Gaming community, built with React Router and Supabase.

## About

Gryphon Gaming is a community for every player, offering exciting gaming events and tournaments. This website serves as the central hub for community members to discover upcoming events, learn about the organization, and manage event details (for administrators).

## Features

- 🎮 **Event Management** - View upcoming gaming events and tournaments
- 👥 **Community Hub** - Learn about Gryphon Gaming and its mission
- 🔐 **Authentication** - Secure login system with role-based access
- 👨‍💼 **Admin Panel** - Create, edit, and delete events (admin/exec only)
- 📱 **Responsive Design** - Optimized for all devices
- 🌙 **Dark Mode** - Built-in dark/light theme support

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router 7
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Build Tool**: Vite
- **Deployment**: Docker-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd gg-website
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:
```bash
pnpm dev
# or
npm run dev
```

Your application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

Create a production build:
```bash
pnpm build
# or
npm run build
```

### Type Checking

Run TypeScript type checking:
```bash
pnpm typecheck
# or
npm run typecheck
```

## Project Structure

```
gg-website/
├── app/
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and configurations
│   ├── routes/              # Page routes and loaders
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets and images
├── app.css                  # Global styles
└── root.tsx                 # Root component
```

## Key Components

- **HomePage** - Landing page with upcoming events display
- **EventCard** - Individual event display component
- **ManageEventsPage** - Admin interface for event management
- **NavBar** - Navigation with role-based access control
- **Layout** - Main application wrapper

## Database Schema

The application uses a Supabase PostgreSQL database with the following main table:

### Events Table
- `id` - Unique event identifier
- `title` - Event name
- `description` - Event details
- `date` - Event date and time
- `location` - Event location (optional)
- `created_by` - User who created the event
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Authentication & Authorization

- **Public Access**: View events and about page
- **User Access**: Login/logout functionality
- **Admin/Exec Access**: Full event management capabilities

## Deployment

### Docker Deployment

Build and run using Docker:
```bash
docker build -t gryphon-gaming-website .
docker run -p 3000:3000 gryphon-gaming-website
```

### Manual Deployment

1. Build the application: `pnpm build`
2. Deploy the `build/` directory to your hosting platform
3. Ensure environment variables are configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

This project is proprietary to Gryphon Gaming.

---

Built with ❤️ for the Gryphon Gaming community.

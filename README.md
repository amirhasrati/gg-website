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
- **Deployment**: Vercel

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

This project is deployed on Vercel for optimal performance and ease of management.

### Vercel Deployment

The application automatically deploys from the main branch and includes:
- **Automatic builds** on every push
- **Preview deployments** for pull requests
- **Global CDN** for fast loading worldwide
- **Environment variable management** for Supabase credentials

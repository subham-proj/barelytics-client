# Barelytics Client

A React-based analytics dashboard application with project management capabilities.

## Features

### Authentication Flow
- **Login/Signup**: Users can create accounts or sign in with email and password
- **Session Management**: Automatic session persistence with localStorage
- **Protected Routes**: Authentication-based routing with automatic redirects

### Project Management
- **Project Check**: After login, the app checks for existing projects via `GET /api/projects`
- **Project Creation**: If no projects exist, users are redirected to create their first project
- **Project-Specific URLs**: Each project has its own dashboard at `localhost:5173/{projectId}`
- **Project Switching**: Users can switch between projects using the project selector dropdown

### Dashboard Features
- **Responsive Design**: Modern UI built with shadcn/ui and Tailwind CSS
- **Navigation Menu**: Dashboard, Analytics, Reports, Users, Notifications, Settings
- **Project Context**: All dashboard sections show project-specific information
- **User Management**: User info display with logout functionality

## Project Flow

1. **Login/Signup**: User authenticates via login or signup forms
2. **Project Check**: App automatically fetches user's projects via `GET /api/projects`
3. **Routing Logic**:
   - If projects exist: Redirect to first project dashboard (`/{projectId}`)
   - If no projects: Redirect to create project form (`/create-project`)
4. **Project Creation**: User creates their first project
5. **Dashboard Access**: User is redirected to project-specific dashboard
6. **Project Switching**: Users can switch between projects using the dropdown

## API Endpoints

The app expects the following API endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration  
- `GET /api/projects` - Fetch user's projects
- `POST /api/projects` - Create new project

## Tech Stack

- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for routing
- **shadcn/ui** for UI components
- **Tailwind CSS** for styling
- **Axios** for API calls

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BASE_URL=http://localhost:3000
```

## Project Structure

```
src/
├── components/ui/          # shadcn/ui components
├── lib/                   # Constants and utilities
├── pages/
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── projects/         # Project management
├── store/                # Redux store configuration
└── App.jsx              # Main app component
```

## State Management

- **Auth Slice**: Handles user authentication and session management
- **Project Slice**: Manages project data and API calls
- **Persistent Storage**: Session data stored in localStorage

## Routing

- `/login` - Login form
- `/signup` - Signup form  
- `/create-project` - Create new project form
- `/{projectId}` - Project-specific dashboard
- `/dashboard` - Fallback dashboard route

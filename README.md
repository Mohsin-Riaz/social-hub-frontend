# Social Media App

A full-stack social media web application that allows users to create, like, and comment on posts. Built with React frontend, Redux state management, RESTful APIs, and MongoDB database with secure OAuth2 authentication.

## 🚀 Features

- **User Authentication**: OAuth2 integration with Google accounts
- **Post Management**: Create, view, like, and delete posts
- **Comment System**: Add and manage comments on posts
- **Image Upload**: File upload functionality with AWS S3 integration
- **User Profiles**: Personalized user profiles with avatar support
- **Friends System**: Connect and manage friendships
- **Real-time Chat**: Messaging functionality between users
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0**: Modern UI library for building user interfaces
- **Redux Toolkit**: State management with React-Redux
- **React Router DOM v6**: Client-side routing
- **Axios**: HTTP client for API calls
- **SCSS**: Modular styling with component-based architecture

### Backend
- **RESTful APIs**: Separate backends for core functionality and image handling
- **MongoDB**: NoSQL database for storing user data, posts, and comments
- **AWS S3**: Cloud storage for image uploads and media files
- **OAuth2**: Secure authentication with Google accounts

### Development & Deployment
- **Vite**: Fast build tool and development server
- **GitHub Pages**: Automated deployment with CI/CD
- **ESLint**: Code linting and quality assurance

## 📁 Project Structure

```
src/
├── api/                    # API service layer
│   ├── auth_calls.js      # Authentication endpoints
│   ├── avatar_calls.js    # Avatar/profile image handling
│   ├── people_calls.js    # User and friends management
│   └── post_calls.js      # Posts and comments endpoints
├── components/            # Reusable UI components
│   ├── Button.jsx
│   ├── CommentBox.jsx
│   ├── Post.jsx
│   ├── Modal.jsx
│   └── ...
├── features/              # Redux slices
│   ├── post/postSlice.js  # Post state management
│   └── user/userSlice.js  # User state management
├── pages/                 # Route components
│   ├── Home.jsx
│   ├── Profile.jsx
│   ├── Friends.jsx
│   ├── Layout/            # Layout components
│   └── ...
├── scss/                  # Styling files
│   ├── _config.scss       # Global variables
│   ├── main.scss          # Main stylesheet
│   └── component styles
└── store.js               # Redux store configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd social-media-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and add your configuration:

```env

VITE_NODE_ENV=DEV
VITE_CLIENT_URL=http://localhost:3000/
VITE_BACKEND_SERVER_URL=http://localhost:5000/

VITE_AWS_LAMBDA_BACKEND=XXXXXXXXX.execute-api.us-east-1.amazonaws.com/

VITE_IMAGE_SERVER_URL=<XXXXXX.execute-api.us-east-1.amazonaws.com/images/>
VITE_AWS_URL=<XXXXXX.s3.amazonaws.com/>

VITE_DATABASE_URI=<mongodb+srv://...>

VITE_OAUTH_ID=<XXXXX.apps.googleusercontent.com>
VITE_OAUTH_SECRET=<VITE_OAUTH_SECRET>

AWS_ACCESS_KEY=<AWS_ACCESS_KEY>
AWS_SECRET_KEY=<AWS_SECRET_KEY>
```

### API Integration

The application uses a microservices architecture with separate RESTful backends:

- **Core API**: Handles user authentication, posts, comments, and friends CRUD operations
- **Image Service**: Dedicated backend for image upload and management with AWS S3 integration
- **Database**: MongoDB stores user profiles, posts, comments, and relationship data
- **Authentication**: OAuth2 implementation for secure Google account integration

## 🎨 Styling

The project uses SCSS with a modular approach:

- Global configuration in `_config.scss`
- Component-specific styles in individual SCSS files
- Responsive design patterns
- CSS custom properties for theming

## 🔐 Authentication

- **OAuth2**: Secure authentication flow with Google accounts
- **Session Management**: Cookie-based session handling with js-cookie
- **Protected Routes**: Authentication-required pages and functionality
- **Automatic Logout**: Session expiration and security handling

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

The project includes automated deployment to GitHub Pages:

1. Push changes to the main branch
2. GitHub Actions automatically builds and deploys
3. Live site available at your GitHub Pages URL

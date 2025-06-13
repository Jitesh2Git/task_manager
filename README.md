# TaskUp Manager - MERN Stack Task Management Application

A full-stack task management application built with the MERN stack, featuring user authentication, task CRUD operations, and modern UI components.

## 🌐 Live Demo

**Frontend:** [https://taskup-manager.netlify.app](https://taskup-manager.netlify.app)  
**Backend API:** Deployed on Render

## 📹 Demo Video

<video width="800" controls>
  <source src="./demo/taskup-demo.mov" type="video/quicktime">
  Your browser does not support the video tag.
</video>

## 🚀 Features

- **User Authentication**: Secure login/signup with cookie-based JWT tokens
- **Task Management**: Complete CRUD operations for tasks
- **Status Toggle**: Easy task status management (pending/completed)
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Instant UI updates with Redux state management
- **Secure API**: Protected routes with JWT middleware
- **Modern UI**: Clean and intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React** - UI Library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Motion** - Animation library
- **Tabler Icons** - Icon library
- **Sonner** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware

### Development Tools

- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **dotenv** - Environment variables

## 📁 Project Structure

```
task-manager/
├── client/                # Frontend React application
│   ├── public/            # Static assets (favicon, logos, manifest)
│   ├── src/
│   │   ├── assets/        # Images and illustrations (login/signup, hero backgrounds)
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store configuration
│   │   ├── lib/           # Utility / Validation / Env config
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── .env.development.local  # Development environment variables
│   ├── .env.production.local   # Production environment variables
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── vite.config.js     # Vite configuration
├── server/                # Backend Express application
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── database/         # Database configuration
│   ├── .env.development.local  # Development environment variables
│   ├── .env.production.local   # Production environment variables
│   ├── .env.example      # Environment variables template
│   ├── app.js            # Entry point
│   └── package.json
├── demo/                 # Demo materials
│   └── taskup-demo.mov   # Application demo video
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Jitesh2Git/task_manager.git
cd task-manager
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create environment configuration in the server directory using one of these options:

**Option 1:** Create `.env` file
**Option 2:** Use `.env.development.local` for development environment  
**Option 3:** Use `.env.production.local` for production environment  
**Option 4:** Copy `.env.example` to `.env` and fill in your values

```env
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/taskmanager
# OR for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=1d
FRONTEND_URL=http://localhost:3000
```

Start the development server (using nodemon - use npm start if you dont want to use nodemon):

```bash
npm run dev
```

The server will run on `http://localhost:8000`

### 3. Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create environment configuration in the client directory using one of these options:

**Option 1:** Create `.env` file
**Option 2:** Use `.env.development.local` for development environment  
**Option 3:** Use `.env.production.local` for production environment  
**Option 4:** Copy `.env.example` to `.env` and fill in your values

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Schema

### User Model

```javascript
{
 _id: ObjectId,
 name: String (required, 2-50 characters),
 email: String (required, unique, validated),
 password: String (required, hashed, min 6 chars with complexity rules),
 createdAt: Date,
 updatedAt: Date
}
```

### Task Model

```javascript
{
  _id: ObjectId,
  title: String (required, 5-100 characters),
  description: String (required, 5-500 characters),
  status: String (enum: ['pending', 'completed'], default: 'pending'),
  user: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 API Endpoints

### Authentication Routes

```
GET  /api/v1/auth/verify     # Verify JWT token
POST /api/v1/auth/sign-up    # User registration
POST /api/v1/auth/sign-in    # User login
POST /api/v1/auth/sign-out   # User logout
```

### User Routes (Protected)

```
GET    /api/v1/users/:id     # Get user profile
PUT    /api/v1/users/:id     # Update user profile
DELETE /api/v1/users/:id     # Delete user account
```

### Task Routes (Protected)

```
GET    /api/v1/tasks         # Get all user tasks
POST   /api/v1/tasks         # Create new task
PUT    /api/v1/tasks/:id     # Update task
DELETE /api/v1/tasks/:id     # Delete task
PATCH  /api/v1/tasks/:id/toggle  # Toggle task status
```

**Note:** All User and Task routes require JWT authentication via the `authorize` middleware.

## 🎨 UI Components

- **Authentication Forms**: Login and signup forms with validation
- **Task Cards**: Task display cards with its info
- **Navigation**: Responsive navigation with header
- **Modals**: Task creation and editing modals
- **Toast Notifications**: Success/error feedback
- **Loading States**: Skeleton loaders and spinners

## 🔒 Security Features

- **JWT Authentication**: Secure cookie-based token authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Frontend and backend route protection
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side request validation
- **Error Handling**: Comprehensive error handling and logging

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚀 Deployment

### Frontend (Netlify)

1. Connect your GitHub repository
   • mport your frontend repo (e.g., Vite + React) into Netlify.
2. Go through the build steps
   • Build command: npm run build
   • Publish directory: dist
3. Set environment variables
   • Add any required variables (e.g., VITE_API_BASE_URL) under:
   • Site settings → Environment variables
4. Deploy with automatic builds on push
   • Netlify will redeploy the site whenever you push changes to your GitHub branch.

### Backend (Render)

1. Connect your GitHub repository to Render
   • Import your backend repo (e.g., Node.js/Express) into Render.
2. Go through the build steps
   • Build command: npm install
   • Start command: npm start
   • Make sure your package.json has a valid "start" script.
3. Set environment variables
   • Add all necessary backend environment variables like:
   PORT, MONGO_URI, JWT_SECRET, etc.
4. Deploy with automatic builds on push
   • Render will automatically redeploy your backend whenever you push updates.

## 📋 Available Scripts

### Frontend (client/)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend (server/)

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

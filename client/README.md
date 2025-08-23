# LeadManager - Frontend

A professional lead management portal built with React, featuring AG Grid for data display, comprehensive filtering, and a modern UI.

## Features

### 🎯 Core Functionality
- **User Authentication**: Secure login/register system with JWT
- **Lead Management**: Create, read, update, and delete leads
- **Advanced Grid**: AG Grid with server-side pagination and filtering
- **Responsive Design**: Mobile-friendly interface

### 📊 Dashboard
- Real-time lead statistics
- Quick action cards
- Visual status indicators
- Getting started guide

### 🔍 Lead Management
- **Comprehensive Forms**: All lead fields with validation
- **Advanced Filtering**: Filter by status, source, city, state
- **Status Tracking**: Visual status badges
- **Bulk Operations**: Edit and delete functionality

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface
- **Loading States**: Smooth user experience
- **Toast Notifications**: User feedback
- **Responsive Layout**: Works on all devices
- **Status Badges**: Color-coded lead statuses

## Technology Stack

- **React 19** - Modern React with hooks
- **AG Grid** - Professional data grid
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see server README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=LeadManager
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── api/
│   └── axios.js          # API configuration
├── components/
│   ├── Home.jsx          # Dashboard component
│   ├── Layout.jsx        # Main layout wrapper
│   ├── Navbar.jsx        # Navigation component
│   └── ProtectedRoute.jsx # Route protection
├── context/
│   └── AuthContext.jsx   # Authentication context
├── pages/
│   ├── LeadForm.jsx      # Create/Edit lead form
│   ├── LeadsList.jsx     # Leads grid with filters
│   ├── Login.jsx         # Login page
│   ├── NotFound.jsx      # 404 page
│   └── Register.jsx      # Registration page
├── App.jsx               # Main app component
├── index.css             # Global styles
└── main.jsx             # App entry point
```

## Key Components

### LeadsList
- AG Grid integration with server-side pagination
- Advanced filtering system
- Action buttons for edit/delete
- Status badges and data formatting

### LeadForm
- Comprehensive form with all lead fields
- Form validation
- Loading states
- Responsive design

### Dashboard (Home)
- Real-time statistics
- Quick action cards
- Visual indicators
- User guidance

## API Integration

The frontend communicates with the backend through RESTful APIs:

- `GET /api/leads` - Fetch leads with pagination and filters
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `GET /api/leads/:id` - Get single lead
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Styling

The application uses Tailwind CSS with custom components:

- **Cards**: `.card`, `.card-header`, `.card-body`
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-danger`
- **Forms**: `.form-input`, `.form-select`
- **Status Badges**: `.status-badge`, `.status-new`, `.status-contacted`, etc.

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes
- User context management
- Automatic token handling

### Lead Management
- **Fields**: First name, last name, email, phone, company, city, state, source, status, score, lead value, qualification status
- **Validation**: Required field validation, email format validation
- **Status Tracking**: New, Contacted, Qualified, Lost, Won
- **Source Tracking**: Website, Facebook Ads, Google Ads, Referral, Events, Other

### Grid Features
- **Sorting**: All columns sortable
- **Filtering**: Built-in AG Grid filters + custom filters
- **Pagination**: Server-side pagination
- **Responsive**: Adapts to screen size
- **Actions**: Edit and delete buttons per row

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration included
- Consistent formatting
- Component-based architecture
- Custom hooks for reusable logic

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure environment variables** for production

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include loading states
4. Test on different screen sizes
5. Update documentation as needed

## License

This project is part of the LeadManager assignment.

# API Drift Detector

A modern web application for monitoring and detecting API schema changes and inconsistencies. Track API endpoints, visualize schema differences, and stay informed about API evolution in real-time.

## 🎯 Features

- **Endpoint Management**: Add, monitor, and manage API endpoints with ease
- **Schema Tracking**: Automatically track API schema versions and changes
- **Drift Detection**: Identify breaking changes and inconsistencies in API schemas
- **Visual Diff Viewer**: Compare schemas side-by-side with an intuitive diff viewer
- **Change Logs**: Maintain detailed change logs for all API modifications
- **Authentication**: Secure user authentication and authorization
- **Dashboard**: Comprehensive dashboard for monitoring all endpoints at a glance
- **Responsive Design**: Mobile-friendly interface built with modern web standards

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Component Library**: Radix UI
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd api-drift-detector
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory (if needed):
```bash
VITE_API_URL=<your-api-url>
```

### 4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Available Scripts

### Development
```bash
npm run dev
```
Runs the development server with hot module replacement.

### Build
```bash
npm run build
```
Builds the application for production. Runs TypeScript type checking and optimizes the bundle.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality and style consistency.

### Preview
```bash
npm run preview
```
Preview the production build locally.

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── common/         # Common components (Navbar, Badge, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # Base UI components (Button, Card, Input, etc.)
├── context/            # React Context for global state
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
│   ├── AddEndpointPage.tsx
│   ├── DashboardPage.tsx
│   ├── EndpointDetailPage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── SignupPage.tsx
├── utils/              # Utility functions and types
├── App.tsx             # Root App component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔐 Authentication

The application includes built-in authentication with:
- User registration and login
- Protected routes for authenticated users
- Session management via AuthContext

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible, unstyled component primitives
- Custom UI components in `src/components/ui/`

## 📊 Data Visualization

The dashboard uses **Recharts** for visualizing API statistics and trends.

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Issue Reporting

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📞 Support

For questions or support, please open an issue on the repository.

---

**Happy API Monitoring! 🚀**

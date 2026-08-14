import { Routes, Route } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import EndpointDetailPage from '@/pages/EndpointDetailPage';
import AddEndpointPage from '@/pages/AddEndpointPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/common/Navbar';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <div className="min-h-screen text-zinc-100 flex flex-col spider-app-shell">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/endpoints/new"
            element={
              <ProtectedRoute>
                <AddEndpointPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/endpoints/:id"
            element={
              <ProtectedRoute>
                <EndpointDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className="text-center text-xl text-red-400 font-bold">404 - Not Found</div>} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;

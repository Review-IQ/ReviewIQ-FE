import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0ProviderWithHistory } from './auth/Auth0ProviderWithHistory';
import { MockAuth0Provider } from './auth/MockAuth0Provider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { RegisterComplete } from './components/RegisterComplete';
import { AcceptInvitation } from './pages/AcceptInvitation';
import { Dashboard } from './pages/Dashboard';
import { Reviews } from './pages/Reviews';
import { Integrations } from './pages/Integrations';
import { Analytics } from './pages/Analytics';
import { POSAutomation } from './pages/POSAutomation';
import { Competitors } from './pages/Competitors';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { AIInsights } from './pages/AIInsights';

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

function App() {
  // Use MockAuth0Provider in demo mode, real Auth0Provider in production
  const AuthProvider = IS_DEMO_MODE ? MockAuth0Provider : Auth0ProviderWithHistory;

  return (
    <BrowserRouter basename="/ReviewIQ-FE">
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/accept-invitation" element={<AcceptInvitation />} />
            <Route
              path="/register-complete"
              element={
                <ProtectedRoute>
                  <RegisterComplete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Dashboard />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Reviews />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/integrations"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Integrations />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Analytics />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pos-automation"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <POSAutomation />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/competitors"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Competitors />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-insights"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <AIInsights />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Settings />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <>
                    <Navigation />
                    <div className="pt-16 lg:pl-64">
                      <Notifications />
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

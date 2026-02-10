import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Aboutus from './pages/Aboutus.jsx';
import Count from './pages/Count.jsx';
import Profile from './pages/Profile.jsx';
import StngComponent from './pages/StngComponent.jsx';
import Password from './pages/Password.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Premium from './pages/Premium.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './App.css';
import PrivacyPolicyComponent from './pages/PrivacyPolicyComponent.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <Aboutus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/count"
            element={
              <ProtectedRoute>
                <Count />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stng"
            element={
              <ProtectedRoute>
                <StngComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoute>
                <Password />
              </ProtectedRoute>
            }
          />
            <Route
            path="/privacy"
            element={
              <ProtectedRoute>
               <PrivacyPolicyComponent/>
              </ProtectedRoute>
            }
          />

          {/* Catch-all Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

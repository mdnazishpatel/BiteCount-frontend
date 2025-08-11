import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Login from './Login.jsx';
import Register from './Register.jsx';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Centralized toast notification handler
  const handleSuccess = (message, type) => {
    const toastOptions = {
      style: {
        background: '#1e293b',
        color: '#fff',
        border: '1px solid #dc2626',
      },
    };

    if (type === 'success') {
      toast.success(message, toastOptions);
    } else {
      toast.error(message, toastOptions);
    }
  };

  // Handlers to switch forms
  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      {isLogin ? (
        <Login onSuccess={handleSuccess} switchToRegister={switchToRegister} />
      ) : (
        <Register onSuccess={handleSuccess} switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;

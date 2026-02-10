import React, { useState } from 'react';
import {
  Lock,
  Palette,
  Crown,
  Globe,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  User,
  Bell,
  Shield,
  HelpCircle,
  Star,
  Settings,
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const StngComponent = () => {
  const [currentTheme, ] = useState('dark');
  const [currentLanguage, ] = useState('en');
  const [isPremium, ] = useState(false);
  const navigate = useNavigate();

  const settingsCategories = [
    {
      title: 'Account',
      icon: User,
      items: [
        {
          title: 'Change Password',
          description: 'Update your account password',
          icon: Lock,
          action: 'navigate',
          path: '/password',
        },
        {
          title: 'Profile Dashboard',
          description: 'Customize your data view preferences (daily, weekly, monthly)',
          icon: User,
          action: 'navigate',
          path: '/profile',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          title: 'Theme',
          description: 'Choose your preferred theme',
          icon: currentTheme === 'dark' ? Moon : currentTheme === 'light' ? Sun : Monitor,
          action: 'theme',
          current: currentTheme,
        },
      ],
    },
    {
      title: 'Premium',
      icon: Crown,
      items: [
        {
          title: 'Upgrade to Premium',
          description: isPremium ? 'Manage your premium subscription' : 'Unlock advanced features',
          icon: Crown,
          action: 'navigate',
          path: '/premium',
          premium: true,
          currentStatus: isPremium,
        },
      ],
    },
    {
      title: 'Preferences',
      icon: Globe,
      items: [
        {
          title: 'Language',
          description: 'Select your preferred language',
          icon: Globe,
          action: 'language',
          current: currentLanguage,
        },
        {
          title: 'Notification Preferences',
          description: 'Meal reminders, goal alerts, and weekly progress reports',
          icon: Bell,
          action: 'notification',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          title: 'Privacy Policy & Data Usage',
          description: 'View our privacy policy and manage your data preferences',
          icon: Shield,
          action: 'navigate',
          path: '/privacy',
        },
      ],
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        {
          title: 'Contact Support',
          description: 'Email us at bitecount@gmail.com for assistance',
          icon: HelpCircle,
          action: 'email',
          email: 'bitecount@gmail.com',
        },
      ],
    },
  ];

  function handlenoti() {
    toast.success("Notifications will be available soon", { autoClose: 2000 });
  }

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  const handleSettingClick = (item) => {
    console.log(`Setting clicked: ${item.title}, Action: ${item.action}`); // Debug log
    switch (item.action) {
      case 'navigate':
        if (item.path) {
          console.log(`Navigating to: ${item.path}`);
          navigate(item.path);
        } else {
          console.warn('No path provided for navigation');
        }
        break;
      case 'theme':
        toast.info('Theme functionality currently not available', { autoClose: 2000 });
        break;
      case 'language':
        toast.info('Language functionality currently not available', { autoClose: 2000 });
        break;
      case 'notification':
        toast.info('Notifications will be available soon', { autoClose: 2000 });
        break;
      case 'email':
        window.location.href = `mailto:${item.email}?subject=Nutrition Tracker Support Request&body=Hi Support Team,%0A%0AI need help with:%0A%0A[Please describe your issue here]%0A%0AApp Version: 2.1.0%0ADevice: [Your device info]%0A%0AThank you!`;
        break;
      default:
        console.warn(`Unknown action: ${item.action}`);
        break;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-gray-400">Customize your app experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {settingsCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                {/* Category Header */}
                <div className="px-6 py-4 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-5 w-5 text-red-400" />
                    <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                  </div>
                </div>

                {/* Category Items */}
                <div className="divide-y divide-slate-700">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      onClick={() => handleSettingClick(item)}
                      className="group px-6 py-4 hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              item.premium && !item.currentStatus
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                : 'bg-slate-700 group-hover:bg-slate-600'
                            } transition-colors duration-200`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${item.premium && !item.currentStatus ? 'text-white' : 'text-red-400'}`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-white font-medium">{item.title}</h3>
                              {item.premium && !item.currentStatus && (
                                <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                                  <Star className="h-3 w-3 text-white" />
                                </div>
                              )}
                              {item.premium && item.currentStatus && (
                                <div className="px-2 py-1 bg-green-600 rounded-full">
                                  <span className="text-xs text-white font-medium">Premium</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{item.description}</p>

                            {/* Current Settings Display */}
                            {item.action === 'theme' && (
                              <div className="mt-2">
                                <span className="text-xs text-red-400 font-medium">
                                  Current: {themeOptions.find((t) => t.value === item.current)?.label}
                                </span>
                              </div>
                            )}
                            {item.action === 'language' && (
                              <div className="mt-2">
                                <span className="text-xs text-red-400 font-medium">
                                  Current: {languageOptions.find((l) => l.value === item.current)?.label}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-slate-800 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/password')}
                className="group bg-slate-700 hover:bg-red-600 rounded-xl p-4 transition-all duration-200 hover:scale-105"
              >
                <Lock className="h-6 w-6 text-red-400 group-hover:text-white mx-auto mb-2" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium">Security</span>
              </button>
              <button
                onClick={() => navigate('/premium')}
                className="group bg-slate-700 hover:bg-red-600 rounded-xl p-4 transition-all duration-200 hover:scale-105"
              >
                <Crown className="h-6 w-6 text-red-400 group-hover:text-white mx-auto mb-2" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium">Upgrade</span>
              </button>
              <button
                onClick={handlenoti}
                className="group bg-slate-700 hover:bg-red-600 rounded-xl p-4 transition-all duration-200 hover:scale-105"
              >
                <Bell className="h-6 w-6 text-red-400 group-hover:text-white mx-auto mb-2" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium">Alerts</span>
              </button>
              <button
                onClick={() => navigate('/privacy')}
                className="group bg-slate-700 hover:bg-red-600 rounded-xl p-4 transition-all duration-200 hover:scale-105"
              >
                <HelpCircle className="h-6 w-6 text-red-400 group-hover:text-white mx-auto mb-2" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium">Help</span>
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">Bite Count v2.1.0</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default StngComponent;
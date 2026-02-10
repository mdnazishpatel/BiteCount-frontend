import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import {
  Target,
  TrendingUp,
  Utensils,
  ChevronRight,
  Star,
  Users,
  Calendar,
  ArrowRight,
  BarChart3,
  Camera,
} from 'lucide-react';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

const NutritionHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const BenefitsDropdown = () => (
    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border-2 border-red-600 rounded-xl p-6 shadow-2xl z-50 animate-fadeIn">
      <h3 className="text-white font-semibold text-lg mb-4">
        What you'll achieve:
      </h3>
      <div className="space-y-3">
        {[
          {
            icon: <Camera className="w-5 h-5" />,
            title: 'Effortless Food Logging',
            desc: 'Log meals in seconds',
          },
          {
            icon: <BarChart3 className="w-5 h-5" />,
            title: 'Detailed Analytics',
            desc: 'Track calories & macros',
          },
          {
            icon: <Target className="w-5 h-5" />,
            title: 'Goal Achievement',
            desc: 'Stay on track with targets',
          },
          {
            icon: <Camera className="w-5 h-5" />,
            title: 'Photo Recognition',
            desc: 'Snap photos to identify foods',
          },
        ].map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors"
          >
            <div className="text-red-500 mt-1">{benefit.icon}</div>
            <div>
              <p className="font-semibold">{benefit.title}</p>
              <p className="text-sm text-gray-400">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowBenefits(false)}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2 mt-4"
      >
        <span>Start Your Journey</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Smarter Nutrition{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Starts Here.
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              This year, our cutting-edge calorie tracking system empowers you to take
              control of your health in a world that rarely slows down. Your data. Your
              journey. Your results.
            </p>

            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
            >
              Start counting...
            </Link>

            {/* Updated Benefits Button */}
            <div className="relative">
              <button
                onClick={() => setShowBenefits(!showBenefits)}
                onBlur={(e) => {
                  // Only close if clicking outside the dropdown
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setTimeout(() => setShowBenefits(false), 200);
                  }
                }}
                className="group bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-600 hover:border-red-600 hover:bg-slate-700 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>View Benefits</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    showBenefits ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {showBenefits && <BenefitsDropdown />}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-gray-400">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50M+</div>
                <div className="text-gray-400">Meals Tracked</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right Content - Food Gallery */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/api/placeholder/600/400"
                  alt="Healthy meal"
                  className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Smaller images */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/api/placeholder/300/300"
                  alt="Fresh salad"
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/api/placeholder/300/300"
                  alt="Smoothie bowl"
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-2xl p-4 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">1,850</div>
                  <div className="text-sm text-gray-600">cal tracked today</div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300">
              Track your meals, calories, and make healthier food choices every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="bg-slate-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-red-500">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Log Meals Easily</h3>
              <p className="text-gray-300">
                Quickly record what you eat with just a few taps. Our smart database makes
                meal logging effortless and accurate.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-red-500">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Track Calories Accurately
              </h3>
              <p className="text-gray-300">
                Visualize your daily intake and stay within your goals with precision
                tracking and detailed nutrition insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-red-500">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Progress Insights</h3>
              <p className="text-gray-300">
                Monitor your journey with beautiful charts and personalized insights.
                Celebrate every milestone on your path to health.
              </p>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Community Support
                  </h3>
                  <p className="text-gray-300">
                    Join a community of health-conscious individuals. Share your progress,
                    get motivation, and learn from others on the same journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Meal Planning</h3>
                  <p className="text-gray-300">
                    Plan your meals ahead of time. Set weekly goals, create shopping lists,
                    and stay organized with your nutrition planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already achieving their nutrition goals
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NutritionHomepage;

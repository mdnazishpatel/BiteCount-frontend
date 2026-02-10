import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import {  Target, TrendingUp, Utensils, ChevronRight, Star, Users, Calendar, ArrowRight, BarChart3, Camera, } from 'lucide-react';
import Footer from './Footer.jsx';
import { Link } from 'react-router-dom';

const NutritionHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const BenefitsDropdown = () => (
    <div className="absolute bottom-full left-0 mb-2 w-72 max-h-96 overflow-y-auto bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <h4 className="text-base font-semibold text-white mb-3 flex items-center space-x-2">
        <Target className="h-4 w-4 text-red-400" />
        <span>What you'll achieve:</span>
      </h4>
      <div className="space-y-2">
        {[
          {
            icon: <Utensils className="h-4 w-4 text-green-400" />,
            title: 'Effortless Food Logging',
            desc: 'Log meals in seconds'
          },
          {
            icon: <BarChart3 className="h-4 w-4 text-blue-400" />,
            title: 'Detailed Analytics',
            desc: 'Track calories & macros'
          },
          {
            icon: <Target className="h-4 w-4 text-purple-400" />,
            title: 'Goal Achievement',
            desc: 'Stay on track with targets'
          },
          {
            icon: <Camera className="h-4 w-4 text-yellow-400" />,
            title: 'Photo Recognition',
            desc: 'Snap photos to identify foods'
          }
        ].map((benefit, index) => (
          <div key={index} className="flex items-start space-x-2 group hover:bg-slate-700/50 p-1.5 rounded-lg transition-colors">
            <div className="flex-shrink-0 mt-0.5">{benefit.icon}</div>
            <div>
              <div className="text-white font-medium text-sm">{benefit.title}</div>
              <div className="text-gray-400 text-xs">{benefit.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-700">
        <Link to='/count'>
          <button 
            onClick={() => setShowBenefits(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">
                    Smarter Nutrition
                  </span>
                  <br />
                  <span className="text-white">Starts Here.</span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  This year, our cutting-edge calorie tracking system empowers you to take control 
                  of your health in a world that rarely slows down. Your data. Your journey. Your results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to='/count'>
                  <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Start counting...</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                {/* Updated Benefits Button */}
                <div className="relative z-50">
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
                    <Target className="h-5 w-5" />
                    <span>View Benefits</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showBenefits ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </button>
                  
                  {showBenefits && <BenefitsDropdown />}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">10K+</div>
                  <div className="text-sm text-gray-400">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">50M+</div>
                  <div className="text-sm text-gray-400">Meals Tracked</div>
                </div>
                <div className="flex items-center space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-5 w-5 fill-red-400 text-red-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Content - Food Gallery */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <div className="col-span-2 relative group">
                  <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=300&fit=crop" 
                      alt="Healthy meal"
                      className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                {/* Smaller images */}
                <div className="relative group">
                  <div className="bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop" 
                      alt="Salad bowl"
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
                    <img 
                      src="https://tse1.mm.bing.net/th/id/OIP.NgduhTWYtTrXPMu5S_nougHaE8?pid=Api&P=0&h=220" 
                      alt="Smoothie"
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop" 
                      alt="Grilled vegetables"
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop" 
                      alt="Pasta dish"
                      className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-slate-800 border border-slate-600 rounded-xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-white">1,850 cal tracked today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="text-red-400">Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track your meals, calories, and make healthier food choices every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Log Meals Easily</h3>
              <p className="text-gray-400 leading-relaxed">
                Quickly record what you eat with just a few taps. Our smart database 
                makes meal logging effortless and accurate.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Track Calories Accurately</h3>
              <p className="text-gray-400 leading-relaxed">
                Visualize your daily intake and stay within your goals with 
                precision tracking and detailed nutrition insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Progress Insights</h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor your journey with beautiful charts and personalized insights. 
                Celebrate every milestone on your path to health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Community Support</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Join a community of health-conscious individuals. Share your progress, 
                get motivation, and learn from others on the same journey.
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 transition-colors duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Meal Planning</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Plan your meals ahead of time. Set weekly goals, create shopping lists, 
                and stay organized with your nutrition planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Footer/>
    </div>
  );
};

export default NutritionHomepage;

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Crown, Check, Star, Target, Shield,  Brain, BarChart3, Users, ArrowRight, Play } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import toast from 'react-hot-toast';

const PremiumPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toastShown = useRef(false);  // flag to track toast

  useEffect(() => {
    if (!toastShown.current) {
     toast.success(
  "✨ Welcome to Premium Features! Explore our upcoming AI-powered food scanner. It's not live yet, but enjoy our free plans meanwhile! 🍎",
  { duration: 2000 }
);
      toastShown.current = true;
    }

    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Camera,
      title: "AI-Powered Food Scanning",
      description: "Point your camera at any food and get instant detailed nutritional analysis with 99.5% accuracy",
      premium: true
    },
    {
      icon: Brain,
      title: "Smart Nutrition AI",
      description: "Get personalized meal recommendations based on your goals, dietary restrictions, and preferences",
      premium: true
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your nutrition patterns, macro/micronutrient trends, and health metrics",
      premium: true
    },
    {
      icon: Target,
      title: "Custom Goal Tracking",
      description: "Set and track multiple health goals simultaneously with AI-powered progress optimization",
      premium: true
    },
    {
      icon: Shield,
      title: "Health Monitoring",
      description: "Track blood sugar impact, inflammation markers, and metabolic health indicators",
      premium: true
    },
    {
      icon: Users,
      title: "Expert Consultations",
      description: "Direct access to certified nutritionists and dietitians for personalized guidance",
      premium: true
    }
  ];

  const scanResults = [
    { nutrient: "Calories", value: "245", unit: "kcal", color: "text-red-400" },
    { nutrient: "Protein", value: "18.5", unit: "g", color: "text-blue-400" },
    { nutrient: "Carbs", value: "32.1", unit: "g", color: "text-yellow-400" },
    { nutrient: "Fiber", value: "4.2", unit: "g", color: "text-green-400" },
    { nutrient: "Sugar", value: "8.7", unit: "g", color: "text-purple-400" },
    { nutrient: "Fat", value: "9.3", unit: "g", color: "text-orange-400" }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/forever',
      description: 'Get started with basic scanning',
      features: [
        'Basic food scanning',
        'View nutritional breakdown',
        'Profile storage & history',
        'limited scans per day'
      ],
      popular: false,
      current: true
    },
    {
      id: 'starter',
      name: 'Starter',
      price: '$6',
      period: '/month',
      description: 'Enhanced scanning experience',
      features: [
        'Unlimited food scanning',
        'Detailed macro & micro nutrients',
        'Advanced profile analytics',
        'Meal tracking & history',
        'Custom daily goals',
        'Export data reports'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$11',
      period: '/month',
      description: 'AI-powered nutrition insights',
      features: [
        'Everything in Starter',
        'AI meal recommendations',
        'Health trend analysis',
        'Ingredient alternatives',
        'Weekly nutrition reports',
        'Priority customer support'
      ],
      popular: true
    },
    {
      id: 'expert',
      name: 'Expert',
      price: '$19',
      period: '/month',
      description: 'Complete nutrition optimization',
      features: [
        'Everything in Pro',
        'Personal nutrition coach AI',
        'Custom meal planning',
        'Health goal optimization',
        'API access for integrations',
        'Advanced health analytics'
      ],
      popular: false
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className={`inline-flex items-center space-x-2 bg-red-600/20 border border-red-500/30 rounded-full px-6 py-3 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Crown className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-semibold">Premium Features</span>
              </div>
              
              <h1 className={`text-5xl lg:text-7xl font-bold leading-tight mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="text-white">Scan Any Food.</span>
                <br />
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Know Everything.</span>
              </h1>
              
              <p className={`text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                You're already enjoying our free food scanning! Upgrade to unlock unlimited scans, 
                AI-powered insights, and advanced nutrition analytics to supercharge your health journey.
              </p>

              {/* Demo Phone Mockup */}
              <div className={`relative max-w-md mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-slate-800 rounded-3xl p-4 shadow-2xl border border-slate-700">
                  <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-400">ScanNutrition Pro</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="text-xs text-gray-400">Scanning...</div>
                      </div>
                    </div>
                    
                    {/* Camera Viewfinder */}
                    <div className="relative">
                      <img 
                        src="https://melissashealthykitchen.com/wp-content/uploads/2019/04/image2-79.jpg" 
                        alt="Food being scanned"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 border-2 border-red-500 rounded-xl">
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-red-500"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-red-500"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-red-500"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-red-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 border-2 border-red-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Scan Results */}
                    <div className="mt-4 space-y-2">
                      <div className="text-sm font-semibold text-white">Grilled Salmon Bowl - Detected</div>
                      <div className="grid grid-cols-3 gap-2">
                        {scanResults.slice(0, 6).map((result, index) => (
                          <div key={index} className="bg-slate-800 rounded-lg p-2 text-center">
                            <div className={`text-xs font-semibold ${result.color}`}>
                              {result.value}{result.unit}
                            </div>
                            <div className="text-xs text-gray-400">{result.nutrient}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Effects */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-slate-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Premium <span className="text-red-400">AI Features</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Advanced technology that transforms how you track and understand your nutrition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:shadow-2xl hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  {feature.premium && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-1">
                        <Crown className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How <span className="text-red-400">Scanning</span> Works
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Three simple steps to get complete nutritional analysis of any food
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 group-hover:border-red-500/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-white mb-3">1. Scan Your Food</h3>
                  <p className="text-gray-400">Point your camera at any food item. Our AI recognizes thousands of foods instantly.</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 group-hover:border-red-500/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-white mb-3">2. AI Analysis</h3>
                  <p className="text-gray-400">Advanced algorithms analyze nutrition content, portion size, and health impact in real-time.</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 group-hover:border-red-500/50 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-white mb-3">3. Get Insights</h3>
                  <p className="text-gray-400">Receive detailed breakdown with calories, macros, vitamins, and personalized recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Choose Your <span className="text-red-400">Plan</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Unlock the power of AI-driven nutrition analysis
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {plans.map((plan) => (
                <div key={plan.id} className={`relative bg-slate-900 rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-red-500 shadow-2xl shadow-red-500/20' : plan.current ? 'border-green-500 shadow-2xl shadow-green-500/20' : 'border-slate-700 hover:border-red-500/50'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  {plan.current && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        <span>Current Plan</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-xl text-gray-400 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${plan.current ? 'bg-green-600 text-white cursor-not-allowed' : plan.popular ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-xl' : 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'}`}>
                    {plan.current ? 'Current Plan' : plan.id === 'free' ? 'Free Forever' : 'Upgrade Now'}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                Already enjoying free scanning? See what you're missing with premium features.
              </p>
              <p className="text-gray-500 text-sm">
                All paid plans include a 7-day free trial. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">99.5%</div>
                <div className="text-gray-400">Scanning Accuracy</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-gray-400">Foods Recognized</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">2.5M+</div>
                <div className="text-gray-400">Scans Completed</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300">0.3s</div>
                <div className="text-gray-400">Average Scan Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Unlock Premium Features?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              You're already scanning food for free! Upgrade to get unlimited scans, AI insights, and advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-red-400 hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PremiumPage;
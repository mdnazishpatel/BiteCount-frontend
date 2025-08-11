import React, { useState } from 'react';
import { Loader2, Send, Info, CheckCircle, AlertCircle, Users, Target, Heart, Star } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.firstname.trim() || !formData.message.trim()) {
      setError('First name and message are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://bitecount-backend.onrender.com/information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phoneNumber: formData.phoneNumber ? Number(formData.phoneNumber) : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ firstname: '', lastname: '', phoneNumber: '', message: '' });
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
      } else {
        setError(data.message || 'Failed to submit suggestion');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-white">About</span>
              <span className="text-red-400"> Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Empowering healthier lives through intelligent nutrition tracking and personalized insights.
            </p>
          </div>

          {/* Main About Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Our Story */}
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Our Story</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded with a passion for wellness, Nutrition Tracker was born from the belief that everyone deserves access to simple, effective nutrition management tools.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We combine cutting-edge AI technology with user-friendly design to help you make informed decisions about your health and nutrition journey.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                To democratize nutrition awareness by providing intelligent, personalized tracking solutions that adapt to your unique lifestyle and dietary needs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that informed choices lead to healthier lives, and we're here to make those choices easier for everyone.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 shadow-lg mb-12">
            <div className="flex items-center mb-6">
              <Star className="h-6 w-6 text-red-400 mr-3" />
              <h2 className="text-3xl font-semibold text-white">What We Offer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Tracking</h3>
                <p className="text-gray-300 text-sm">AI-powered nutrition analysis that learns from your habits and preferences.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Personalized Goals</h3>
                <p className="text-gray-300 text-sm">Customized nutrition targets based on your individual health objectives.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Health Insights</h3>
                <p className="text-gray-300 text-sm">Comprehensive reports and trends to help you understand your nutrition patterns.</p>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Simplicity</h3>
                <p className="text-gray-300">Complex nutrition made simple through intuitive design and smart automation.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Privacy</h3>
                <p className="text-gray-300">Your health data is yours. We prioritize security and transparency in everything we do.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-red-400 mb-3">Innovation</h3>
                <p className="text-gray-300">Constantly evolving with the latest technology to serve you better.</p>
              </div>
            </div>
            <div className="text-center mt-8 pt-6 border-t border-slate-600">
              <p className="text-gray-400 text-sm">
                Founded by <span className="text-red-400 font-semibold">Sikandar Patel</span>, a passionate B.Tech student and fitness & coding enthusiast.
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-white mb-3">Get In Touch</h2>
              <p className="text-gray-300">We'd love to hear from you! Share your thoughts, suggestions, or questions.</p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="bg-green-900/50 border border-green-500/50 rounded-xl p-4 flex items-center space-x-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-green-200 text-sm">Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 flex items-center space-x-3 mb-6">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-300 mb-1">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-500 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full bg-slate-700 border border-slate-500 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number 
                  
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-slate-700 border border-slate-500 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]*"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-slate-700 border border-slate-500 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 resize-none custom-scrollbar"
                  placeholder="Share your thoughts, suggestions, or questions"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Custom Scrollbar Styles */}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgb(51, 65, 85);
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgb(220, 38, 38), rgb(185, 28, 28));
              border-radius: 4px;
              border: 1px solid rgb(71, 85, 105);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgb(239, 68, 68), rgb(220, 38, 38));
            }
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgb(220, 38, 38) rgb(51, 65, 85);
            }
          `}</style>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Database, Users, FileText, Lock, Eye, Download, Globe, AlertTriangle, Phone, TrendingUp } from 'lucide-react';
import Footer from './Footer';
import Header from './Header';

const PrivacyPolicyComponent = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeTab, setActiveTab] = useState('privacy');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const Section = ({ id, title, children, icon: Icon }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl mb-6 overflow-hidden hover:border-red-500/50 transition-colors duration-300">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-8 py-6 text-left bg-slate-800 hover:bg-slate-700 transition-colors duration-300 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">{title}</span>
        </div>
        <div className="text-red-400">
          {activeSection === id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </div>
      </button>
      {activeSection === id && (
        <div className="px-8 py-6 bg-slate-900 text-gray-300 leading-relaxed border-t border-slate-700">
          {children}
        </div>
      )}
    </div>
  );

  const TabButton = ({ id, title, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
        isActive 
          ? 'bg-red-600 text-white shadow-lg' 
          : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white border border-slate-700'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </button>
  );

  const PrivacyPolicy = () => (
    <div className="space-y-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-white mb-4">Privacy Policy & Data Protection</h2>
        <p className="text-red-400 text-lg mb-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          We are committed to protecting your privacy and ensuring the security of your personal information in our nutrition tracking platform.
        </p>
      </div>

      <Section id="data-collection" title="What Data We Collect" icon={Database}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">Personal Information:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Account information (name, email address, username)</li>
          <li>Profile data (age, gender, height, weight, activity level)</li>
          <li>Contact information for support purposes</li>
          <li>Profile photos (optional)</li>
        </ul>
        
        <h4 className="text-xl font-semibold mb-4 text-red-400">Health & Nutrition Data:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Food intake logs and calorie consumption records</li>
          <li>Nutritional goals and dietary preferences/restrictions</li>
          <li>Weight tracking and fitness metrics over time</li>
          <li>Custom recipes and personalized meal plans</li>
          <li>Water intake and hydration tracking</li>
          <li>Exercise activities and burned calories</li>
        </ul>
        
        <h4 className="text-xl font-semibold mb-4 text-red-400">Usage & Technical Data:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>App usage patterns and feature interactions</li>
          <li>Device information (type, OS, browser)</li>
          <li>IP address and location data (if permitted)</li>
          <li>Error logs and performance metrics</li>
          <li>Session duration and frequency of use</li>
        </ul>
      </Section>

      <Section id="data-usage" title="How We Use Your Data" icon={Eye}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">Primary Uses:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Provide accurate calorie counting and nutrition tracking</li>
          <li>Generate personalized meal recommendations and insights</li>
          <li>Calculate daily caloric needs based on your goals</li>
          <li>Create progress reports and health analytics</li>
          <li>Maintain and improve app functionality</li>
        </ul>
        
        <h4 className="text-xl font-semibold mb-4 text-red-400">Secondary Uses:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Send important updates about your account or the service</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Improve our algorithms and food database accuracy</li>
          <li>Conduct research to enhance nutrition tracking features</li>
          <li>Ensure security and prevent fraudulent activity</li>
        </ul>
      </Section>

      <Section id="data-protection" title="How We Protect Your Data" icon={Shield}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Security Measures:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>End-to-end encryption for all sensitive health data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Secure cloud infrastructure with backup systems</li>
              <li>Two-factor authentication available for accounts</li>
              <li>Limited employee access with strict authentication</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Data Storage:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>All data stored on secure, encrypted servers</li>
              <li>Regular automated backups to prevent data loss</li>
              <li>Compliance with GDPR, CCPA, and HIPAA standards</li>
              <li>Data retention policies to minimize storage duration</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="data-sharing" title="Data Sharing & Third Parties" icon={Users}>
        <div className="bg-slate-800 border border-red-500/50 rounded-xl p-6 mb-6">
          <h4 className="text-xl font-semibold mb-3 text-red-400">We Never Sell Your Data</h4>
          <p className="text-gray-300">Your personal health information is never sold to advertisers, marketers, or any third parties for commercial purposes.</p>
        </div>
        
        <h4 className="text-xl font-semibold mb-4 text-red-400">Limited Sharing Occurs Only For:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li><strong>Service Providers:</strong> Cloud hosting, analytics, and customer support tools</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect user safety</li>
          <li><strong>Business Transfers:</strong> In case of merger or acquisition (with user notification)</li>
          <li><strong>User Consent:</strong> When you explicitly authorize sharing (e.g., with fitness apps)</li>
        </ul>
      </Section>

      <Section id="user-rights" title="Your Rights & Control" icon={Lock}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Access & Control:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>View all your stored data anytime</li>
              <li>Download your complete data archive</li>
              <li>Update or correct personal information</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Privacy Settings:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Control data sharing preferences</li>
              <li>Manage notification settings</li>
              <li>Opt out of analytics and research</li>
              <li>Set data retention preferences</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="cookies" title="Cookies & Tracking" icon={Globe}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">We Use Cookies For:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li><strong>Essential Cookies:</strong> Login sessions and app functionality</li>
          <li><strong>Analytics Cookies:</strong> Understanding app usage patterns (can be disabled)</li>
          <li><strong>Preference Cookies:</strong> Remembering your settings and preferences</li>
        </ul>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <p className="text-gray-300">You can manage cookie preferences in your browser settings or through our cookie consent manager.</p>
        </div>
      </Section>
    </div>
  );

  const TermsOfService = () => (
    <div className="space-y-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-white mb-4">Terms of Service</h2>
        <p className="text-red-400 text-lg mb-2">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          By using our nutrition tracking application, you agree to these terms of service and conditions.
        </p>
      </div>

      <Section id="service-description" title="Service Description" icon={FileText}>
        <p className="text-gray-300 mb-4">
          Our application provides nutrition tracking, calorie counting, and health monitoring services. The service includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Food logging and calorie tracking capabilities</li>
          <li>Nutritional analysis and recommendations</li>
          <li>Progress monitoring and reporting tools</li>
          <li>Meal planning and recipe suggestions</li>
          <li>Community features and support</li>
        </ul>
      </Section>

      <Section id="user-responsibilities" title="User Responsibilities" icon={Users}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">You Agree To:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Provide accurate information when creating your account</li>
          <li>Keep your login credentials secure and confidential</li>
          <li>Use the service only for lawful and intended purposes</li>
          <li>Not attempt to hack, reverse engineer, or damage the system</li>
          <li>Respect other users and maintain appropriate conduct</li>
          <li>Not share false or misleading nutritional information</li>
        </ul>
        
        <div className="bg-slate-800 border border-red-500/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-2 text-red-400">Medical Disclaimer:</h4>
          <p className="text-gray-300">This app is for informational purposes only and should not replace professional medical advice. Always consult healthcare providers for medical decisions.</p>
        </div>
      </Section>

      <Section id="subscription" title="Subscription & Billing" icon={FileText}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">Subscription Plans:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Free tier with basic tracking features</li>
          <li>Premium subscriptions with advanced analytics</li>
          <li>Monthly and annual billing options available</li>
          <li>Automatic renewal unless cancelled</li>
        </ul>
        
        <h4 className="text-xl font-semibold mb-4 text-red-400">Cancellation Policy:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Cancel anytime through account settings</li>
          <li>No partial refunds for unused subscription periods</li>
          <li>Access continues until end of current billing cycle</li>
          <li>Data remains accessible after cancellation</li>
        </ul>
      </Section>

      <Section id="limitations" title="Limitations & Disclaimers" icon={AlertTriangle}>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Service Limitations:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Nutritional data accuracy depends on database sources</li>
              <li>Individual results may vary based on personal factors</li>
              <li>Service availability subject to maintenance windows</li>
              <li>Features may change with updates and improvements</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 border border-red-500/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-2 text-red-400">Liability Disclaimer:</h4>
            <p className="text-gray-300">We provide tools and information but are not liable for health outcomes, dietary decisions, or any damages resulting from app usage.</p>
          </div>
        </div>
      </Section>
    </div>
  );

  const DataUsage = () => (
    <div className="space-y-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-white mb-4">Data Usage & Research</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Learn how we use aggregated, anonymized data to improve nutrition science and help users achieve better health outcomes.
        </p>
      </div>

      <Section id="research-purpose" title="Our Research Mission" icon={TrendingUp}>
        <div className="space-y-6">
          <div className="bg-slate-800 border border-red-500/50 rounded-xl p-6 mb-6">
            <h4 className="text-xl font-semibold mb-3 text-red-400">Our Founder's Vision - Sikandar Patel</h4>
            <p className="text-gray-300 leading-relaxed">
              "I've observed that many people in our communities genuinely want to eat healthy and make good food choices, but they struggle with tracking their nutrition effectively. This gap between intention and action inspired me to create a solution that makes healthy eating accessible and trackable for everyone."
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-400">Making Healthy Eating Accessible:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Raising awareness about the importance of mindful eating and nutrition tracking</li>
              <li>Helping people understand their daily caloric and nutritional needs</li>
              <li>Bridging the gap between wanting to eat healthy and actually doing it</li>
              <li>Empowering individuals with easy-to-use tracking tools</li>
              <li>Building a community that supports healthy lifestyle choices</li>
              <li>Making nutrition science accessible to everyday people</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="data-anonymization" title="Anonymization Process" icon={Shield}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">How We Protect Identity:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-300">
          <li>Remove all personally identifiable information</li>
          <li>Apply statistical noise to prevent re-identification</li>
          <li>Aggregate data across large user groups (minimum 1000 users)</li>
          <li>Use advanced cryptographic techniques for data processing</li>
          <li>Regular audits by third-party privacy experts</li>
        </ul>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-2 text-red-400">Opt-Out Available:</h4>
          <p className="text-gray-300">You can opt out of research participation at any time in your privacy settings without affecting your app experience.</p>
        </div>
      </Section>

      <Section id="data-benefits" title="Benefits to Users" icon={TrendingUp}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">How Research Helps You:</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>More accurate food database with regional variations</li>
          <li>Better personalized recommendations based on similar users</li>
          <li>Improved algorithms for calorie and nutrient estimation</li>
          <li>Early access to features based on research findings</li>
          <li>Contributing to broader understanding of healthy eating patterns</li>
        </ul>
      </Section>
    </div>
  );

  const ContactSupport = () => (
    <div className="space-y-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-white mb-4">Contact & Support</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Questions about privacy, data usage, or need help with your account? We're here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Privacy Officer</h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <p><strong className="text-red-400">Email:</strong> bitecount@gmail.com</p>
            <p><strong className="text-red-400">Response Time:</strong> Within 48 hours</p>
            <p className="text-sm">For privacy concerns, data requests, or account inquiries.</p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-red-500/50 transition-colors duration-300">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">General Support</h3>
          </div>
          <div className="space-y-3 text-gray-300">
            <p><strong className="text-red-400">Email:</strong> bitecount@gmail.com</p>
            <p><strong className="text-red-400">Response Time:</strong> Within 24 hours</p>
            <p className="text-sm">For technical issues, feature questions, or account help.</p>
          </div>
        </div>
      </div>

      <Section id="data-requests" title="Data Access Requests" icon={Download}>
        <h4 className="text-xl font-semibold mb-4 text-red-400">Request Your Data:</h4>
        <div className="space-y-4 text-gray-300">
          <p>You have the right to request a complete copy of your data. This includes:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>All food logs and nutritional data</li>
            <li>Account information and preferences</li>
            <li>Usage history and analytics</li>
            <li>Any custom recipes or meal plans</li>
          </ul>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p><strong className="text-red-400">Processing Time:</strong> Data exports are typically completed within 7-14 business days and sent via secure download link.</p>
          </div>
        </div>
      </Section>


    </div>
  );

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Privacy & <span className="text-red-400">Legal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your privacy matters. Learn how we protect your data and respect your rights.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <TabButton
            id="privacy"
            title="Privacy Policy"
            icon={Shield}
            isActive={activeTab === 'privacy'}
            onClick={setActiveTab}
          />
          <TabButton
            id="terms"
            title="Terms of Service"
            icon={FileText}
            isActive={activeTab === 'terms'}
            onClick={setActiveTab}
          />
          <TabButton
            id="data"
            title="Data Usage"
            icon={Database}
            isActive={activeTab === 'data'}
            onClick={setActiveTab}
          />
          <TabButton
            id="contact"
            title="Contact & Support"
            icon={Phone}
            isActive={activeTab === 'contact'}
            onClick={setActiveTab}
          />
        </div>

        {/* Content */}
        {activeTab === 'privacy' && <PrivacyPolicy />}
        {activeTab === 'terms' && <TermsOfService />}
        {activeTab === 'data' && <DataUsage />}
        {activeTab === 'contact' && <ContactSupport />}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="text-center text-gray-400">
            <p className="mb-2">Questions about this policy?</p>
            <p className="text-red-400 font-semibold">Contact us at bitecount@gmail.com</p>
          </div>
        </div>
      </div>
    </div><Footer/></>
  );
};

export default PrivacyPolicyComponent;
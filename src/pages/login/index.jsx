import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import LoginBenefits from './components/LoginBenefits';
import TestCredentials from './components/TestCredentials';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/user-account-dashboard');
    }

    // Set page title
    document.title = 'Sign In - Royals Web Solutions Marketplace';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <TestCredentials />
              <LoginForm />
            </div>

            {/* Right Column - Benefits */}
            <div className="order-1 lg:order-2">
              <LoginBenefits />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Royals Web Solutions Marketplace. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: "admin@royalswebsolutions.com", password: "admin123" },
    developer: { email: "dev@royalswebsolutions.com", password: "dev123" },
    customer: { email: "customer@royalswebsolutions.com", password: "customer123" }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (isValidCredentials) {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData?.email);
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Navigate to dashboard
        navigate('/user-account-dashboard');
      } else {
        setErrors({
          general: "Invalid email or password. Please try: admin@royalswebsolutions.com / admin123"
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/user-account-dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-modal p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Icon name="User" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Royals Web Solutions account</p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-6">
            <div className="flex items-center">
              <Icon name="AlertCircle" size={16} className="text-error mr-2" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="mb-4"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            fullWidth
            className="mt-6"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <Icon name="Chrome" size={16} className="mr-2" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center"
          >
            <Icon name="Github" size={16} className="mr-2" />
            GitHub
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
          <div className="flex items-center text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="mr-1" />
            <span>Secured with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
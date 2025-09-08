import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AccountSummary from './components/AccountSummary';
import RecentPurchases from './components/RecentPurchases';
import QuickActions from './components/QuickActions';
import OrderHistory from './components/OrderHistory';
import WishlistSection from './components/WishlistSection';
import SupportTickets from './components/SupportTickets';
import AccountSettings from './components/AccountSettings';

const UserAccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const userProfile = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    company: "Creative Studio LLC",
    website: "https://creativestudio.com",
    joinDate: "2023-03-15",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  const userStats = {
    totalPurchases: 12,
    availableDownloads: 8,
    activeProjects: 3,
    accountStanding: "Excellent"
  };

  const recentPurchases = [
    {
      id: 1,
      templateName: "Modern Business Portfolio",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      purchaseDate: "2025-01-02",
      price: 49.99,
      status: "completed",
      license: "Extended",
      downloadCount: 2,
      downloadLimit: 5
    },
    {
      id: 2,
      templateName: "E-commerce Startup Kit",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      purchaseDate: "2024-12-28",
      price: 79.99,
      status: "completed",
      license: "Standard",
      downloadCount: 1,
      downloadLimit: 3
    },
    {
      id: 3,
      templateName: "Creative Agency Landing",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      purchaseDate: "2024-12-20",
      price: 39.99,
      status: "processing",
      license: "Standard",
      downloadCount: 0,
      downloadLimit: 3
    }
  ];

  const orderHistory = [
    {
      id: 1,
      orderNumber: "WC-2025-001234",
      orderDate: "2025-01-02T10:30:00Z",
      status: "completed",
      total: 49.99,
      subtotal: 49.99,
      tax: 0.00,
      itemCount: 1,
      paymentMethod: "Visa ending in 4242",
      transactionId: "txn_1234567890abcdef",
      items: [
        {
          name: "Modern Business Portfolio",
          license: "Extended",
          price: 49.99
        }
      ]
    },
    {
      id: 2,
      orderNumber: "WC-2024-005678",
      orderDate: "2024-12-28T14:15:00Z",
      status: "completed",
      total: 119.98,
      subtotal: 119.98,
      tax: 0.00,
      itemCount: 2,
      paymentMethod: "PayPal",
      transactionId: "txn_abcdef1234567890",
      items: [
        {
          name: "E-commerce Startup Kit",
          license: "Standard",
          price: 79.99
        },
        {
          name: "Creative Agency Landing",
          license: "Standard",
          price: 39.99
        }
      ]
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Minimalist SaaS Dashboard",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      currentPrice: 59.99,
      originalPrice: 79.99,
      rating: 4.8,
      addedDate: "2024-12-15",
      priceChange: {
        type: 'decrease',
        amount: 25
      }
    },
    {
      id: 2,
      name: "Restaurant Website Template",
      thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      currentPrice: 44.99,
      originalPrice: 44.99,
      rating: 4.6,
      addedDate: "2024-12-10"
    },
    {
      id: 3,
      name: "Fitness App Landing Page",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      currentPrice: 34.99,
      originalPrice: 29.99,
      rating: 4.9,
      addedDate: "2024-12-05",
      priceChange: {
        type: 'increase',
        amount: 17
      }
    }
  ];

  const supportTickets = [
    {
      id: 1,
      ticketNumber: "SUP-2025-001",
      subject: "Download link not working for Business Portfolio template",
      description: "I purchased the Modern Business Portfolio template yesterday but the download link in my email is not working. Can you please help me access the files?",
      status: "open",
      priority: "high",
      createdDate: "2025-01-03T09:15:00Z",
      messageCount: 3,
      assignedTo: "Mike Support",
      lastMessage: {
        sender: "Mike Support",
        date: "2025-01-03T11:30:00Z",
        content: "Hi Sarah, I've regenerated your download link and sent it to your email. Please check your inbox and let me know if you need any further assistance."
      }
    },
    {
      id: 2,
      ticketNumber: "SUP-2024-089",
      subject: "Custom project inquiry - Real estate website",
      description: "I need a custom real estate website with property listings, agent profiles, and mortgage calculator. Can you provide a quote and timeline?",
      status: "resolved",
      priority: "medium",
      createdDate: "2024-12-20T14:20:00Z",
      messageCount: 8,
      assignedTo: "Lisa Design",
      lastMessage: {
        sender: "You",
        date: "2024-12-22T16:45:00Z",
        content: "Perfect! I'll proceed with the proposal. Thank you for the detailed breakdown."
      }
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'purchases', label: 'Purchases', icon: 'ShoppingBag' },
    { id: 'orders', label: 'Order History', icon: 'FileText' },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  useEffect(() => {
    // Close mobile menu when tab changes
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <AccountSummary userStats={userStats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentPurchases purchases={recentPurchases?.slice(0, 3)} />
              <QuickActions />
            </div>
          </div>
        );
      case 'purchases':
        return <RecentPurchases purchases={recentPurchases} />;
      case 'orders':
        return <OrderHistory orders={orderHistory} />;
      case 'wishlist':
        return <WishlistSection wishlistItems={wishlistItems} />;
      case 'support':
        return <SupportTickets tickets={supportTickets} />;
      case 'settings':
        return <AccountSettings userProfile={userProfile} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Account Dashboard - WebCraft Marketplace</title>
        <meta name="description" content="Manage your WebCraft account, view purchase history, downloads, and account settings." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <img
                  src={userProfile?.avatar}
                  alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Welcome back, {userProfile?.firstName}!
                </h1>
                <p className="text-muted-foreground">
                  Member since {new Date(userProfile.joinDate)?.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              {/* Mobile Menu Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-lg text-card-foreground"
                >
                  <span className="font-medium">
                    {tabs?.find(tab => tab?.id === activeTab)?.label}
                  </span>
                  <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={20} />
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block bg-card border border-border rounded-lg p-2`}>
                <div className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-card-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccountDashboard;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TemplateGallery from './components/TemplateGallery';
import TemplateSpecs from './components/TemplateSpecs';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import RelatedTemplates from './components/RelatedTemplates';

const TemplateDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartItems, setCartItems] = useState(2);

  // Mock template data
  const template = {
    id: 1,
    name: "Modern Business Dashboard",
    category: "Business",
    price: 89,
    originalPrice: 129,
    rating: 4.8,
    reviewCount: 247,
    description: `A comprehensive business dashboard template built with React 18 and Tailwind CSS. This template provides a complete solution for modern business applications with advanced analytics, user management, and responsive design.\n\nPerfect for startups, agencies, and enterprises looking to create professional web applications quickly. The template includes multiple dashboard layouts, data visualization components, and a complete authentication system.\n\nFeatures include dark/light mode support, mobile-first responsive design, and extensive customization options. All components are built with accessibility in mind and follow modern web standards.`,
    previewImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
    ],
    techStack: [
      "React 18",
      "Tailwind CSS",
      "Vite",
      "React Router",
      "Framer Motion",
      "Recharts",
      "React Hook Form",
      "Lucide Icons"
    ],
    features: [
      "Fully responsive design for all devices",
      "Dark and light theme support",
      "Advanced data visualization with charts",
      "Complete authentication system",
      "User management dashboard",
      "Real-time notifications",
      "Mobile-first approach",
      "SEO optimized structure",
      "Accessibility compliant (WCAG 2.1)",
      "Clean and maintainable code",
      "Comprehensive documentation",
      "Free lifetime updates"
    ],
    includedFiles: [
      { name: "Source Code (React)", size: "2.4 MB" },
      { name: "Documentation", size: "1.2 MB" },
      { name: "Design Assets", size: "850 KB" },
      { name: "Installation Guide", size: "245 KB" },
      { name: "License Agreement", size: "89 KB" }
    ],
    browserSupport: [
      "Chrome 90+",
      "Firefox 88+",
      "Safari 14+",
      "Edge 90+"
    ],
    pages: 12,
    components: 45,
    fileSize: "4.8 MB",
    lastUpdated: "Aug 2024",
    demoUrl: "https://demo.example.com",
    tags: ["React", "Dashboard", "Business", "Analytics", "Modern"],
    author: {
      name: "WebCraft Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4.9,
      sales: 1247
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const handleAddToCart = (item) => {
    setCartItems(prev => prev + item?.quantity);
    // Here you would typically dispatch to a cart context or state management
    console.log('Added to cart:', item);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: template?.name,
        text: template?.description?.split('\n')?.[0],
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{template?.name} - WebCraft Marketplace</title>
        <meta name="description" content={template?.description?.split('\n')?.[0]} />
        <meta property="og:title" content={template?.name} />
        <meta property="og:description" content={template?.description?.split('\n')?.[0]} />
        <meta property="og:image" content={template?.previewImage} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Breadcrumb */}
        <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/template-gallery" className="text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <Link to="/template-gallery" className="text-muted-foreground hover:text-foreground">
                {template?.category}
              </Link>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <span className="text-foreground font-medium">{template?.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{template?.name}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={16}
                            className={star <= Math.round(template?.rating) ? "text-warning fill-current" : "text-muted-foreground"}
                          />
                        ))}
                        <span className="font-medium text-foreground">{template?.rating}</span>
                        <span className="text-muted-foreground">({template?.reviewCount} reviews)</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">Category: {template?.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleWishlist}
                      className={isWishlisted ? "text-red-500 border-red-500" : ""}
                    >
                      <Icon name="Heart" size={16} className={isWishlisted ? "fill-current" : ""} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Icon name="Share2" size={16} />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {template?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Template Gallery */}
              <TemplateGallery template={template} />

              {/* Navigation Tabs */}
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">Template Description</h2>
                      <div className="prose prose-slate max-w-none">
                        {template?.description?.split('\n')?.map((paragraph, index) => (
                          <p key={index} className="text-foreground leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">About the Author</h3>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="User" size={24} color="white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{template?.author?.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={14} className="text-warning fill-current" />
                              <span>{template?.author?.rating} rating</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="ShoppingBag" size={14} />
                              <span>{template?.author?.sales} sales</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <TemplateSpecs template={template} />
                )}

                {activeTab === 'reviews' && (
                  <ReviewsSection template={template} />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Section */}
              <PricingSection template={template} onAddToCart={handleAddToCart} />

              {/* Demo Link */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Try Before You Buy</h3>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="ExternalLink"
                  iconPosition="left"
                  onClick={() => window.open(template?.demoUrl, '_blank')}
                >
                  View Live Demo
                </Button>
              </div>

              {/* Support Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Support & Updates</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="MessageCircle" size={16} className="text-success" />
                    <span className="text-foreground">6 months support included</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="RefreshCw" size={16} className="text-success" />
                    <span className="text-foreground">Free lifetime updates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="FileText" size={16} className="text-success" />
                    <span className="text-foreground">Detailed documentation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-foreground">30-day money back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Templates */}
          <div className="mt-16">
            <RelatedTemplates currentTemplate={template} />
          </div>
        </div>

        {/* Sticky Mobile Purchase Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-primary">${template?.price}</div>
              {template?.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">
                  ${template?.originalPrice}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Eye" size={16} />
              </Button>
              <Button variant="default" size="sm">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Spacer for Mobile */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default TemplateDetails;
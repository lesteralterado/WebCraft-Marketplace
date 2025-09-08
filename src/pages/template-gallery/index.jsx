import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SortControls from './components/SortControls';
import FeaturedTemplates from './components/FeaturedTemplates';
import TemplateGrid from './components/TemplateGrid';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TemplateGallery = () => {
  const [filters, setFilters] = useState({
    categories: [],
    technologies: [],
    features: [],
    priceRange: [0, 500],
    search: ''
  });
  
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock template data
  const mockTemplates = [
    {
      id: 1,
      title: "Modern Business Landing Page",
      category: "Business",
      price: 49,
      originalPrice: 79,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      rating: 4.8,
      downloads: "2.3k",
      tags: ["React", "Responsive", "SEO", "Dark Mode"],
      isFeatured: true,
      isNew: false,
      discount: 38,
      description: "A sleek and modern business landing page template perfect for startups and corporate websites. Features responsive design and dark mode support.",
      technologies: ["react", "html"],
      features: ["responsive", "dark-mode", "seo"]
    },
    {
      id: 2,
      title: "E-commerce Store Template",
      category: "E-commerce",
      price: 89,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      rating: 4.9,
      downloads: "1.8k",
      tags: ["Vue.js", "Shopping Cart", "Payment", "Mobile"],
      isFeatured: true,
      isNew: true,
      discount: null,
      description: "Complete e-commerce solution with shopping cart, payment integration, and mobile-first design approach.",
      technologies: ["vue", "html"],
      features: ["responsive", "seo"]
    },
    {
      id: 3,
      title: "Creative Portfolio Showcase",
      category: "Portfolio",
      price: 35,
      originalPrice: 55,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      rating: 4.7,
      downloads: "3.1k",
      tags: ["HTML/CSS", "Animations", "Gallery", "Minimal"],
      isFeatured: true,
      isNew: false,
      discount: 36,
      description: "Stunning portfolio template for creative professionals with smooth animations and gallery features.",
      technologies: ["html"],
      features: ["responsive", "animations"]
    },
    {
      id: 4,
      title: "Restaurant & Food Delivery",
      category: "Restaurant",
      price: 65,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      rating: 4.6,
      downloads: "1.2k",
      tags: ["WordPress", "Menu", "Booking", "Reviews"],
      isFeatured: false,
      isNew: true,
      discount: null,
      description: "Perfect template for restaurants with online menu, table booking, and customer review system.",
      technologies: ["wordpress"],
      features: ["responsive", "seo"]
    },
    {
      id: 5,
      title: "Corporate Website Template",
      category: "Corporate",
      price: 75,
      originalPrice: 95,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      rating: 4.8,
      downloads: "2.7k",
      tags: ["Angular", "Professional", "Team", "Services"],
      isFeatured: false,
      isNew: false,
      discount: 21,
      description: "Professional corporate template with team showcase, services section, and contact forms.",
      technologies: ["angular"],
      features: ["responsive", "seo", "accessibility"]
    },
    {
      id: 6,
      title: "Blog & Magazine Layout",
      category: "Blog",
      price: 29,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=800&h=600&fit=crop",
      rating: 4.5,
      downloads: "4.2k",
      tags: ["React", "CMS", "Comments", "Social"],
      isFeatured: false,
      isNew: false,
      discount: null,
      description: "Clean and modern blog template with CMS integration and social sharing features.",
      technologies: ["react"],
      features: ["responsive", "seo"]
    },
    {
      id: 7,
      title: "Creative Agency Showcase",
      category: "Creative",
      price: 85,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      rating: 4.9,
      downloads: "1.5k",
      tags: ["Vue.js", "Portfolio", "Animations", "Interactive"],
      isFeatured: false,
      isNew: true,
      discount: 29,
      description: "Dynamic creative agency template with interactive elements and stunning animations.",
      technologies: ["vue"],
      features: ["responsive", "animations", "dark-mode"]
    },
    {
      id: 8,
      title: "SaaS Product Landing",
      category: "Landing Page",
      price: 55,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      rating: 4.7,
      downloads: "2.9k",
      tags: ["React", "SaaS", "Pricing", "Features"],
      isFeatured: false,
      isNew: false,
      discount: null,
      description: "Perfect landing page template for SaaS products with pricing tables and feature highlights.",
      technologies: ["react"],
      features: ["responsive", "seo", "dark-mode"]
    }
  ];

  // Filter and sort templates
  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = mockTemplates?.filter(template => {
      // Category filter
      if (filters?.categories?.length > 0 && !filters?.categories?.includes(template?.category?.toLowerCase()?.replace(/\s+/g, '-'))) {
        return false;
      }

      // Technology filter
      if (filters?.technologies?.length > 0 && !filters?.technologies?.some(tech => template?.technologies?.includes(tech))) {
        return false;
      }

      // Features filter
      if (filters?.features?.length > 0 && !filters?.features?.some(feature => template?.features?.includes(feature))) {
        return false;
      }

      // Price range filter
      if (template?.price < filters?.priceRange?.[0] || template?.price > filters?.priceRange?.[1]) {
        return false;
      }

      // Search filter
      if (filters?.search && !template?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !template?.category?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
          !template?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.search?.toLowerCase()))) {
        return false;
      }

      return true;
    });

    // Sort templates
    switch (sortBy) {
      case 'newest':
        filtered = filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'price-low':
        filtered = filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered = filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered = filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'downloads':
        filtered = filtered?.sort((a, b) => parseFloat(b?.downloads) - parseFloat(a?.downloads));
        break;
      case 'popular':
      default:
        filtered = filtered?.sort((a, b) => b?.isFeatured - a?.isFeatured || parseFloat(b?.downloads) - parseFloat(a?.downloads));
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const featuredTemplates = mockTemplates?.filter(template => template?.isFeatured);

  const handleAddToCart = (template) => {
    if (!cartItems?.some(item => item?.id === template?.id)) {
      setCartItems(prev => [...prev, template]);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  return (
    <>
      <Helmet>
        <title>Template Gallery - WebCraft Marketplace</title>
        <meta name="description" content="Discover premium website templates for your next project. Browse our collection of responsive, modern templates for business, e-commerce, portfolio, and more." />
        <meta name="keywords" content="website templates, web design, responsive templates, business templates, e-commerce templates" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Premium Website Templates
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover professionally designed templates to kickstart your next project. 
              From business websites to e-commerce stores, find the perfect template for your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" iconName="Search" iconPosition="left">
                Browse All Templates
              </Button>
              <Button variant="outline" size="lg" iconName="Zap" iconPosition="left">
                Request Custom Design
              </Button>
            </div>
          </div>

          {/* Featured Templates */}
          <FeaturedTemplates 
            templates={featuredTemplates}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
          />

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Templates Section */}
            <div className="flex-1">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredAndSortedTemplates?.length}
                onFilterToggle={toggleFilterSidebar}
              />

              {/* Template Grid */}
              <div className="mt-6">
                <TemplateGrid
                  templates={filteredAndSortedTemplates}
                  viewMode={viewMode}
                  onAddToCart={handleAddToCart}
                  cartItems={cartItems}
                  loading={loading}
                />
              </div>

              {/* Load More Button */}
              {filteredAndSortedTemplates?.length > 0 && !loading && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg" iconName="Plus" iconPosition="left">
                    Load More Templates
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 bg-card border border-border rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated with New Templates
              </h3>
              <p className="text-muted-foreground mb-6">
                Get notified when we release new premium templates and exclusive design resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button iconName="Send" iconPosition="right">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                    <Icon name="Layers" size={20} color="white" />
                  </div>
                  <span className="text-xl font-semibold text-foreground">WebCraft</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Your trusted marketplace for premium website templates and digital design resources. 
                  Empowering developers and businesses worldwide.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="icon">
                    <Icon name="Twitter" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Github" size={20} />
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Business</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">E-commerce</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Portfolio</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">License</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} WebCraft Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TemplateGallery;
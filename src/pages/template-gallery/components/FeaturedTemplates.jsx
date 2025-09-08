import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedTemplates = ({ templates, onAddToCart, cartItems }) => {
  const isInCart = (templateId) => {
    return cartItems?.some(item => item?.id === templateId);
  };

  const handleAddToCart = (template) => {
    onAddToCart(template);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Featured Templates</h2>
          <p className="text-muted-foreground">Hand-picked premium templates from top designers</p>
        </div>
        <Button variant="outline" iconName="ArrowRight" iconPosition="right">
          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.slice(0, 3)?.map((template) => (
          <div key={template?.id} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-modal transition-all duration-300">
            {/* Featured Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="flex items-center space-x-1 bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
                <Icon name="Star" size={14} className="fill-current" />
                <span>Featured</span>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={template?.image}
                alt={template?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Action Buttons */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-3">
                  <Link to="/template-details">
                    <Button variant="secondary" size="sm" iconName="Eye" iconPosition="left">
                      Preview
                    </Button>
                  </Link>
                  <Button 
                    variant="default" 
                    size="sm" 
                    iconName="ShoppingCart" 
                    iconPosition="left"
                    onClick={() => handleAddToCart(template)}
                    disabled={isInCart(template?.id)}
                  >
                    {isInCart(template?.id) ? 'Added' : 'Add to Cart'}
                  </Button>
                </div>
              </div>

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                    {template?.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span>{template?.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {template?.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">${template?.price}</span>
                    {template?.originalPrice && template?.originalPrice > template?.price && (
                      <span className="text-sm text-white/70 line-through">
                        ${template?.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-white/80">
                    <Icon name="Download" size={12} />
                    <span>{template?.downloads}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">500+</div>
          <div className="text-sm text-muted-foreground">Premium Templates</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success mb-1">50K+</div>
          <div className="text-sm text-muted-foreground">Happy Customers</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">4.9</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning mb-1">24/7</div>
          <div className="text-sm text-muted-foreground">Support</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTemplates;
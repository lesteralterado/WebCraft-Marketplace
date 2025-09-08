import React from 'react';
import TemplateCard from './TemplateCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';




const TemplateGrid = ({ templates, viewMode, onAddToCart, cartItems, loading }) => {
  const isInCart = (templateId) => {
    return cartItems?.some(item => item?.id === templateId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="flex space-x-2">
                <div className="h-3 bg-muted rounded w-12" />
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-14" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-6 bg-muted rounded w-16" />
                <div className="flex space-x-1">
                  <div className="h-8 w-8 bg-muted rounded" />
                  <div className="h-8 w-8 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {templates?.map((template) => (
          <div key={template?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <div className="w-full md:w-48 aspect-[4/3] md:aspect-square overflow-hidden rounded-lg bg-muted flex-shrink-0">
                <Image
                  src={template?.image}
                  alt={template?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                        {template?.category}
                      </span>
                      {template?.isFeatured && (
                        <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                      {template?.isNew && (
                        <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {template?.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {template?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template?.tags?.slice(0, 4)?.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span>{template?.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Download" size={14} />
                        <span>{template?.downloads}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price and Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">${template?.price}</div>
                      {template?.originalPrice && template?.originalPrice > template?.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${template?.originalPrice}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                        Preview
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        iconName="ShoppingCart" 
                        iconPosition="left"
                        onClick={() => onAddToCart(template)}
                        disabled={isInCart(template?.id)}
                      >
                        {isInCart(template?.id) ? 'Added' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates?.map((template) => (
        <TemplateCard
          key={template?.id}
          template={template}
          onAddToCart={onAddToCart}
          isInCart={isInCart(template?.id)}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
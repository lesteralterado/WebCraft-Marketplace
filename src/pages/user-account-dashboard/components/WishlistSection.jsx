import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WishlistSection = ({ wishlistItems }) => {
  const handleRemoveFromWishlist = (itemId) => {
    console.log(`Removing item ${itemId} from wishlist`);
    // Mock remove functionality
  };

  const handleQuickPurchase = (itemId) => {
    console.log(`Quick purchasing item ${itemId}`);
    // Mock purchase functionality
  };

  const formatPrice = (price) => {
    return `$${price?.toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">Wishlist</h2>
          <Button variant="outline" size="sm">
            View All ({wishlistItems?.length})
          </Button>
        </div>
      </div>
      {wishlistItems?.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Start adding templates you love to keep track of them
          </p>
          <Link to="/template-gallery">
            <Button variant="default" iconName="Plus" iconPosition="left">
              Browse Templates
            </Button>
          </Link>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems?.slice(0, 6)?.map((item) => (
              <div key={item?.id} className="group relative bg-background border border-border rounded-lg overflow-hidden hover:shadow-modal transition-smooth">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={item?.thumbnail}
                    alt={item?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
                  
                  {item?.priceChange && (
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item?.priceChange?.type === 'decrease' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
                      }`}>
                        <Icon 
                          name={item?.priceChange?.type === 'decrease' ? 'TrendingDown' : 'TrendingUp'} 
                          size={12} 
                          className="mr-1" 
                        />
                        {item?.priceChange?.type === 'decrease' ? '-' : '+'}{item?.priceChange?.amount}%
                      </span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(item?.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <Icon name="X" size={16} className="text-muted-foreground" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-card-foreground line-clamp-2 flex-1">
                      {item?.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-semibold text-card-foreground">
                        {formatPrice(item?.currentPrice)}
                      </span>
                      {item?.originalPrice !== item?.currentPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item?.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Star" size={12} className="mr-1 fill-current text-warning" />
                      {item?.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      fullWidth
                      iconName="ShoppingCart"
                      iconPosition="left"
                      onClick={() => handleQuickPurchase(item?.id)}
                    >
                      Quick Buy
                    </Button>
                    <Link to="/template-details">
                      <Button variant="outline" size="sm" iconName="Eye">
                        View
                      </Button>
                    </Link>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Added {new Date(item.addedDate)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {wishlistItems?.length > 6 && (
            <div className="text-center mt-6">
              <Button variant="outline">
                View All {wishlistItems?.length} Items
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
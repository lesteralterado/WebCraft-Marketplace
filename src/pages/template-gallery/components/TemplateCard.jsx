import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onAddToCart, isInCart }) => {
  const {
    id,
    title,
    category,
    price,
    originalPrice,
    image,
    rating,
    downloads,
    tags,
    isFeatured,
    isNew,
    discount
  } = template;

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onAddToCart(template);
  };

  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-modal transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
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
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? 'Added' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {isFeatured && (
            <span className="bg-warning text-warning-foreground text-xs font-medium px-2 py-1 rounded">
              Featured
            </span>
          )}
          {isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {discount && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all duration-200">
          <Icon name="Heart" size={16} className="text-muted-foreground hover:text-error" />
        </button>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
            {category}
          </span>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Star" size={12} className="text-warning fill-current" />
            <span>{rating}</span>
            <span>({downloads})</span>
          </div>
        </div>

        {/* Title */}
        <Link to="/template-details">
          <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
          {tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">${price}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="Download" size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Icon name="Share2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
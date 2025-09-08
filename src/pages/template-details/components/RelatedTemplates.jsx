import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedTemplates = ({ currentTemplate }) => {
  const relatedTemplates = [
    {
      id: 2,
      name: "Corporate Business Pro",
      category: "Business",
      price: 79,
      originalPrice: 99,
      rating: 4.7,
      reviewCount: 156,
      previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      tags: ["React", "Tailwind", "Corporate"],
      isNew: false,
      isBestseller: true
    },
    {
      id: 3,
      name: "Creative Portfolio Hub",
      category: "Portfolio",
      price: 65,
      originalPrice: null,
      rating: 4.9,
      reviewCount: 203,
      previewImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      tags: ["React", "Framer Motion", "Creative"],
      isNew: true,
      isBestseller: false
    },
    {
      id: 4,
      name: "E-commerce Starter Kit",
      category: "E-commerce",
      price: 129,
      originalPrice: 159,
      rating: 4.6,
      reviewCount: 89,
      previewImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      tags: ["React", "Redux", "E-commerce"],
      isNew: false,
      isBestseller: false
    },
    {
      id: 5,
      name: "SaaS Landing Master",
      category: "SaaS",
      price: 95,
      originalPrice: 120,
      rating: 4.8,
      reviewCount: 134,
      previewImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
      tags: ["React", "Tailwind", "SaaS"],
      isNew: false,
      isBestseller: true
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={12}
            className={star <= Math.round(rating) ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Related Templates</h2>
        <Link to="/template-gallery">
          <Button variant="outline" size="sm">
            View All Templates
            <Icon name="ArrowRight" size={14} className="ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTemplates?.map((template) => (
          <div key={template?.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Template Preview */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={template?.previewImage}
                alt={template?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {template?.isNew && (
                  <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full font-medium">
                    New
                  </span>
                )}
                {template?.isBestseller && (
                  <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full font-medium">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col space-y-2">
                  <Button variant="secondary" size="icon" className="w-8 h-8">
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button variant="secondary" size="icon" className="w-8 h-8">
                    <Icon name="Heart" size={14} />
                  </Button>
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full">
                <div className="flex items-center space-x-2">
                  {template?.originalPrice && (
                    <span className="text-xs line-through opacity-70">
                      ${template?.originalPrice}
                    </span>
                  )}
                  <span className="text-sm font-bold">${template?.price}</span>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {template?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{template?.category}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                {renderStars(template?.rating)}
                <span className="text-sm font-medium text-foreground">{template?.rating}</span>
                <span className="text-xs text-muted-foreground">({template?.reviewCount})</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template?.tags?.slice(0, 2)?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {template?.tags?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{template?.tags?.length - 2} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Link to="/template-details" className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                </Link>
                <Button variant="default" size="sm" className="px-3">
                  <Icon name="ShoppingCart" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bundle Offer */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Bundle Deal: Save 40% on Related Templates
            </h3>
            <p className="text-muted-foreground mb-4">
              Get {currentTemplate?.name} + 3 related templates for just $199 (Regular price: $332)
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-primary">$199</span>
              <span className="text-lg text-muted-foreground line-through">$332</span>
              <span className="bg-success text-success-foreground text-sm px-2 py-1 rounded-full">
                Save $133
              </span>
            </div>
          </div>
          <div className="text-right">
            <Button variant="default" size="lg">
              <Icon name="Package" size={16} className="mr-2" />
              Get Bundle
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Limited time offer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTemplates;
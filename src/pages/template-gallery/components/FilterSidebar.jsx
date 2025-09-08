import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'business', label: 'Business', count: 45 },
    { id: 'ecommerce', label: 'E-commerce', count: 32 },
    { id: 'portfolio', label: 'Portfolio', count: 28 },
    { id: 'blog', label: 'Blog', count: 24 },
    { id: 'landing', label: 'Landing Page', count: 38 },
    { id: 'corporate', label: 'Corporate', count: 19 },
    { id: 'creative', label: 'Creative', count: 22 },
    { id: 'restaurant', label: 'Restaurant', count: 15 }
  ];

  const technologies = [
    { id: 'react', label: 'React', count: 67 },
    { id: 'vue', label: 'Vue.js', count: 34 },
    { id: 'angular', label: 'Angular', count: 28 },
    { id: 'html', label: 'HTML/CSS', count: 89 },
    { id: 'wordpress', label: 'WordPress', count: 45 },
    { id: 'shopify', label: 'Shopify', count: 23 }
  ];

  const features = [
    { id: 'responsive', label: 'Responsive Design', count: 156 },
    { id: 'dark-mode', label: 'Dark Mode', count: 78 },
    { id: 'animations', label: 'Animations', count: 45 },
    { id: 'seo', label: 'SEO Optimized', count: 134 },
    { id: 'accessibility', label: 'Accessibility', count: 67 },
    { id: 'rtl', label: 'RTL Support', count: 23 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleTechnologyChange = (techId, checked) => {
    const updatedTechnologies = checked
      ? [...(filters?.technologies || []), techId]
      : (filters?.technologies || [])?.filter(id => id !== techId);
    
    onFilterChange({ ...filters, technologies: updatedTechnologies });
  };

  const handleFeatureChange = (featureId, checked) => {
    const updatedFeatures = checked
      ? [...(filters?.features || []), featureId]
      : (filters?.features || [])?.filter(id => id !== featureId);
    
    onFilterChange({ ...filters, features: updatedFeatures });
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 500]);
    setSearchTerm('');
    onFilterChange({
      categories: [],
      technologies: [],
      features: [],
      priceRange: [0, 500],
      search: ''
    });
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e?.target?.value);
            onFilterChange({ ...filters, search: e?.target?.value });
          }}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange?.[0]}</span>
            <span>${priceRange?.[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange?.[1]}
              onChange={(e) => handlePriceChange([priceRange?.[0], parseInt(e?.target?.value)])}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange?.[0]}
              onChange={(e) => handlePriceChange([parseInt(e?.target?.value) || 0, priceRange?.[1]])}
              className="w-20 text-sm"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange?.[1]}
              onChange={(e) => handlePriceChange([priceRange?.[0], parseInt(e?.target?.value) || 500])}
              className="w-20 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Categories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.label}
                checked={(filters?.categories || [])?.includes(category?.id)}
                onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground">({category?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Technologies</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {technologies?.map((tech) => (
            <div key={tech?.id} className="flex items-center justify-between">
              <Checkbox
                label={tech?.label}
                checked={(filters?.technologies || [])?.includes(tech?.id)}
                onChange={(e) => handleTechnologyChange(tech?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground">({tech?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Features</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {features?.map((feature) => (
            <div key={feature?.id} className="flex items-center justify-between">
              <Checkbox
                label={feature?.label}
                checked={(filters?.features || [])?.includes(feature?.id)}
                onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
              />
              <span className="text-xs text-muted-foreground">({feature?.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="relative bg-background w-80 max-w-sm h-full overflow-y-auto p-6">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
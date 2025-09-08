import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, resultsCount, onFilterToggle }) => {
  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'downloads', label: 'Most Downloaded', icon: 'Download' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
      {/* Results Count and Filter Toggle */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          iconName="Filter"
          iconPosition="left"
          onClick={onFilterToggle}
          className="lg:hidden"
        >
          Filters
        </Button>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{resultsCount}</span> templates found
        </div>
      </div>
      {/* Sort and View Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e?.target?.value)}
            className="appearance-none bg-background border border-border rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDown"
            size={16}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center border border-border rounded-md overflow-hidden">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? 'default' : 'ghost'}
              size="sm"
              iconName={mode?.icon}
              onClick={() => onViewModeChange(mode?.value)}
              className="rounded-none border-0"
            />
          ))}
        </div>

        {/* Quick Sort Buttons - Mobile */}
        <div className="flex sm:hidden items-center space-x-1">
          <Button
            variant={sortBy === 'popular' ? 'default' : 'ghost'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => onSortChange('popular')}
          />
          <Button
            variant={sortBy === 'newest' ? 'default' : 'ghost'}
            size="sm"
            iconName="Clock"
            onClick={() => onSortChange('newest')}
          />
          <Button
            variant={sortBy === 'price-low' ? 'default' : 'ghost'}
            size="sm"
            iconName="DollarSign"
            onClick={() => onSortChange('price-low')}
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;
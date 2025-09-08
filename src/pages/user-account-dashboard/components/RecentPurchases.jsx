import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPurchases = ({ purchases }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">Recent Purchases</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {purchases?.map((purchase) => (
          <div key={purchase?.id} className="p-6 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={purchase?.thumbnail}
                  alt={purchase?.templateName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-medium text-card-foreground truncate">
                      {purchase?.templateName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Purchased on {formatDate(purchase?.purchaseDate)}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm font-medium text-card-foreground">
                        ${purchase?.price}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase?.status)}`}>
                        {purchase?.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        License: {purchase?.license}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {purchase?.status === 'completed' && (
                      <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                        Download
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" iconName="Eye">
                      View
                    </Button>
                  </div>
                </div>
                
                {purchase?.downloadCount && (
                  <div className="mt-3 flex items-center text-xs text-muted-foreground">
                    <Icon name="Download" size={12} className="mr-1" />
                    Downloaded {purchase?.downloadCount} times
                    {purchase?.downloadLimit && (
                      <span className="ml-2">
                        (Limit: {purchase?.downloadLimit})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPurchases;
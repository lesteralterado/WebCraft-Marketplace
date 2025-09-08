import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      title: 'Browse Templates',
      description: 'Explore our latest template collection',
      icon: 'Grid3X3',
      link: '/template-gallery',
      variant: 'default'
    },
    {
      title: 'Custom Request',
      description: 'Request a custom website design',
      icon: 'Wrench',
      link: '/custom-request-form',
      variant: 'outline'
    },
    {
      title: 'Download Center',
      description: 'Access all your purchased templates',
      icon: 'Download',
      action: 'downloads',
      variant: 'outline'
    },
    {
      title: 'Support',
      description: 'Get help with your purchases',
      icon: 'HelpCircle',
      action: 'support',
      variant: 'outline'
    }
  ];

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'downloads':
        // Scroll to downloads section or open modal
        console.log('Opening downloads');
        break;
      case 'support':
        // Open support modal or navigate to support
        console.log('Opening support');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-card-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <div key={index} className="group">
            {action?.link ? (
              <Link to={action?.link} className="block">
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                      {action?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action?.action)}
                className="w-full text-left"
              >
                <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-smooth">
                      {action?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </div>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
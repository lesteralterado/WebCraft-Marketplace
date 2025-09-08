import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSummary = ({ userStats }) => {
  const summaryCards = [
    {
      title: 'Total Purchases',
      value: userStats?.totalPurchases,
      icon: 'ShoppingBag',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Available Downloads',
      value: userStats?.availableDownloads,
      icon: 'Download',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Active Projects',
      value: userStats?.activeProjects,
      icon: 'Wrench',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Account Standing',
      value: userStats?.accountStanding,
      icon: 'Shield',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryCards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-modal transition-smooth">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{card?.title}</p>
              <p className="text-2xl font-semibold text-card-foreground">{card?.value}</p>
            </div>
            <div className={`${card?.bgColor} ${card?.color} p-3 rounded-lg`}>
              <Icon name={card?.icon} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountSummary;
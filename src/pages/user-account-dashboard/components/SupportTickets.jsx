import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportTickets = ({ tickets }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-primary bg-primary/10';
      case 'in-progress':
        return 'text-warning bg-warning/10';
      case 'resolved':
        return 'text-success bg-success/10';
      case 'closed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateTicket = () => {
    console.log('Creating new support ticket');
    // Mock create ticket functionality
  };

  const handleViewTicket = (ticketId) => {
    setSelectedTicket(ticketId);
    console.log(`Viewing ticket ${ticketId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">Support Tickets</h2>
          <Button 
            variant="default" 
            size="sm" 
            iconName="Plus" 
            iconPosition="left"
            onClick={handleCreateTicket}
          >
            New Ticket
          </Button>
        </div>
      </div>
      {tickets?.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="HelpCircle" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">No support tickets</h3>
          <p className="text-muted-foreground mb-6">
            You haven't created any support tickets yet
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left" onClick={handleCreateTicket}>
            Create Your First Ticket
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {tickets?.map((ticket) => (
            <div key={ticket?.id} className="p-6 hover:bg-muted/50 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-base font-medium text-card-foreground">
                      #{ticket?.ticketNumber}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket?.status)}`}>
                      {ticket?.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket?.priority)}`}>
                      {ticket?.priority} priority
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-card-foreground mb-2">
                    {ticket?.subject}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {ticket?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="Calendar" size={12} className="mr-1" />
                      Created {formatDate(ticket?.createdDate)}
                    </div>
                    <div className="flex items-center">
                      <Icon name="MessageSquare" size={12} className="mr-1" />
                      {ticket?.messageCount} messages
                    </div>
                    {ticket?.assignedTo && (
                      <div className="flex items-center">
                        <Icon name="User" size={12} className="mr-1" />
                        Assigned to {ticket?.assignedTo}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => handleViewTicket(ticket?.id)}
                  >
                    View
                  </Button>
                  {ticket?.status === 'resolved' && (
                    <Button variant="ghost" size="sm" iconName="Check">
                      Close
                    </Button>
                  )}
                </div>
              </div>
              
              {ticket?.lastMessage && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-card-foreground">
                      {ticket?.lastMessage?.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(ticket?.lastMessage?.date)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ticket?.lastMessage?.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
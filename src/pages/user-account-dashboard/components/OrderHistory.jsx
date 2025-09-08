import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const OrderHistory = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      case 'refunded':
        return 'text-muted-foreground bg-muted';
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

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for order ${orderId}`);
    // Mock invoice download
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">Order History</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {orders?.map((order) => (
          <div key={order?.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-base font-medium text-card-foreground">
                    Order #{order?.orderNumber}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(order?.orderDate)}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                  {order?.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-base font-semibold text-card-foreground">
                    ${order?.total}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order?.itemCount} item{order?.itemCount !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    onClick={() => handleDownloadInvoice(order?.id)}
                  >
                    Invoice
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"}
                    onClick={() => toggleOrderExpansion(order?.id)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>

            {expandedOrder === order?.id && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {order?.items?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{item?.name}</p>
                            <p className="text-xs text-muted-foreground">License: {item?.license}</p>
                          </div>
                          <p className="text-sm font-medium text-card-foreground">${item?.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground mb-3">Payment Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span className="text-card-foreground">{order?.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <span className="text-card-foreground font-mono text-xs">{order?.transactionId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="text-card-foreground">${order?.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax:</span>
                        <span className="text-card-foreground">${order?.tax}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium pt-2 border-t border-border">
                        <span className="text-card-foreground">Total:</span>
                        <span className="text-card-foreground">${order?.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
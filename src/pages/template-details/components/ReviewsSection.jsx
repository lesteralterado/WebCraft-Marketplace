import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ template }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        verified: true
      },
      rating: 5,
      date: "2024-08-15",
      title: "Excellent template with great support",
      content: `This template exceeded my expectations! The code is clean, well-documented, and easy to customize. I was able to launch my client's website in just 2 days. The responsive design works flawlessly across all devices.`,
      helpful: 12,
      verified_purchase: true
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        verified: true
      },
      rating: 4,
      date: "2024-08-10",
      title: "Good value for money",
      content: `Solid template with modern design. Setup was straightforward and documentation is comprehensive. Only minor issue was with some color customization, but support helped resolve it quickly.`,
      helpful: 8,
      verified_purchase: true
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        verified: false
      },
      rating: 5,
      date: "2024-08-05",
      title: "Perfect for my agency",
      content: `We've used this template for multiple client projects. The flexibility and customization options are outstanding. Clients love the modern look and smooth animations.`,
      helpful: 15,
      verified_purchase: true
    },
    {
      id: 4,
      user: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        verified: true
      },
      rating: 3,
      date: "2024-07-28",
      title: "Decent template but needs improvements",
      content: `The design is nice but I encountered some issues with the contact form functionality. Also, the loading speed could be better optimized. Support was responsive though.`,
      helpful: 3,
      verified_purchase: true
    }
  ];

  const ratingCounts = {
    5: reviews?.filter(r => r?.rating === 5)?.length,
    4: reviews?.filter(r => r?.rating === 4)?.length,
    3: reviews?.filter(r => r?.rating === 3)?.length,
    2: reviews?.filter(r => r?.rating === 2)?.length,
    1: reviews?.filter(r => r?.rating === 1)?.length
  };

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews?.filter(review => review?.rating === parseInt(filterRating));

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b?.rating - a?.rating;
    if (sortBy === 'lowest') return a?.rating - b?.rating;
    if (sortBy === 'helpful') return b?.helpful - a?.helpful;
    return 0;
  });

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={star <= rating ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
      {/* Rating Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{template?.rating}</div>
            {renderStars(Math.round(template?.rating), 20)}
            <div className="text-sm text-muted-foreground mt-2">
              Based on {template?.reviewCount} reviews
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground w-8">{rating}</span>
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{
                      width: `${(ratingCounts?.[rating] / reviews?.length) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingCounts?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Filter by rating:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.user?.avatar}
                alt={review?.user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{review?.user?.name}</h4>
                    {review?.user?.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary" />
                    )}
                    {review?.verified_purchase && (
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  {renderStars(review?.rating)}
                  <h5 className="font-medium text-foreground">{review?.title}</h5>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{review?.content}</p>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Icon name="ThumbsUp" size={14} className="mr-2" />
                    Helpful ({review?.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Icon name="Flag" size={14} className="mr-2" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div className="text-center">
        <Button variant="outline">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react';
import { Review } from '@/types';

interface ProductReviewsProps {
  reviews: Review[];
  productRating: number;
}

export function ProductReviews({ reviews, productRating }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(rating =>
    reviews.filter(review => review.rating === rating).length
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <span className="font-heading text-4xl font-medium text-foreground">
              {productRating.toFixed(1)}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(productRating)
                      ? 'fill-current text-terra'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center space-x-3">
              <span className="font-body text-sm text-muted-foreground w-6">
                {rating}
              </span>
              <Star className="h-3 w-3 fill-current text-terra" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-terra transition-all duration-300"
                  style={{
                    width: reviews.length > 0 ? `${(ratingCounts[index] / reviews.length) * 100}%` : '0%'
                  }}
                />
              </div>
              <span className="font-body text-xs text-muted-foreground w-8">
                ({ratingCounts[index]})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sage/20">
        <Button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-sage hover:bg-sage/90 text-soft-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Write a Review
        </Button>

        <div className="flex items-center space-x-3">
          <Label htmlFor="sort-reviews" className="font-body text-sm text-muted-foreground">
            Sort by:
          </Label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-32 border-sage/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest">Highest</SelectItem>
              <SelectItem value="lowest">Lowest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card className="bg-soft-white/30 border-sage/20">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-heading text-lg font-medium text-foreground">
              Write Your Review
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewer-name" className="font-body text-sm font-medium text-foreground">
                  Your Name
                </Label>
                <Input
                  id="reviewer-name"
                  placeholder="Enter your name"
                  className="mt-1 border-sage/20 focus:ring-sage"
                />
              </div>

              <div>
                <Label htmlFor="review-rating" className="font-body text-sm font-medium text-foreground">
                  Rating
                </Label>
                <Select>
                  <SelectTrigger className="mt-1 border-sage/20">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="review-title" className="font-body text-sm font-medium text-foreground">
                Review Title
              </Label>
              <Input
                id="review-title"
                placeholder="Summarize your review"
                className="mt-1 border-sage/20 focus:ring-sage"
              />
            </div>

            <div>
              <Label htmlFor="review-content" className="font-body text-sm font-medium text-foreground">
                Your Review
              </Label>
              <Textarea
                id="review-content"
                placeholder="Tell us about your experience with this product..."
                rows={4}
                className="mt-1 border-sage/20 focus:ring-sage"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Button className="bg-sage hover:bg-sage/90 text-soft-white">
                Submit Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWriteReview(false)}
                className="border-sage text-sage hover:bg-sage/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-lg font-medium text-foreground mb-2">
              No reviews yet
            </h3>
            <p className="font-body text-muted-foreground mb-4">
              Be the first to share your experience with this product
            </p>
            <Button
              onClick={() => setShowWriteReview(true)}
              className="bg-sage hover:bg-sage/90 text-soft-white"
            >
              Write the First Review
            </Button>
          </div>
        ) : (
          sortedReviews.map((review) => (
            <Card key={review.id} className="bg-background/50 border-sage/20">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-sage" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-body font-medium text-foreground">
                          {review.userName}
                        </h4>
                        {review.verified && (
                          <Badge className="bg-sage/20 text-sage font-body text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <p className="font-body text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-current text-terra'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-heading text-lg font-medium text-foreground">
                    {review.title}
                  </h5>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                </div>

                {review.helpful > 0 && (
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-sage/10">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-sage">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { Star, Quote, Calendar } from 'lucide-react';
import { reviews } from '../mock';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

const Reviews = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <Star className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Recensioni
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Scopri cosa dicono i nostri membri sulla loro esperienza su Arsys
          </p>

          {/* Average Rating */}
          <Card className="max-w-md mx-auto bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <p className="text-gray-600 text-sm">
                Media di {reviews.length} recensioni
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card 
                key={review.id}
                className="border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Quote icon */}
                  <div className="mb-4">
                    <Quote className="w-10 h-10 text-teal-200" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white font-bold">
                          {review.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.author}
                        </p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 shadow-2xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Unisciti alla nostra community!
              </h2>
              <p className="text-xl text-teal-50 mb-6">
                Vivi anche tu un'esperienza fantastica su Arsys
              </p>
              <p className="text-sm text-teal-100 italic">
                Nota: Le recensioni vengono gestite e verificate dal nostro staff per garantire autenticità
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Reviews;

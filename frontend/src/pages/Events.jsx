import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { events } from '../mock';
import { Card, CardContent } from '../components/ui/card';

const Events = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Eventi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scopri i prossimi eventi organizzati dalla community di Arsys
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-100 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-6 animate-pulse">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {events.message}
                  </h2>
                  <p className="text-xl text-teal-50">
                    {events.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12 bg-gradient-to-b from-white to-teal-50/30">
                <div className="space-y-6">
                  {/* Event Types */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Cosa aspettarsi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: Calendar,
                          title: "Serate Film & Anime",
                          description: "Guarda film e anime insieme alla community"
                        },
                        {
                          icon: Sparkles,
                          title: "Gaming Sessions",
                          description: "Gioca con altri membri in sessioni organizzate"
                        },
                        {
                          icon: Clock,
                          title: "Eventi Speciali",
                          description: "Competizioni, giveaway e sorprese esclusive"
                        },
                        {
                          icon: Sparkles,
                          title: "Community Events",
                          description: "Eventi interattivi con premi e ricompense"
                        }
                      ].map((eventType, index) => {
                        const Icon = eventType.icon;
                        return (
                          <div 
                            key={index}
                            className="p-6 bg-white rounded-lg border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {eventType.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {eventType.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stay Tuned */}
                  <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 mt-8">
                    <CardContent className="p-6 text-center">
                      <Sparkles className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Resta Sintonizzato!
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Entra nel server per ricevere notifiche sui prossimi eventi e non perdere 
                        nessuna occasione di divertimento con la community!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Vantaggi degli Eventi
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Premi Esclusivi",
                description: "Vinci premi e ricompense partecipando agli eventi"
              },
              {
                title: "Nuove Amicizie",
                description: "Conosci meglio gli altri membri della community"
              },
              {
                title: "Esperienza Unica",
                description: "Vivi momenti indimenticabili insieme a noi"
              }
            ].map((benefit, index) => (
              <Card 
                key={index}
                className="border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;

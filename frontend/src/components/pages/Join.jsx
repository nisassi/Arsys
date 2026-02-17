import React from 'react';
import { ExternalLink, ArrowRight, Users, Shield, Heart, Sparkles } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { serverData } from '../mock';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Join = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Unisciti a Noi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entra nel server e parla con noi! Ti aspettiamo nella community di Arsys
          </p>
        </div>
      </section>

      {/* Main Join Card */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Gradient Header */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Pronto per l'avventura?
                  </h2>
                  <p className="text-xl text-teal-50 mb-8">
                    Un solo click ti separa da una community fantastica!
                  </p>
                  <a
                    href={serverData.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      size="lg"
                      className="bg-white text-teal-600 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Entra nel Server Discord
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Steps */}
              <div className="p-8 sm:p-12 bg-gradient-to-b from-white to-teal-50/30">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Come entrare
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Clicca sul link d'invito",
                      description: "Usa il bottone qui sopra per aprire l'invito al server Discord"
                    },
                    {
                      step: 2,
                      title: "Accetta l'invito",
                      description: "Verrai reindirizzato a Discord, accetta l'invito per unirti al server"
                    },
                    {
                      step: 3,
                      title: "Leggi le regole",
                      description: "Una volta dentro, leggi il regolamento per conoscere le linee guida"
                    },
                    {
                      step: 4,
                      title: "Inizia a chattare!",
                      description: "Presentati e inizia a fare amicizia con gli altri membri"
                    }
                  ].map((item) => (
                    <div 
                      key={item.step}
                      className="flex items-start space-x-4 p-6 bg-white rounded-lg border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {item.step}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Join */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Perché unirti ad Arsys?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Community Attiva",
                description: "Oltre 1600 membri pronti a chiacchierare"
              },
              {
                icon: Shield,
                title: "Ambiente Sicuro",
                description: "Moderazione attiva e regole chiare"
              },
              {
                icon: Heart,
                title: "Atmosfera Chill",
                description: "Zero drama, solo vibes positive"
              },
              {
                icon: Sparkles,
                title: "Eventi & Fun",
                description: "Attività organizzate e momenti speciali"
              }
            ].map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card 
                  key={index}
                  className="border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {reason.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seguici anche sui social!
              </h3>
              <p className="text-gray-600 mb-6">
                Resta aggiornato sulle ultime novità di Arsys
              </p>
              <div className="flex items-center justify-center space-x-4">
                <a
                  href={serverData.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button 
                    variant="outline"
                    className="border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white px-6 py-6 rounded-xl transition-all duration-300 transform group-hover:scale-105"
                  >
                    <FaTiktok className="w-5 h-5 mr-2" />
                    TikTok
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Join;

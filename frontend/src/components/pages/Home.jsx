import React from 'react';
import { ArrowRight, Users, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serverData, offerings } from '../mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Community Attiva
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {serverData.name}
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {serverData.tagline}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
              <Users className="w-5 h-5 text-teal-600" />
              <span className="text-lg font-semibold text-gray-900">
                {serverData.realMembers.toLocaleString()}
              </span>
              <span className="text-gray-500">membri</span>
            </div>
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-gray-900">
                {serverData.onlineMembers}
              </span>
              <span className="text-gray-500">online</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={serverData.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Entra nel Server
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                Scopri di più
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perché scegliere Arsys?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una community che mette al centro i suoi membri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serverData.features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    {index === 0 && <TrendingUp className="w-6 h-6 text-white" />}
                    {index === 1 && <Shield className="w-6 h-6 text-white" />}
                    {index === 2 && <Sparkles className="w-6 h-6 text-white" />}
                    {index === 3 && <Users className="w-6 h-6 text-white" />}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {feature}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cosa offriamo?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 mt-2 bg-teal-500 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors duration-300">
                      {offering.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {offering.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Pronto a unirti?
                </h2>
                <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
                  Entra nella community e scopri un ambiente accogliente dove fare nuove amicizie!
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
                    Unisciti ora
                    <ArrowRight className="w-5 h-5 ml-2" />
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

export default Home;

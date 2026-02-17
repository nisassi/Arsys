import React from 'react';
import { Heart, Target, Users, Sparkles } from 'lucide-react';
import { aboutText, serverData } from '../mock';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const parseMarkdown = (text) => {
    return text.split('\n\n').map((paragraph, index) => {
      const boldText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-teal-600 font-semibold">$1</strong>');
      return (
        <p 
          key={index} 
          className="text-gray-700 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: boldText }}
        />
      );
    });
  };

  const values = [
    {
      icon: Heart,
      title: "Rispetto",
      description: "Valorizziamo ogni membro e promuoviamo un ambiente inclusivo e rispettoso per tutti."
    },
    {
      icon: Sparkles,
      title: "Divertimento",
      description: "Creiamo esperienze coinvolgenti attraverso eventi, giochi e momenti di condivisione."
    },
    {
      icon: Users,
      title: "Community",
      description: "Costruiamo relazioni autentiche e durature tra i membri del server."
    },
    {
      icon: Target,
      title: "Crescita",
      description: "Evolviamo costantemente per offrire la migliore esperienza possibile."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Chi Siamo
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mb-8"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-100 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              <div className="prose prose-lg max-w-none">
                {parseMarkdown(aboutText)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-gradient-to-b from-white to-teal-50/30 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            La Nostra Missione
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Creare uno spazio digitale dove ogni persona si senta <span className="text-teal-600 font-semibold">benvenuta</span>, 
            possa <span className="text-teal-600 font-semibold">esprimersi liberamente</span> e costruire 
            <span className="text-teal-600 font-semibold"> connessioni autentiche</span> con persone che condividono 
            gli stessi interessi e valori.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              I Nostri Valori
            </h2>
            <p className="text-lg text-gray-600">
              I principi che guidano la nostra community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {serverData.realMembers.toLocaleString()}
                  </div>
                  <div className="text-teal-100 font-medium">
                    Membri Attivi
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {serverData.onlineMembers}+
                  </div>
                  <div className="text-teal-100 font-medium">
                    Online Ora
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    24/7
                  </div>
                  <div className="text-teal-100 font-medium">
                    Staff Disponibile
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;

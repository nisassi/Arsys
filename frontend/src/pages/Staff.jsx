import React from 'react';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { rules, consequences } from '../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Staff = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Regolamento del Server
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi chiediamo cortesemente di leggere il regolamento del server per mantenere 
            un ambiente accogliente e rispettoso per tutti
          </p>
        </div>
      </section>

      {/* Rules List */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {rules.map((rule, index) => (
              <Card 
                key={rule.number}
                className="border-l-4 border-l-teal-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {rule.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <CardTitle className="text-2xl text-gray-900">
                  Conseguenze
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Non rispettando il regolamento verrai prima:
              </p>
              <div className="space-y-3">
                {consequences.map((consequence, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-orange-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-900 font-medium text-lg">
                      {consequence}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Positive Note */}
          <Card className="mt-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Rispetta le regole e goditi la community!
                  </h3>
                  <p className="text-gray-600">
                    Seguendo queste semplici regole, contribuirai a mantenere Arsys un luogo 
                    accogliente e divertente per tutti. Lo staff è sempre disponibile per aiutarti!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Staff;

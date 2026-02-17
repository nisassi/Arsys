import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { faqs } from '../mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Card, CardContent } from '../components/ui/card';

const FAQ = () => {
  const parseAnswer = (text) => {
    const boldText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-teal-600 font-semibold">$1</strong>');
    return <span dangerouslySetInnerHTML={{ __html: boldText }} />;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Domande Frequenti
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trova le risposte alle domande più comuni su Arsys
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-teal-100 shadow-lg overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-gray-200 rounded-lg px-6 hover:border-teal-300 transition-colors duration-300"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <div className="flex items-start space-x-4 pr-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-900 font-semibold text-base sm:text-lg leading-relaxed">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4 pl-12">
                      <p className="text-gray-600 leading-relaxed">
                        {parseAnswer(faq.answer)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Non hai trovato la risposta?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nessun problema! Il nostro staff è sempre disponibile per rispondere 
                a tutte le tue domande. Entra nel server e contattaci direttamente.
              </p>
              <div className="inline-flex items-center space-x-2 text-teal-600 font-medium">
                <HelpCircle className="w-5 h-5" />
                <span>Lo staff è pronto ad aiutarti!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

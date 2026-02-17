import React from 'react';
import { Users, Circle } from 'lucide-react';
import { staffMembers } from '../mock';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

const Staff = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Assente';
      case 'dnd':
        return 'Non Disturbare';
      case 'offline':
        return 'Offline';
      default:
        return 'Sconosciuto';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Moderator':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Helper':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Il Nostro Staff
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conosci il team dedicato che mantiene Arsys un luogo accogliente e sicuro per tutti
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((member) => (
              <Card 
                key={member.id}
                className="border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className="h-24 bg-gradient-to-r from-teal-400 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getRoleBadgeColor(member.role)} border`}>
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center -mt-12 mb-4 relative z-10">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={member.avatar} alt={member.username} />
                        <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-500 text-white text-2xl font-bold">
                          {member.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Status indicator */}
                      <div className="absolute bottom-1 right-1">
                        <div className={`w-6 h-6 ${getStatusColor(member.status)} rounded-full border-4 border-white shadow-md`}>
                          {member.status === 'online' && (
                            <div className="w-full h-full rounded-full animate-ping opacity-75"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                      {member.username}
                    </h3>
                    
                    {/* Status */}
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <Circle className={`w-3 h-3 ${getStatusColor(member.status)} rounded-full`} />
                      <span className="text-sm text-gray-600 font-medium">
                        {getStatusLabel(member.status)}
                      </span>
                    </div>

                    {/* Discord ID */}
                    <div className="bg-gray-50 rounded-lg p-3 mt-4">
                      <p className="text-xs text-gray-500 mb-1">Discord ID</p>
                      <p className="text-sm text-gray-700 font-mono break-all">
                        {member.id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hai bisogno di aiuto?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Il nostro staff è sempre disponibile per assisterti. Non esitare a contattarci 
                per qualsiasi domanda o problema. Siamo qui per rendere la tua esperienza su Arsys 
                la migliore possibile!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span>Assente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Non Disturbare</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className="w-3 h-3 bg-gray-400 rounded-full" />
                  <span>Offline</span>
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

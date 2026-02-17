import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Mail } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { serverData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'Chi Siamo' },
    { path: '/rules', label: 'Regole' },
    { path: '/staff', label: 'Staff' },
    { path: '/faq', label: 'FAQ' }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {serverData.name}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {serverData.tagline}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="w-4 h-4 text-teal-500" />
              <span>{serverData.totalMembers.toLocaleString()} membri</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguici</h3>
            <div className="space-y-3">
              <a
                href={serverData.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-teal-50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <FaTiktok className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">TikTok</span>
              </a>
              <a
                href={serverData.discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-600 hover:text-teal-600 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-teal-50 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Discord Server</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} {serverData.name}. Tutti i diritti riservati.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>Fatto con</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>per la community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

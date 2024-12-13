import React from 'react';
import { Facebook, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-[#1e90ff] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
              />
              <button className="bg-[#1e90ff] px-4 py-2 rounded-r-lg hover:bg-[#1e90ff]/90 transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="hover:text-[#1e90ff] transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#1e90ff] transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-[#1e90ff] transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TravelMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
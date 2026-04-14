'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppBubbleProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppBubble({ 
  phoneNumber, 
  message = 'Hi! I would like to know more about your safari packages.' 
}: WhatsAppBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    // Remove any non-numeric characters except the leading + for WhatsApp URL
    const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    const whatsappURL = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
        <button
          onClick={handleClick}
          className="relative group"
          aria-label="Chat on WhatsApp"
        >
          {/* Bubble Background */}
          <div className="absolute -inset-2 bg-linear-to-r from-green-400 to-green-600 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-lg transition duration-300 animate-pulse" />
          
          {/* Main Button */}
          <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center">
            <MessageCircle size={28} />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us on WhatsApp
          </div>
        </button>
      </div>

      {/* Additional Quick Access Buttons (Mobile) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-xl p-4 max-w-xs animate-slide-in-up md:hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Quick Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Click below to message us on WhatsApp or call directly.
          </p>
          <div className="space-y-2">
            <button
              onClick={handleClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              Chat on WhatsApp
            </button>
            <a
              href={`tel:${phoneNumber}`}
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}

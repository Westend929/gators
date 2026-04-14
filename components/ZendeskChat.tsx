'use client';

import { useEffect } from 'react';

export default function ZendeskChat() {
  useEffect(() => {
    // Initialize Zendesk Web Widget
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ZENDESK_KEY) {
      console.log('Loading Zendesk with key:', process.env.NEXT_PUBLIC_ZENDESK_KEY);

      window.zESettings = {
        webWidget: {
          position: { horizontal: 'left', vertical: 'bottom' },
          launcher: {
            label: 'Chat with us',
            chatLabel: 'Chat',
            mobile: {
              labelVisible: false,
            },
          },
        },
      };

      // Load Zendesk script
      const script = document.createElement('script');
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${process.env.NEXT_PUBLIC_ZENDESK_KEY}`;
      script.async = true;

      script.onload = () => {
        console.log('Zendesk script loaded successfully');

        // Update position after load
        if (window.zE) {
          window.zE('webWidget', 'updateSettings', {
            webWidget: {
              position: { horizontal: 'left', vertical: 'bottom' },
            },
          });
          console.log('Zendesk widget positioned on left side');
        }
      };

      script.onerror = () => {
        console.error('Failed to load Zendesk script - check your Zendesk key and admin settings');
        console.error('Zendesk key used:', process.env.NEXT_PUBLIC_ZENDESK_KEY);
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup if needed
        if (window.zE) {
          window.zE('webWidget', 'destroy');
        }
      };
    } else {
      console.log('Zendesk key not found, skipping load');
    }
  }, []);

  return null;
}

// Extend window type to include Zendesk (FIXED - no any types)
declare global {
  interface Window {
    zE?: (...args: unknown[]) => unknown;
    zESettings?: {
      webWidget?: {
        position?: {
          horizontal?: string;
          vertical?: string;
        };
        launcher?: {
          label?: string;
          chatLabel?: string;
          mobile?: {
            labelVisible?: boolean;
          };
        };
      };
    };
  }
}
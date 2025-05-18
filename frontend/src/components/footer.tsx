import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 border-t border-gray-200 bg-white/80">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm text-gray-600">
          © 2024 Bolt. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
} 
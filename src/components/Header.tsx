import React from 'react';
import { Clock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
        <Clock className="h-8 w-8 text-teal-400 mr-3" />
        <h1 className="text-2xl font-bold text-gray-100">Life in Weeks</h1>
      </div>
    </header>
  );
};
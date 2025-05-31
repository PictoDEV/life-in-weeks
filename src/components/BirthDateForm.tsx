import React from 'react';
import { Calendar } from 'lucide-react';

interface BirthDateFormProps {
  birthDate: Date | null;
  setBirthDate: (date: Date) => void;
}

export const BirthDateForm: React.FC<BirthDateFormProps> = ({ 
  birthDate, 
  setBirthDate 
}) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setBirthDate(date);
    }
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-full">
      <label 
        htmlFor="birthdate" 
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Your date of birth
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          id="birthdate"
          className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-100 sm:text-sm transition-all duration-200"
          placeholder="Select your date of birth"
          value={formatDateForInput(birthDate)}
          onChange={handleDateChange}
          max={formatDateForInput(new Date())}
        />
      </div>
      <p className="mt-2 text-sm text-gray-400">
        Your data stays in your browser and is never sent to any server.
      </p>
    </div>
  );
};
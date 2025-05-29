import React from 'react';
import { calculateAge } from '../utils/dateCalculations';

interface StatsProps {
  weeksLived: number;
  percentageLived: number;
  birthDate: Date | null;
}

export const Stats: React.FC<StatsProps> = ({ 
  weeksLived, 
  percentageLived, 
  birthDate 
}) => {
  const TOTAL_WEEKS = 90 * 52;
  const weeksRemaining = TOTAL_WEEKS - weeksLived;
  const age = birthDate ? calculateAge(birthDate) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Life Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Current Age</p>
          <p className="text-3xl font-bold text-teal-600">{age.toFixed(1)}</p>
          <p className="text-sm text-gray-500">years</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Weeks Lived</p>
          <p className="text-3xl font-bold text-teal-600">{weeksLived.toLocaleString()}</p>
          <p className="text-sm text-gray-500">of {TOTAL_WEEKS.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Life Progress</p>
          <p className="text-3xl font-bold text-teal-600">{percentageLived.toFixed(1)}%</p>
          <p className="text-sm text-gray-500">complete</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentageLived}%` }}
        ></div>
      </div>
      
      <div className="text-center mt-2">
        <p className="text-gray-600">
          You have approximately <span className="font-semibold text-teal-600">{weeksRemaining.toLocaleString()}</span> weeks remaining until age 90.
        </p>
      </div>
    </div>
  );
};
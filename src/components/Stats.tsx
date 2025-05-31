import React from 'react';
import { calculateAge, calculateTimeStats } from '../utils/dateCalculations';

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
  const timeStats = calculateTimeStats(weeksLived);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">Your Life Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Current Age</p>
          <p className="text-3xl font-bold text-teal-400">{age.toFixed(1)}</p>
          <p className="text-sm text-gray-400">years</p>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Weeks Lived</p>
          <p className="text-3xl font-bold text-teal-400">{weeksLived.toLocaleString()}</p>
          <p className="text-sm text-gray-400">of {TOTAL_WEEKS.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Life Progress</p>
          <p className="text-3xl font-bold text-teal-400">{percentageLived.toFixed(1)}%</p>
          <p className="text-sm text-gray-400">complete</p>
        </div>
      </div>

      <div className="bg-gray-900/50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">Time Distribution (so far)</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Sleep (8 hours daily)</span>
              <span className="text-teal-400">{timeStats.sleepYears.toFixed(1)} years</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${timeStats.sleepPercentage}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Essential Activities (4.5 hours daily)</span>
              <span className="text-teal-400">{timeStats.essentialYears.toFixed(1)} years</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${timeStats.essentialPercentage}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Discretionary Time</span>
              <span className="text-teal-400">{timeStats.discretionaryYears.toFixed(1)} years</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-teal-400 h-2 rounded-full" style={{ width: `${timeStats.discretionaryPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-teal-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentageLived}%` }}
        ></div>
      </div>
      
      <div className="text-center mt-2">
        <p className="text-gray-300">
          You have approximately <span className="font-semibold text-teal-400">{weeksRemaining.toLocaleString()}</span> weeks remaining until age 90.
        </p>
      </div>
    </div>
  );
};
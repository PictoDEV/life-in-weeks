import React, { useState } from 'react';
import { formatDate } from '../utils/dateCalculations';
import { motion } from '../utils/motion';

interface LifeChartProps {
  birthDate: Date | null;
  weeksLived: number;
}

export const LifeChart: React.FC<LifeChartProps> = ({ 
  birthDate, 
  weeksLived 
}) => {
  const WEEKS_PER_YEAR = 52;
  const YEARS = 90;
  const TOTAL_WEEKS = YEARS * WEEKS_PER_YEAR;
  
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  
  const getWeekDate = (weekIndex: number): Date | null => {
    if (!birthDate) return null;
    
    const date = new Date(birthDate);
    date.setDate(date.getDate() + weekIndex * 7);
    return date;
  };

  const renderWeekDot = (weekIndex: number, yearIndex: number) => {
    const isLived = weekIndex < weeksLived;
    const weekNumber = yearIndex * WEEKS_PER_YEAR + weekIndex % WEEKS_PER_YEAR;
    const date = getWeekDate(weekNumber);
    
    const delayIndex = Math.min(weekIndex, 100);
    const delay = delayIndex * 0.002;
    
    return (
      <motion.div 
        key={weekNumber}
        className={`w-2.5 h-2.5 rounded-full cursor-pointer mx-0.5 my-0.5 transform transition-all hover:scale-150 relative
          ${isLived ? 'bg-teal-400 hover:bg-teal-300' : 'bg-gray-700 hover:bg-gray-600'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay }}
        onMouseEnter={() => setHoveredWeek(weekNumber)}
        onMouseLeave={() => setHoveredWeek(null)}
      >
        {hoveredWeek === weekNumber && date && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-900 text-gray-100 text-xs py-1 px-2 rounded shadow-lg z-10">
            {formatDate(date)}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderYearLabel = (year: number) => (
    <div key={`year-${year}`} className="flex flex-col items-center">
      <div className="text-xs text-gray-400 font-medium mb-2">{year}</div>
    </div>
  );

  const renderDecadeMarker = (decade: number) => (
    <div 
      key={`decade-${decade}`} 
      className="absolute left-0 top-0 h-full border-l border-teal-800/30 pl-1 text-xs text-teal-400 font-bold"
      style={{ left: `${(decade / YEARS) * 100}%` }}
    >
      {decade}
    </div>
  );

  return (
    <div className="relative">
      <div className="mb-8 text-center text-sm text-gray-400">
        <span className="inline-block w-3 h-3 rounded-full bg-teal-400 mr-2"></span>
        Weeks lived
        <span className="inline-block w-3 h-3 rounded-full bg-gray-700 mx-2 ml-4"></span>
        Weeks remaining
      </div>
      
      <div className="relative mb-12">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(decade => renderDecadeMarker(decade))}
        
        <div className="grid grid-cols-52 gap-0 w-full">
          {Array.from({ length: YEARS }).map((_, yearIndex) => (
            <div key={yearIndex} className="mb-6">
              {yearIndex % 5 === 0 && renderYearLabel(yearIndex)}
              <div className="flex flex-wrap">
                {Array.from({ length: WEEKS_PER_YEAR }).map((_, weekIndex) => 
                  renderWeekDot(weekIndex + yearIndex * WEEKS_PER_YEAR, yearIndex)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
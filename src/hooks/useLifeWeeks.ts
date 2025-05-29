import { useState, useMemo } from 'react';
import { calculateWeeksLived } from '../utils/dateCalculations';

export const useLifeWeeks = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  
  const weeksLived = useMemo(() => {
    if (!birthDate) return 0;
    return calculateWeeksLived(birthDate);
  }, [birthDate]);
  
  const percentageLived = useMemo(() => {
    const totalWeeks = 90 * 52; // 90 years in weeks
    return (weeksLived / totalWeeks) * 100;
  }, [weeksLived]);
  
  const isDateSelected = birthDate !== null;
  
  return {
    birthDate,
    setBirthDate,
    weeksLived,
    percentageLived,
    isDateSelected
  };
};
export const calculateWeeksLived = (birthDate: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  const yearInMs = 31536000000; // 365 days in milliseconds
  const birthDateThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  let timePassedThisYear;
  
  if (today >= birthDateThisYear) {
    timePassedThisYear = today.getTime() - birthDateThisYear.getTime();
  } else {
    const lastBirthday = new Date(today.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());
    timePassedThisYear = today.getTime() - lastBirthday.getTime();
  }
  
  const decimalPortion = timePassedThisYear / yearInMs;
  return age + decimalPortion;
};

export const calculateTimeStats = (weeksLived: number) => {
  const totalHours = weeksLived * 7 * 24;
  
  // Sleep: 8 hours per day
  const sleepHours = weeksLived * 7 * 8;
  const sleepYears = sleepHours / (365 * 24);
  const sleepPercentage = (sleepHours / totalHours) * 100;
  
  // Essential activities: 4.5 hours per day
  const essentialHours = weeksLived * 7 * 4.5;
  const essentialYears = essentialHours / (365 * 24);
  const essentialPercentage = (essentialHours / totalHours) * 100;
  
  // Remaining discretionary time
  const discretionaryHours = totalHours - (sleepHours + essentialHours);
  const discretionaryYears = discretionaryHours / (365 * 24);
  const discretionaryPercentage = (discretionaryHours / totalHours) * 100;
  
  return {
    sleepYears,
    sleepPercentage,
    essentialYears,
    essentialPercentage,
    discretionaryYears,
    discretionaryPercentage
  };
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString(undefined, options);
};
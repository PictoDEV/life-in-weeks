import React from 'react';
import { LifeChart } from './components/LifeChart';
import { BirthDateForm } from './components/BirthDateForm';
import { Stats } from './components/Stats';
import { useLifeWeeks } from './hooks/useLifeWeeks';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const { 
    birthDate, 
    setBirthDate, 
    weeksLived, 
    percentageLived,
    isDateSelected
  } = useLifeWeeks();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">See your life in weeks</h2>
            <p className="text-gray-600 mb-6">
              Enter your date of birth below to visualize your life journey. Each dot represents one week of your 
              90-year life span. Filled dots show weeks you've already lived, empty dots represent your future.
            </p>
            <BirthDateForm birthDate={birthDate} setBirthDate={setBirthDate} />
          </div>

          {isDateSelected && (
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 transition-all duration-300 hover:shadow-lg">
                <Stats 
                  weeksLived={weeksLived} 
                  percentageLived={percentageLived} 
                  birthDate={birthDate} 
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your life in weeks</h2>
                <div className="overflow-x-auto">
                  <LifeChart 
                    birthDate={birthDate} 
                    weeksLived={weeksLived} 
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
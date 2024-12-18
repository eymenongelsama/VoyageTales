import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TravelOptions from './components/home/TravelOptions';
import CriteriaSection from './components/criteria/CriteriaSection';
import AuthForm from './components/auth/AuthForm';
import { UserPreferences } from './types';
import { NavigationStep } from './types/navigation';
import CountryList from './components/criteria/CountryList'; // CountryList bileşeni
import CountryDetail from './components/criteria/CountryDetail'; // CountryDetail bileşeni
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [step, setStep] = useState<NavigationStep>('auth');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const handlePreferencesComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setStep('criteria');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar currentStep={step} onNavigate={setStep} />
        <main className="flex-1">
          <Routes>
            {/* Ana Sayfa Rotası */}
            <Route
              path="/"
              element={
                <>
                  {step === 'auth' && <AuthForm />}
                  {step === 'options' && (
                    <TravelOptions onComplete={handlePreferencesComplete} />
                  )}
                  {step === 'criteria' && (
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/3 p-4">
                        <CriteriaSection />
                      </div>
                      <div className="lg:w-2/3 p-4">
                        <CountryList />
                      </div>
                    </div>
                  )}
                </>
              }
            />
            {/* Ülke Detay Rotası */}
            <Route path="/country/:id" element={<CountryDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AuthForm from './components/auth/AuthForm';
import TravelOptions from './components/home/TravelOptions';
import CriteriaSection from './components/criteria/CriteriaSection';
import MatchingCountries from './components/criteria/MatchingCountries';
import CountryDetail from './components/criteria/CountryDetail';
import Footer from './components/layout/Footer';


type NavigationStep = 'auth' | 'options' | 'criteria';
interface UserPreferences {
  // Kendi tiplerin
}

function App() {
  const [step, setStep] = useState<NavigationStep>('auth');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [matchedCountries, setMatchedCountries] = useState<any[]>([]); // Eşleşen ülkeler için state

  // Kullanıcı tercihlerinden sonra kriter seçim aşamasına geç
  const handlePreferencesComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setStep('criteria');
  };

  // Eşleşen ülkeleri güncelle
  const updateMatchedCountries = (countries: any[]) => {
    setMatchedCountries(countries);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar currentStep={step} onNavigate={setStep} />
        <main className="flex-1">
          <Routes>
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
                      {/* Sol taraf - Kriter Seçimi */}
                      <div className="lg:w-1/3 p-4">
                        <CriteriaSection onUpdate={updateMatchedCountries} />
                      </div>
                      {/* Sağ taraf - Eşleşen Ülkeler */}
                      <div className="lg:w-2/3 p-4">
                        <MatchingCountries countries={matchedCountries} />
                      </div>
                    </div>
                  )}
                </>
              }
            />
            <Route path="/country/:id" element={<CountryDetail coordinates={{ lat: 0, lng: 0 }} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
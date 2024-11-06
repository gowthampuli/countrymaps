import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import { CountryProvider } from './context/CountryContext';

function App() {
  return (
    <BrowserRouter>
      <CountryProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<CountryList />} />
              <Route path="/country/:code" element={<CountryDetail />} />
            </Routes>
          </main>
        </div>
      </CountryProvider>
    </BrowserRouter>
  );
}

export default App;
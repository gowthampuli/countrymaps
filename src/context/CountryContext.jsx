import React, { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext(null);

export function CountryProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredCountries = countries
    .filter(country => {
      const searchRegex = new RegExp(searchTerm, 'i');
      return searchRegex.test(country.name.common) &&
        (!region || country.region === region);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.common.localeCompare(b.name.common);
        case 'population':
          return b.population - a.population;
        case 'area':
          return b.area - a.area;
        default:
          return 0;
      }
    });

  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const value = {
    countries: paginatedCountries,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    region,
    setRegion,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    allCountries: countries
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountryContext);

  return context;
  
}
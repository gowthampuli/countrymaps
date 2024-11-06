import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useCountries } from '../context/CountryContext';

export default function Navbar() {
  const { 
    searchTerm, 
    setSearchTerm, 
    region, 
    setRegion, 
    sortBy, 
    setSortBy,
  } = useCountries();

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
            <Globe className="h-8 w-8" />
            <span>Country Explorer</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
              <option value="area">Sort by Area</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
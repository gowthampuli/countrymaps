import React from 'react';
import { Link } from 'react-router-dom';
import { useCountries } from '../context/CountryContext';
import { MapPin, Users, Globe2 } from 'lucide-react';
import Loader from './Loader';
import Pagination from './Pagination';

export default function CountryList() {
  const { 
    countries, 
    loading, 
    error, 
    currentPage,
    setCurrentPage,
    totalPages
  } = useCountries();

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {countries.map((country) => (
          <Link
            key={country.cca3}
            to={`/country/${country.cca3}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800"
          >
            <div className="flex items-center p-4">
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="ml-6 flex-grow">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {country.name.common}
                </h2>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Capital: {country.capital?.[0] || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Population: {country.population.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span>Region: {country.region}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../context/CountryContext';
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Globe2, 
  Languages, 
  Currency, 
  Map,
  Clock,
  Phone
} from 'lucide-react';
import Loader from './Loader';

export default function CountryDetail() {
  const { code } = useParams();
  const { allCountries, loading } = useCountries();
  
  if (loading) return <Loader />;
  
  const country = allCountries.find(c => c.cca3 === code);
  if (!country) return <div>Country not found</div>;

  const languages = Object.values(country.languages || {}).join(', ');
  const currencies = Object.values(country.currencies || {})
    .map(curr => `${curr.name} (${curr.symbol})`)
    .join(', ');

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Countries
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
        <div className="aspect-video relative">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {country.name.common}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Official Name: {country.name.official}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5" />
                <span>Capital: {country.capital?.[0] || 'N/A'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Users className="h-5 w-5" />
                <span>Population: {country.population.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Globe2 className="h-5 w-5" />
                <span>Region: {country.region} ({country.subregion})</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Languages className="h-5 w-5" />
                <span>Languages: {languages}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Currency className="h-5 w-5" />
                <span>Currencies: {currencies}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Map className="h-5 w-5" />
                <span>Area: {country.area.toLocaleString()} km²</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Clock className="h-5 w-5" />
                <span>Timezones: {country.timezones.join(', ')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone className="h-5 w-5" />
                <span>Calling Code: {country.idd.root}{country.idd.suffixes?.[0]}</span>
              </div>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Bordering Countries
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => {
                  const borderCountry = allCountries.find(c => c.cca3 === border);
                  return borderCountry ? (
                    <Link
                      key={border}
                      to={`/country/${border}`}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    >
                      {borderCountry.name.common}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {country.maps && (country.maps.googleMaps || country.maps.openStreetMaps) && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Maps
              </h2>
              <div className="flex flex-wrap gap-4">
                {country.maps.googleMaps && (
                  <a
                    href={country.maps.googleMaps}
                    target="_blank"
                   
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Map className="h-5 w-5 mr-2" />
                    View on Google Maps
                  </a>
                )}
                {country.maps.openStreetMaps && (
                  <a
                    href={country.maps.openStreetMaps}
                    target="_blank"
                   
                    className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Map className="h-5 w-5 mr-2" />
                    View on OpenStreetMap
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
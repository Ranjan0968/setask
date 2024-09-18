"use client";
import { useState, useMemo } from 'react';
import { useFetchCountries } from '../hooks/useFetchCountries';
import { CountryGrid } from '../components/CountryGrid';
import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';
import { CountryDetail } from '../components/CountryDetail';
import { Country } from '@/types/country';
import { DarkModeToggle } from '@/components/DarkModeToggle';

export default function Home() {
  const { countries, loading, error } = useFetchCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [region, setRegion] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (region) {
      result = filterCountriesByRegion(result, region);
    }

    if (query) {
      result = searchCountries(result, query);
    }

    result = sortCountriesByPopulation(result, sortAscending);

    return result;
  }, [countries, region, query, sortAscending]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or capital"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Filter by region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setSortAscending(!sortAscending)}
          className="w-full md:w-1/3 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Sort by Population ({sortAscending ? 'Ascending' : 'Descending'})
        </button>
        <DarkModeToggle />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryGrid countries={filteredCountries} onClick={setSelectedCountry} />
      )}
    </div>
  );
}

import { Country } from '../types/country';
import Image from 'next/image';

interface CountryGridProps {
  countries: Country[];
  onClick: (country: Country) => void;
}

export const CountryGrid: React.FC<CountryGridProps> = ({ countries, onClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {countries.map((country) => (
        <div 
          key={country.name.common} 
          onClick={() => onClick(country)} 
          className="cursor-pointer border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4"
        >
          <Image 
            src={country.flags.png} 
            alt={country.name.common} 
            width={200} 
            height={100} 
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{country.name.common}</h3>
          <p className="text-sm text-gray-600">Capital: {country.capital?.[0]}</p>
          <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Region: {country.region}</p>
        </div>
      ))}
    </div>
  );
};

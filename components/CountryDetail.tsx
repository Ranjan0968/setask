import { Country } from '../types/country';

interface CountryDetailProps {
  country: Country;
}

export const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Currencies: {Object.values(country.currencies).map(c => c.name).join(', ')}</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <p>Timezones: {country.timezones.join(', ')}</p>
    </div>
  );
};

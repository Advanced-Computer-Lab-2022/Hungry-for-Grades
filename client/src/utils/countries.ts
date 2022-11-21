import { Country } from 'country-state-city';

export function getCountries() {
  return Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.isoCode
  }));
}

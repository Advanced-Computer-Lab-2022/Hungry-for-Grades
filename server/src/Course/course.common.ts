import { logger } from '@/Utils/logger';
import { Price } from '@Course/course.interface';
import CC from 'currency-converter-lt';
import CountryToCurrency from 'iso-country-currency';
import { CourseFilters, CourseFiltersDefault } from './course.types';

export function getPriceAfterDiscount(price: Price) {
  const discountAvailable = price.discounts.filter(discount => {
    return Date.now() >= discount.startDate.getTime() && Date.now() <= discount.endDate.getTime();
  });
  let result = 0;
  if (discountAvailable.length == 0)
    // No discounts are available on the course
    result = price.currentValue; // Original Value Returned
  else result = ((100 - discountAvailable[0].percentage) / 100) * price.currentValue;
  return Math.round(result * 100) / 100; // round to 2 decimal places
}

export function getCurrencyFromCountry(countryCode: string): string {
  return CountryToCurrency.getParamByISO(countryCode, 'currency');
}

export async function getConversionRate(country: string, toUSD = false): Promise<number> {
  // toUSD is set when we want to convert from the currency of the country to USD
  try {
    const inputCurrency = getCurrencyFromCountry(country);
    let currencyConverter;
    if (toUSD) {
      currencyConverter = new CC({ from: inputCurrency, to: 'USD' });
    } else {
      currencyConverter = new CC({ from: 'USD', to: inputCurrency });
    }
    const rates = await currencyConverter.rates();
    //console.log(rates, country, toUSD);
    return rates;
  } catch (err) {
    logger.error(err.message);
    return 1;
  }
}

// Gets price after discount and after currency conversion
export async function getCurrentPrice(price: Price, conversionRate: number, countryCode: string): Promise<Price> {
  let discountedPrice = price.currentValue;
  try {
    discountedPrice = getPriceAfterDiscount(price);

    const toCurrency = getCurrencyFromCountry(countryCode);
    let convertedPrice = discountedPrice * conversionRate;
    convertedPrice = Math.round(convertedPrice * 100) / 100; // round to 2 decimal places

    return { ...price, currency: toCurrency, currentValue: convertedPrice };
  } catch (error) {
    price.currentValue = discountedPrice ?? price.currentValue;
    price.currency = 'USD';

    return price;
  }
}

// Adds default values to the course filters object sent in query params
export async function addDefaultValuesToCourseFilters(courseFilters: CourseFilters) {
  // Filter out empty params
  for (const param in courseFilters) {
    if (courseFilters[param] === null || (`${courseFilters[param]}` as string).trim() === '') {
      delete courseFilters[param];
    }
  }
  // Supply default values to query params (if property is not defined)
  const filters = { ...CourseFiltersDefault, ...courseFilters };

  // Parse Numbers sent in query
  for (const key in filters) {
    if (!isNaN(parseFloat(filters[key as string]))) filters[key as string] = parseFloat(filters[key as string]);
  }

  // Convert prices to USD
  const conversionRate = await getConversionRate(filters.country, true);
  filters.priceLow = conversionRate * filters.priceLow;
  filters.priceHigh = conversionRate * filters.priceHigh;

  return filters;
}

// Sort Query in Get Courses endpoints
export function generateCoursesSortQuery(sortBy: number) {
  // Handles Sort Query common between get all courses endpoints
  const sortQuery: any = {};
  if (sortBy == 0) sortQuery['numberOfEnrolledTrainees'] = -1;
  else if (sortBy == 1) sortQuery['rating.averageRating'] = -1;

  return sortQuery;
}

export function generateCoursesFilterQuery(filters: CourseFilters) {
  // Handles Filter Query common between get all courses endpoints
  const { searchTerm, category, subcategory, level } = filters;
  const filterQuery = {};
  if (category != undefined) filterQuery['category'] = category;
  if (level != undefined) filterQuery['level'] = { $eq: level };
  if (subcategory != undefined) filterQuery['subcategory'] = { $eq: subcategory };

  filterQuery['rating.averageRating'] = { $gte: filters.rating };
  filterQuery['duration'] = { $gte: filters.durationLow, $lte: filters.durationHigh };

  filterQuery['price.currentValue'] = { $gte: filters.priceLow, $lte: filters.priceHigh };

  return filterQuery;
}

export function getYoutubeVideoID(url:string):string{
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    //error
  }
}

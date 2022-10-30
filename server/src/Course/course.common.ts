import { HttpException } from '@/Exceptions/HttpException';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { Price } from '@Course/course.interface';
import CC from 'currency-converter-lt';
import CountryToCurrency from 'iso-country-currency';
import CourseService from '@Course/course.dao';
import { CourseFilters, CourseFiltersDefault } from './course.types';
import axios from 'axios';
import { EXCHANGE_BASE_URL } from '@/Config';

// Converts from input currency to the currency of the chosen country
export async function getCurrentPrice(price: Price, countryCode: string): Promise<Price> {
  let discountedPrice = price.currentValue;
  try {
    discountedPrice = getPriceAfterDiscount(price);

    // No need to convert if the currency is same
    if (countryCode === 'US') return { ...price, currentValue: discountedPrice };

    const outputCurrency = CountryToCurrency.getParamByISO(countryCode, 'currency');
    // const currencyConverter = new CC({ amount: discountedPrice, from: price.currency, to: outputCurrency });
    // const convertedPrice = await currencyConverter.convert();

    const response = await axios.get(`${EXCHANGE_BASE_URL}/${price.currency}/${outputCurrency}/${discountedPrice}`);
    const convertedPrice = response.data.conversion_result;

    return { ...price, currency: outputCurrency, currentValue: convertedPrice };
  } catch (error) {
    price.currentValue = discountedPrice ?? price.currentValue;
    price.currency = 'USD';

    return price;
  }
}

function getPriceAfterDiscount(price: Price) {
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

// Adds default values to the course filters object sent in query params
export function addDefaultValuesToCourseFilters(courseFilters: CourseFilters) {
  // Filter out empty params
  for (const param in courseFilters) {
    if (courseFilters[param] === null || courseFilters[param] === '') {
      delete courseFilters[param];
    }
  }
  // Supply default values to query params (if property is not defined)
  const filters = { ...CourseFiltersDefault, ...courseFilters };

  // Parse Numbers sent in query
  for (const key in filters) {
    if (!isNaN(parseInt(filters[key as string]))) filters[key as string] = parseInt(filters[key as string]);
  }
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

  filterQuery['duration'] = { $gte: filters.durationLow, $lte: filters.durationHigh };
  // Handles Paid or Free courses only
  // Discount should be applied & currency converted if price ranges are specified
  filterQuery['price.currentValue'] = { $gte: filters.priceLow, $lte: filters.priceHigh };

  return filterQuery;
}

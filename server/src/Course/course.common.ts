import CountryToCurrency from 'iso-country-currency';
import CC from 'currency-converter-lt';
import { Price } from '@Course/course.interface';
import { HttpException } from '@/exceptions/HttpException';
import HttpStatusCodes from '@/utils/HttpStatusCodes';

// Converts from input currency to the currency of the chosen country
export async function getCurrentPrice(price: Price, country: string): Promise<Price> {
  try {
    const discountedPrice = getPriceAfterDiscount(price);

    const outputCurrency = CountryToCurrency.getParamByParam('countryName', country, 'currency');

    const currencyConverter = new CC({ amount: discountedPrice, from: price.currency, to: outputCurrency });
    const convertedPrice = await currencyConverter.convert();
    return { ...price, currency: outputCurrency, currentValue: convertedPrice };
  } catch (error) {
    throw new HttpException(HttpStatusCodes.CONFLICT, 'Error occured while fetching courses price');
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

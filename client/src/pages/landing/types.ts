import {
  Instructor,
  Rating,
  type ICourse,
  type Price
} from '@interfaces/course.interface';

export function getOriginalPrice(price: Price): number | undefined {
  if (!price.discounts?.length) {
    return undefined;
  }
  const now = new Date();
  const discount = price.discounts.find(
    d => new Date(d.startDate) <= now && new Date(d.endDate) > now
  );
  if (!discount) {
    return undefined;
  }
  return (price.currentValue / (100 - discount.percentage)) * 100;
}

export type CourseCardProps = {
  id: string;
  title: string;
  instructor: Instructor | Instructor[];
  image: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: Rating;
  totalHours: number;
  description: string;
  outline: string[];
};

export function mapCourseToCardProps(course: ICourse): CourseCardProps {
  return {
    id: course._id,
    title: course.title,
    instructor: course._instructor,
    image: course.thumbnail,
    price: course.price.currentValue,
    originalPrice: getOriginalPrice(course.price),
    currency: course.price.currency,
    rating: course.rating,
    totalHours: course.duration,
    description: course.description,
    outline: course.outline
  };
}

import {
  Instructor,
  Rating,
  type ICourse,
  type IPrice
} from '@interfaces/course.interface';

export function getOriginalPrice(price: IPrice): number | undefined {
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
  previewVideoURL: string;
  id: string;
  title: string;
  instructor: Instructor[];
  image: string;
  price: IPrice;
  originalPrice?: number;
  currency: string;
  rating: Rating;
  duration: number;
  description: string;
  outline: string[];
	category?:string;
	subcategory?:string;
};

export function mapCourseToCardProps(course: ICourse): CourseCardProps {
  return {
    id: course._id,
    title: course.title,
    instructor: course._instructor,
    image: course.thumbnail,
    price: course.price,
    originalPrice: getOriginalPrice(course.price),
    currency: course.price.currency,
    rating: course.rating,
    duration: course.duration ?? 1,
    description: course.description,
    outline: course.outline,
    previewVideoURL: course.previewVideoURL,
		category: course?.category,
		subcategory: course?.subcategory?.at(0)
  };
}

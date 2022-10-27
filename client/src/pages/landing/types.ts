import { Course } from '@/services/axios/dataServices/CoursesDataService';

export type CourseCardProps = {
  id: string;
  title: string;
  instructors: {
    name: string;
  }[];
  image: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
};

export function mapCourseToCardProps(course: Course): CourseCardProps {
  return {
    id: course._id,
    title: course.title,
    instructors: course._instructor._user.map(u => ({
      name: u.name
    })),
    image: course.thumbnail,
    price: course.price.currentValue,
    originalPrice:
      course.price.discounts.length === 0
        ? undefined
        : course.price.currentValue +
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          course.price.discounts[course.price.discounts.length - 1]!,
    currency: course.price.currency,
    rating: course.rating.averageRating
  };
}

export type CourseSummaryProps = {
  title: string;
  image: string;
  price: number;
  rating: number;
  instructorName: string;
  instructorID: string;
  isLiked: boolean;
  courseID: string;
  discount?: boolean;
  priceAfter?: number;
};

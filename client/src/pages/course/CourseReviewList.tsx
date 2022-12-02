import Pagination from "@/components/pagination/Pagination";
import ReviewContainer from "@/components/reviewHolder/ReviewContainer";
import { CoursesRoutes } from "@/services/axios/dataServices/CoursesDataService";
import useCourseReviews from "./useCourseReviews";


export default function CourseReviewList(props:{id : string}) {
    const data = useCourseReviews(props.id);
    const list = data?.data?.data?.data;
    const toShow = list?.map((review : typeof CoursesRoutes.GET.getCourseReviews.response.data[0] ) => {
        return <ReviewContainer key={review?._id} name={review?._trainee.name} img={review?._trainee.profileImage} comment={review?.comment} createdAt={review?.createdAt} rating={review?.rating} country={review?._trainee.country} />
    });

  return (
    <div>
        <h1 style={{fontSize:'1.5rem', color:'#520e0e'}}>Course Reviews</h1>
        {toShow}
        { data?.data?.data?.totalPages > 1 && <Pagination activePage={data?.activePage} pages={data?.data?.data?.totalPages } setActivePage={data?.setActivePage} />}
    </div>
  )
}

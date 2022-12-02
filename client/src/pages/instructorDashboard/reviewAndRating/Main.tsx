import StarRatings from "react-star-ratings";
import useQueryGetInstructor from "./useQueryGetInstructor";

import styles from './Main.module.scss';
import ReviewList from "@/pages/InstructorProfile/ReviewList";


export default function Main() {

    const data = useQueryGetInstructor();

    const info = data?.data?.data?.data;

    console.log(info);

  return (
    <div className = {styles.container}>
        <div>
            <h2 style={{fontSize:'1.5rem'}}>Rating:</h2>
            <div>
            <span style={{fontSize:'25px', fontWeight:'500'}}> {info?.rating.averageRating} </span>
            <StarRatings
          numberOfStars={5}
          rating={info?.rating.averageRating}
          starDimension='40px'
          starRatedColor='rgb(229, 152, 25)'
          starSpacing='0px'
        />
        </div>
        <hr style={{color:'white'}} />
        <hr style={{color:'white'}} />
        <hr style={{color:'white'}} />
        <div>
            <h2 style={{fontSize:'1.5rem'}}>Reviews:</h2>

            <ReviewList text={"637962792c3f71696ca3473c"} />


        </div>

        </div>
    </div>
  )
}

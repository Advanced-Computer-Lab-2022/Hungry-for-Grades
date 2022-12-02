import StarRatings from "react-star-ratings";
import useQueryGetInstructor from "./useQueryGetInstructor";

import styles from './Main.module.scss';


export default function Main() {

    const data = useQueryGetInstructor();

    const info = data?.data?.data?.data;

    console.log(info);

  return (
    <div className = {styles.container}>
        <div>
            <h2>Instructor Rating</h2>
            <div style={{alignItems:'center'}}>
            <span style={{fontSize:'30px', fontWeight:'500'}}> {info.rating.averageRating} </span>
            <StarRatings
          numberOfStars={5}
          rating={info.rating.averageRating}
          starDimension='40px'
          starRatedColor='rgb(229, 152, 25)'
          starSpacing='0px'
        />
        </div>
        </div>
    </div>
  )
}

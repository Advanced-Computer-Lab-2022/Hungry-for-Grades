
import {AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube} from 'react-icons/ai';

import styles from './InstructorPage.module.scss';

import CourseList from './CourseList';


import  ReviewContainer  from '@components/reviewHolder/ReviewContainer';

import ReviewSection from './ReviewSection';


export default function InstructorPage() {
  //const instructorId = '635d21f7f1f00520bae45867';

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div>
        <img
          alt='Instructor'
          className={styles.instructor_img}
          src='https://www.muscleandfitness.com/wp-content/uploads/2017/06/The-Rock-Dwayne-Johnson-Cable-Crossover-Promo.jpg?w=800&quality=82&strip=all'
        />
        <div className={styles.social_wrapper}>
            <a href = "https://youtube.com"> <AiFillLinkedin style = {{fontSize:'2rem'}}/> </a>
            <a href = "https:/facebook.com"> <AiFillTwitterCircle style = {{fontSize:'2rem'}}/> </a>
            <a href = "https://insstagram" > <AiFillYoutube style = {{fontSize:'2rem', color:'red'}}/> </a>
        </div>
        </div>
        <div className={styles.hero1}>
          <div className={styles.title}>Instructor</div>
          <h1>The Rock</h1>
          <h2>Wrestling Instructor</h2>
          <div style = {{display:'flex'}}>
          <div style={{marginRight:'1.5rem'}}>
              <div className={styles.property}>Rating</div>
              <div className={styles.value}>3.3</div>
            </div>
            <div>
              <div className={styles.property}>Reviews</div>
              <div className={styles.value}>554,468</div>
            </div>
          </div>

          <h2>About me</h2>
          <div className={styles.data}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus earum
            illo a expedita error ducimus ipsum autem? Dignissimos provident
            quaerat deserunt animi incidunt. Vero quo voluptatem possimus natus
            numquam minima. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Perspiciatis accusamus error suscipit, impedit illo,
            perferendis sapiente iste temporibus eligendi veritatis nemo vero
            laboriosam sunt ipsum labore voluptas officiis minus maxime! Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Veniam nobis
            debitis laudantium hic, eaque accusamus qui quam. Impedit eos
            incidunt eveniet amet, asperiores aut, adipisci modi molestias,
            eligendi nam temporibus! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ex eaque at voluptatibus ipsa adipisci, quas
            distinctio consequatur odit assumenda. Amet, quasi quam modi eum ad
            cupiditate quidem dolorum adipisci natus?
          </div>
        </div>
      </div>
      <CourseList />
      <ReviewSection />
      <div>
        <h2 style= {{fontWeight:'700', fontSize:'1.6rem'}}>Reviews</h2>
      <ReviewContainer />
      <ReviewContainer />
      <ReviewContainer />
      <ReviewContainer />
      <ReviewContainer />
      </div>
    </div>
  );
}

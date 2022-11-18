
import { useQuery } from '@tanstack/react-query';

import styles from './InstructorPage.module.scss'; 

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';


/*async function getCourses()
{
    const Courses = InstructorRoutes.GET.getCourses;

    Courses.params = '63545df5507c24fc734f65ee';

    return getRequest(Courses);

}
*/

export default function InstructorPage() {


    const instructorId = '63545df5507c24fc734f65ee';

    /*const { isLoading, isError, data } = useQuery(['Courses'], () => getCourses(),
    {
        retryDelay: 1000 
      });
      */

    //console.log(data);


  return (
    <div className = {styles.page}>
        <div className = {styles.hero}>
        <img alt = "Instructor" className = {styles.instructor_img} src = "https://www.muscleandfitness.com/wp-content/uploads/2017/06/The-Rock-Dwayne-Johnson-Cable-Crossover-Promo.jpg?w=800&quality=82&strip=all" />
        <div className = {styles.hero1}>
            <div className = {styles.title}>Instructor</div>
            <h1>The Rock</h1>
            <h2>Wrestling Instructor</h2>
            <div>
                <div>
                    <div className = {styles.property}>Reviews</div>
                    <div className = {styles.value}>554,468</div>
                </div>
            </div>

            <h2>About me</h2>
            <div className = {styles.data}> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus earum illo a expedita error ducimus ipsum autem? Dignissimos provident quaerat deserunt animi incidunt. Vero quo voluptatem possimus natus numquam minima.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis accusamus error suscipit, impedit illo, perferendis sapiente iste temporibus eligendi veritatis nemo vero laboriosam sunt ipsum labore voluptas officiis minus maxime!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam nobis debitis laudantium hic, eaque accusamus qui quam. Impedit eos incidunt eveniet amet, asperiores aut, adipisci modi molestias, eligendi nam temporibus!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eaque at voluptatibus ipsa adipisci, quas distinctio consequatur odit assumenda. Amet, quasi quam modi eum ad cupiditate quidem dolorum adipisci natus?
            </div>
           </div> 
        </div>
        <div className = {styles.course_section}>
            <h2>Instructor Courses</h2>
            <div className = {styles.course_wrapper}>
                
            </div>

        </div>
    </div>
  )
}

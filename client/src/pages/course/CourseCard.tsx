import './CourseCard.css';

function CourseCard() {
  return (
    <div className='course-container'>
      <div className='img-wrapper'>
        <img
          alt='course'
          src={'https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg'}
          style={{ height: '8.4375rem', width: '15rem' }}
        />
      </div>
      <div>
        <div>
          <h4 className='course-title fnt-md'>
            Learn Python: The Complete Python Programming Course
          </h4>
        </div>
        <div className='instructors fnt-xs'>Avinash Jain, The Codex</div>
        <div>
          <span className='star-rating-number fnt-sm-b'>
            4.3
            {'\u00A0'}
          </span>
        </div>
        <div className='fnt-md-b'>$16.99</div>
      </div>
    </div>
  );
}

export default CourseCard;

//component with props:

// function CourseCard(props) {
//     const { id, title, instructors, image, price, rating } = props;
//     const rate = parseFloat(parseFloat(Object.values({ rating })[0]).toFixed(1));
//     console.log(rate);
//     return (
//       <div className="course-container">
//         <div className="img-wrapper">
//           <img src={image} alt="course" width="240px" height="135px" />
//         </div>
//         <div>
//           <div>
//             <h4 className="course-title fnt-md">{title}</h4>
//           </div>
//           <div className="instructors fnt-xs">
//             {instructors.map((instructor) => instructor.name).join(", ")}
//           </div>
//           <div>
//             <span className="star-rating-number fnt-sm-b">
//               {rate}
//               {"\u00A0"}
//             </span>
//             <span className="stars">
//               <StarRatings // npm install --save react-star-ratings
//                 rating={rate}
//                 starRatedColor="rgb(229, 152, 25)"
//                 numberOfStars={5}
//                 starDimension="15px"
//                 starSpacing="0px"
//               ></StarRatings>
//             </span>
//           </div>
//           <div className="fnt-md-b">${price}</div>
//         </div>
//       </div>
//     );
//   }

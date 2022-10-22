import CourseSummary from './CourseSummary';

function Landing() {
  return (
    <section>
      <CourseSummary
        discount
        isLiked
        courseID='1'
        image='./logo.png'
        instructorID='1'
        instructorName='Omar El-Meteny'
        price={15}
        priceAfter={10}
        rating={5}
        title='CSEN704'
      />
    </section>
  );
}

export default Landing;

import { ICourse } from '@/interfaces/course.interface';

function QandA(props: ICourse) {
  return (
    <div className='container'>
      {props.frequentlyAskedQuestions && (
        <div className='col'>
          {props.frequentlyAskedQuestions.map(faq => (
            <div key={faq._id} className='row border rounded-3 m-3'>
              <p className='text-dark my-2'>Q: {faq.question}</p>
              <span className='text-secondary my-2 small'>A: {faq.answer}</span>
              <span
                className='text-secondary text-end my-1'
                style={{ fontSize: '0.75rem' }}
              >
                {faq.votes} vote(s)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QandA;

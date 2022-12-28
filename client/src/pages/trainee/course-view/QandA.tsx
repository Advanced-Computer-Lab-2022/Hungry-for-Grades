import { ICourse } from '@/interfaces/course.interface';

function QandA(props: ICourse) {
  return (
    <div className='container'>
      {props.frequentlyAskedQuestions && (
        <div className='col'>
          {props.frequentlyAskedQuestions.map(faq => (
            <div key={faq._id} className='row m-3 px-3 pt-2'  style={{
              filter: 'drop-shadow(0 0 0.1rem #eee)',
              borderRadius: '0.25rem',
              boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)',
							fontSize:'1.1rem'
            }}>
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

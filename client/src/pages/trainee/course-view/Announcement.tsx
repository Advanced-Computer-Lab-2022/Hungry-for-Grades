import { ICourse } from '@/interfaces/course.interface';

function Announcement(props: ICourse) {
  return (
  <div className='container'>
    {props.announcements && 
    <div className='col'>
      {props.announcements.map((a,index) => (
          <div key={a._id} className='row m-3 border rounded-3'>
            {a.title && <h3 className='strong my-2 text-dark'>{index+1}. {a.title}</h3>}
            <small className='text-secondary mx-3' style={{fontSize: '0.75rem'}} >Created at {new Date(a.createdAt).toLocaleString('en-GB', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}</small>
            <p className='text-dark mx-3'>{a.description}</p>
          </div>
      ))}
     </div>
     }
  </div>
  );
}

export default Announcement;

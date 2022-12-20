import { ICourseLesson } from '@/interfaces/course.interface';

function parseYoutubeUrl(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7]?.length == 11 ? match[7] : '';
}

function getEmbedUrl(url: string) {
  const id = parseYoutubeUrl(url);
  if (!id) {
    return '';
  }
  return `https://www.youtube.com/embed/${id}`;
}
function Video(props: ICourseLesson) {
  const embeddedUrl = getEmbedUrl(props.videoURL);
  return (
    <>
      <h2 className='text-dark text-center my-3'>{props.title}</h2>
      <p
        style={{
          position: 'relative',
          width: '80%',
          paddingBottom: '45%',
          margin: '0 auto'
        }}
      >
        {embeddedUrl && (
          <iframe
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            src={embeddedUrl}
            style={{
              height: `100%`,
              position: 'absolute',
              width: '100%',
              left: 0,
              top: 0, 
              border: 0
            }}
            title={props.title}
          />
        )}
      </p>
      <p className='m-3'>{props.description}</p>
    </>
  );
}

export default Video;

import { useQuery } from '@tanstack/react-query';

import { useTraineeId } from '@/hooks/useTraineeId';
import { getLessonById } from '@/services/axios/dataServices/CoursesDataService';
import Loader from '@/components/loader/loaderpage/Loader';

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
function Video(props: { lessonId: string; courseId: string }) {
  const userId = useTraineeId();
  const { data, isError, isLoading } = useQuery(
    ['getLessonById', props.lessonId, props.courseId, userId],
    () => getLessonById(props.courseId, props.lessonId, userId)
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <h1 className='text-dange text-center'>An error has occured while loading page</h1>
    );
  }
  if (!data) {
    return <></>;
  }
  const embeddedUrl = getEmbedUrl(data.videoURL);
  return (
    <>
      <h2 className='text-dark text-center my-3'>{data.title}</h2>
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
            title={data.title}
          />
        )}
      </p>
      <p className='m-3'>{data.description}</p>
    </>
  );
}

export default Video;

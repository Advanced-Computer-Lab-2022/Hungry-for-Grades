/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';

import { useTraineeId } from '@/hooks/useTraineeId';
import { getLessonById } from '@/services/axios/dataServices/CoursesDataService';
import Loader from '@/components/loader/loaderpage/Loader';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import { UseUserSetProgressBar } from '@/store/userStore';

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
  const useUserSetProgressBar = UseUserSetProgressBar();

  const { data, isError, isLoading } = useQuery(
    ['getLessonById', props.lessonId, props.courseId, userId],
    () => getLessonById(props.courseId, props.lessonId, userId)
  );
  if (isLoading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{
          minHeight: '20rem',
          minWidth: '100%'
        }}
      >
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <ErrorMessage />;
  }

  if (!data) {
    return <></>;
  }
  if (data) {
    useUserSetProgressBar(data.progress as number);
  }
  const embeddedUrl = getEmbedUrl(data.videoURL);
  return (
    <>
      <h2 className='text-dark text-center my-3'>{data?.title}</h2>
      <p
        style={{
          position: 'relative',
          width: '80%',
          paddingBottom: '45%',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            minHeight: '100%',
            minWidth: '100%'
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
              title={data?.title}
            />
          )}
        </div>
      </p>
      <div className='container'>
        <p className='m-3'>{data?.description}</p>
      </div>
    </>
  );
}

export default Video;

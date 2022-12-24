import { ICourse } from '@/interfaces/course.interface';

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

function CoursePreviewVideo(props: ICourse) {
    const emberUrl = getEmbedUrl(props.previewVideoURL);
    return (
        <div className='bg-dark'>
            <p
                style={{
                position: 'relative',
                width: '483.2px',
                height: '271.8px',
                margin: '0 auto',
                }}
            >
            {emberUrl && (
                <iframe
                    allowFullScreen
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    frameBorder='0'
                    src={emberUrl}
                    style={{
                    margin: '0 auto',
                    width: '100%',
                    height: '100%'
                    }}
                    title={props.title}
                />
            )}
            </p>
        </div>
    );
}

export default CoursePreviewVideo;
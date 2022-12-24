
import { MdOndemandVideo } from 'react-icons/md';

import { GrCertificate } from 'react-icons/gr';

import { CgInfinity } from 'react-icons/cg';

import styles from './course-preview-box.module.scss';

import { ICourse } from '@/interfaces/course.interface';
import Price from '@/components/courseCard/Price';
import { formatDuration } from '@/utils/duration';

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

function CoursePreviewBox(props: ICourse) {
  const emberUrl = getEmbedUrl(props.previewVideoURL);
  return (
    <div className={`${styles['preview-box'] ?? ''} p-2 text-dark`}>
      <p
        style={{
          width: '90%',
          paddingBottom: '50.625%',
          margin: '0 auto'
        }}
      >
        {emberUrl && (
          <iframe
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            frameBorder='0'
            src={emberUrl}
            style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0
            }}
            title={props.title}
          />
        )}
      </p>
      <div className='mx-2'>
        <Price {...props.price}/>
      </div>
      <div className='my-2 text-center mx-2'>
        <button className='btn btn-dark my-1 w-100' type='button'>
          Add to Cart
        </button>
        <br />
        <button className='btn btn-light border border-2 my-1 w-100' type='button'>
          Add to Wishlist
        </button>
      </div>
      <div className='text-dark mx-2 my-2'>
          <strong>This course includes:</strong>
          <br />
          <MdOndemandVideo/>
          &nbsp;
          <span>{formatDuration(props.duration * 60)} on-demand video</span>
          <br />
          <CgInfinity />
          &nbsp;
          <span>Full lifetime access</span>
          <br />
          <GrCertificate />
          &nbsp;
          <span>Certificate of completion</span>
      </div>
    </div>
  );
}

export default CoursePreviewBox;

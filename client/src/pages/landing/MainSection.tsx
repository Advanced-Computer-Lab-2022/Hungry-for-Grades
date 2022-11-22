import styles from './MainSection.module.scss';

export default function MainSection() {
  return (
    <>
      <div
        className='fluid-container'
        style={{
          width: '100%',
          height: '32rem',
          background: '#EFF0F6'
        }}
      >
        <img
          alt='CanCham'
          className={`${styles.img_item ?? ''} img-fluid `}
          loading='lazy'
          src='https://learning.linkedin.com/content/dam/me/business/en-us/amp/learning-solutions/images/lls-homepage-2021/bg/01-dsk-b02-v01.jpg/jcr:content/renditions/01-dsk-b02-v01-2x.jpg'
        />
      </div>
    </>
  );
}

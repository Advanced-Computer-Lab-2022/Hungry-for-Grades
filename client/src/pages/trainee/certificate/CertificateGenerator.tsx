/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef, useEffect, useMemo } from 'react';
import jsPDF from 'jspdf';

import CourseRating from '../../guest/course/CourseRating';

import styles from './certificate-generator.module.scss';
import useSearchQueryCourse from './useSearchQueryCourse';
import useSearchQueryTrainee from './useSearchQueryTrainee';

import { formatDuration } from '@/utils/duration';
import ErrorMessage from '@components/error/message/ErrorMessage';

export default function CertificateGenerator() {
  const { isLoading, isError, data: courseData } = useSearchQueryCourse();
  const { isLoading: traineeIsLoading, data: traineeData } =
    useSearchQueryTrainee();
  const verifiedTraineeData = traineeData?.data?.data;
  const verifiedCourseData = courseData?.data?.data._course;
  const courseTitle = verifiedCourseData?.title;
  let date = courseData?.data?.data.dateOfCompletion;
  date = date?.split('T')[0];
  const instructorName = verifiedCourseData?._instructor[0]?.name;

  if (isError) return <ErrorMessage />;

  const [imageURL, setImageURL] = useState('');
  const canvasRef = useRef(null);
  const img = useMemo(() => new Image(), []);
  img.src = '/Certificate.png';

  useEffect(() => {
    if (
      !isLoading &&
      !traineeIsLoading &&
      verifiedCourseData &&
      verifiedTraineeData
    ) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      context.canvas.width = 770;
      context.canvas.height = 595;
      img.onload = () => {
        context.drawImage(img, 0, 0);
        context.font = 'bold 34px open sans';
        context.fillStyle = 'black';
        context.fillText(verifiedTraineeData?.name, 80, 282);
        const spaceIndexes: number[] = [];
        for (let i = 0; i < courseTitle.length; i++)
          if (courseTitle[i] === ' ') spaceIndexes.push(i);

        if (courseTitle.length <= 30) {
          context.font = 'bold 26px open sans';
          context.fillText(courseTitle, 80, 400);
        } else if (courseTitle.length > 30 && courseTitle.length <= 60) {
          context.font = 'bold 24px open sans';
          let lastSpace = 0;
          for (let i = 0; i < spaceIndexes.length; i++) {
            if (spaceIndexes[i] > 30) {
              if (i > 0) lastSpace = spaceIndexes[i - 1];
              break;
            }
          }
          context.fillText(courseTitle.slice(0, lastSpace), 80, 380);
          context.fillText(courseTitle.slice(lastSpace + 1), 80, 410);
        } else {
          const numberOfLines = Math.ceil(courseTitle.length / 40);
          console.log(spaceIndexes);
          let lastSpaceIndex = 0;
          for (let i = 0; i < numberOfLines; i++) {
            const spaceFlag = courseTitle[lastSpaceIndex] === ' ' ? 1 : 0;

            let spaceIndex = -1;
            for (let index = 0; index < spaceIndexes.length; index++) {
              if (spaceIndexes[index] > lastSpaceIndex + 40) {
                spaceIndex = spaceIndexes[index - 1];
                break;
              }
            }
            if (spaceIndex === -1) {
              spaceIndex = courseTitle.length;
            }
            context.font = 'bold 18px open sans';
            context.fillText(
              courseTitle.slice(lastSpaceIndex + spaceFlag, spaceIndex),
              80,
              372 + i * 24
            );
            lastSpaceIndex = spaceIndex;
          }
        }
        context.font = 'bold 11px open sans';
        context.fillText(date, 190, 449);
        context.font = 'bold 14px open sans';
        context.fillText(instructorName, 473, 484);
        setImageURL(canvas?.toDataURL());
      };
    }
  }, [courseData]);

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [29.7, 21]
    });
    const imgProperties = pdf.getImageProperties(imageURL);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(imageURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('certificate.pdf');
  };

  if (!imageURL)
    return (
      <>
        <div>Loading...</div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </>
    );

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='container mt-4'>
      <div className='row gx-5'>
        <div className='col-12 col-md-8 border-end border-2 pt-3 pb-3'>
          <div className='d-flex justify-content-center'>
            <img
              alt='Course Certificate'
              className='img-responsive'
              src={imageURL}
              style={{ maxWidth: '65vw' }}
            />
          </div>
        </div>
        <div className='col-sm-12 col-md-4 pt-3'>
          <div className='container mx-auto'>
            <div className='h5'>Certificate Recipient:</div>
            <div className='d-flex flex-col'>
              <span className='py-1 me-2'>
                <img
                  alt='Letter C'
                  className='rounded-circle border border-2'
                  src='/C_logo.jpg'
                  style={{ width: '40px', height: '40px' }}
                />
              </span>

              <div>
                <div className={`${styles.nameFnt || ''} pt-1`}>
                  {verifiedTraineeData?.name}
                </div>
                <div className={styles.userNameFnt}>
                  {verifiedTraineeData?.username}
                </div>
              </div>
            </div>
            <div className='h5 mt-2'>About the Course:</div>
            <div>
              <img
                alt='Course'
                className='img-fluid my-1'
                src={verifiedCourseData?.thumbnail}
                style={{ width: '95%', maxWidth: '16rem' }}
              />
              <div
                className={styles.nameFnt}
                style={{ width: '95%', maxWidth: '16rem' }}
              >
                {courseTitle}
              </div>
              <div className={styles.userNameFnt}>{instructorName}</div>
              <div
                style={{
                  width: '95%',
                  maxWidth: '16rem',
                  marginBottom: '0.1rem'
                }}
              >
                <CourseRating reviews={[]} {...verifiedCourseData.rating} />
              </div>
              <div
                className={`${styles.userNameFnt ?? ''} mb-3`}
                style={{ width: '95%', maxWidth: '16rem' }}
              >
                {verifiedCourseData?.sections.reduce(
                  (s, l) => s + l.lessons.length,
                  0
                )}{' '}
                lessons&nbsp; • &nbsp;
                {formatDuration(
                  verifiedCourseData?.sections.reduce(
                    (s, l) =>
                      s + l.lessons.reduce((s2, l2) => s2 + l2.duration, 0),
                    0
                  )
                )}
              </div>
            </div>
            <button
              className='btn btn-primary me-2'
              type='submit'
              onClick={handleDownloadPDF}
            >
              Download
            </button>
            <button className='btn btn-primary' type='submit'>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

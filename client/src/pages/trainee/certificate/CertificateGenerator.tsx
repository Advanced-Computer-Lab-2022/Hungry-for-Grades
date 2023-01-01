/* eslint-disable sonarjs/cognitive-complexity */
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import CourseRating from '../../guest/course/CourseRating';

import styles from './certificate-generator.module.scss';
import useSearchQueryCourse from './useSearchQueryCourse';

import { formatDuration } from '@/utils/duration';
import ErrorMessage from '@components/error/message/ErrorMessage';
import { UseUser } from '@/store/userStore';
import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import { toastOptions } from '@/components/toast/options';
import ShareButton from '@/components/buttons/shareButton/ShareButton';

export default function CertificateGenerator() {
  const { courseId } = useParams<{ courseId: string }>();
  const traineeData = UseUser();
  const {
    isLoading,
    isError,
    data: courseData
  } = useSearchQueryCourse(traineeData?._id as string, courseId as string);
  const verifiedCourseData = courseData?.data?.data?._course;
  const courseTitle = verifiedCourseData?.title;
  let date = courseData?.data?.data.dateOfCompletion?.toString();
  date = date?.split('T')[0];
  const instructorName = verifiedCourseData?._instructor[0]?.name;
  const [imageURL, setImageURL] = useState('');

  const img = document.createElement('img');
  img.src = '/Certificate.png';

  const { mutateAsync: sendMail } = usePostQuery();

  useEffect(() => {
    if (!isLoading && verifiedCourseData) {
      const canvas = document.createElement('canvas');
      const context: CanvasRenderingContext2D | null = canvas?.getContext('2d');
      if (context === null) return;
      context.canvas.width = 770;
      context.canvas.height = 595;
      img.onload = () => {
        context.drawImage(img, 0, 0);
        context.font = 'bold 34px open sans';
        context.fillStyle = 'black';
        context.fillText(traineeData?.name as string, 80, 282);
        const spaceIndexes: number[] = [];
        for (let i = 0; i < (courseTitle ? courseTitle.length : 0); i++)
          if (courseTitle && courseTitle[i] === ' ') spaceIndexes.push(i);

        if (courseTitle && courseTitle.length <= 30) {
          context.font = 'bold 26px open sans';
          context.fillText(courseTitle, 80, 400);
        } else if (
          courseTitle &&
          courseTitle.length > 30 &&
          courseTitle.length <= 60
        ) {
          context.font = 'bold 24px open sans';
          let lastSpace = 0;
          for (let i = 0; i < spaceIndexes.length; i++) {
            if ((spaceIndexes[i] as number) > 30) {
              if (i > 0) lastSpace = spaceIndexes[i - 1] as number;
              break;
            }
          }
          context.fillText(courseTitle.slice(0, lastSpace), 80, 380);
          context.fillText(courseTitle.slice(lastSpace + 1), 80, 410);
        } else {
          const numberOfLines = Math.ceil(
            courseTitle ? courseTitle.length / 40 : 0
          );
          let lastSpaceIndex = 0;
          for (let i = 0; i < numberOfLines; i++) {
            const spaceFlag =
              courseTitle && courseTitle[lastSpaceIndex] === ' ' ? 1 : 0;

            let spaceIndex = -1;
            for (let index = 0; index < spaceIndexes.length; index++) {
              if ((spaceIndexes[index] as number) > lastSpaceIndex + 40) {
                spaceIndex = spaceIndexes[index - 1] as number;
                break;
              }
            }
            if (spaceIndex === -1) {
              spaceIndex = courseTitle?.length as number;
            }
            context.font = 'bold 18px open sans';
            if (courseTitle)
              context.fillText(
                courseTitle.slice(lastSpaceIndex + spaceFlag, spaceIndex),
                80,
                372 + i * 24
              );
            lastSpaceIndex = spaceIndex;
          }
        }
        context.font = 'bold 11px open sans';
        if (date) context.fillText(date.toString(), 190, 449); // need to be revised
        context.font = 'bold 14px open sans';
        context.fillText(instructorName as string, 473, 484);
        setImageURL(canvas?.toDataURL());
      };
    }
  }, [
    courseData,
    courseTitle,
    date,
    img,
    instructorName,
    isLoading,
    traineeData,
    verifiedCourseData
  ]);

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

  async function sendOnMail() {
    const pdf: jsPDF = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [29.7, 21]
    });

    const imgProperties = pdf.getImageProperties(imageURL);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(imageURL, 'PNG', 0, 0, pdfWidth, pdfHeight);

    const tmp = pdf.output('datauristring');

    const mail = TraineeRoutes.POST.sendCertificateByMail;

    //alert(`trainee/${traineeData?._id as string}/course/${courseId as string}/certificate` )
    mail.URL = `/trainee/${traineeData?._id as string}/course/${
      courseId as string
    }/certificate`;

    mail.payload = { certificate: tmp };

    await toast.promise(
      sendMail(mail),
      {
        pending: 'Sending Certificate',
        success: 'Certificate Sent',
        error: 'Error Sending Certificate'
      },
      toastOptions
    );
  }

  if (isError) return <ErrorMessage />;
  if (isLoading) return <LoaderComponent />;
  return (
    <div className='container-md mt-4'>
      <div className='row gx-5'>
        <div className='col-12 col-md-8 border-end border-2 py-3'>
          <div className='d-flex justify-content-center'>
            <img
              alt='Course Certificate img'
              className='img-responsive'
              src={imageURL}
              style={{ maxWidth: '65vw', width: '100%' }}
            />
          </div>
        </div>
        <div className='col-sm-12 col-md-4 pt-3 d-flex justify-content-md-start justify-content-center'>
          <div>
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
                  {traineeData?.name}
                </div>
                <div className={styles.userNameFnt}>
                  {traineeData?.username}
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
                $
                {verifiedCourseData && (
                  <CourseRating {...verifiedCourseData.rating} />
                )}
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
                {verifiedCourseData &&
                  formatDuration(
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
            <ShareButton link={`course/${courseId as string}`} />
            <button
              className='btn btn-primary'
              type='submit'
              onClick={() => sendOnMail()}
            >
              Send by Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

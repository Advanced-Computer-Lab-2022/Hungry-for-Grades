import jsPDF from 'jspdf';

import { toast } from 'react-toastify';

import { toastOptions } from '@/components/toast/options';
import { ICourse } from '@/interfaces/course.interface';
import { IUser } from '@/interfaces/user.interface';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';



// eslint-disable-next-line sonarjs/cognitive-complexity
export async function autoMail(traineeData:IUser, courseData : ICourse, sendMail: (arg0: { URL: string; params: string; query: string; payload: unknown; }) => Promise<unknown> | (() => Promise<unknown>))
{
    let imgURL = '';
    const verifiedCourseData = courseData;
  const courseTitle = verifiedCourseData?.title;
  let date = (new Date()).toString() ;
  date = date?.split('T')[0] as string;
  const instructorName = verifiedCourseData?._instructor[0]?.name;
    const img = document.createElement('img');
  img.src = '/Certificate.png';

    const canvas = document.createElement('canvas');
      const context: CanvasRenderingContext2D | null = canvas?.getContext('2d');
      if (context === null) return;
      context.canvas.width = 770;
      context.canvas.height = 595;
      img.onload = () => {
        context.drawImage(img, 0, 0);
        context.font = 'bold 34px open sans';
        context.fillStyle = 'black';
        context.fillText(traineeData?.name , 80, 282);
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
              spaceIndex = courseTitle?.length ;
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
        imgURL = (canvas?.toDataURL());
    }

    const pdf: jsPDF = new jsPDF({
        orientation: 'landscape',
        unit: 'cm',
        format: [29.7, 21]
      });
  
      const imgProperties = pdf.getImageProperties(imgURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(imgURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
      const tmp = pdf.output('datauristring');
  
      const mail = TraineeRoutes.POST.sendCertificateByMail;
  
      //alert(`trainee/${traineeData?._id as string}/course/${courseId as string}/certificate` )
      mail.URL = `/trainee/${traineeData?._id }/course/${
        courseData?._id
      }/certificate`;
  
      mail.payload = { certificate: tmp };
  
    await toast.promise(
        sendMail(mail),
        {
          pending: 'Sending Certificate to your email ....'
        },
        toastOptions
      );

}
import { useQuery } from '@tanstack/react-query';

import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { FiSend } from 'react-icons/fi';

import { useState } from 'react';

import styles from './FollowUp.module.scss';

import { Message, Report } from '@/interfaces/reports.interface';
import { UseUser } from '@/store/userStore';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { HttpResponse } from '@/interfaces/response.interface';
import { ITrainee } from '@/interfaces/course.interface';

async function getReport(id: string) {
  const report = ReportDataService.GET.getReportById;

  report.URL = `/report/${id}`;

  const response = await getRequest<HttpResponse<Report>>(report);

  const person = TraineeRoutes.GET.getTrainee;
  person.URL = `/trainee/${response?.data?.data?._user as unknown as string}`;

  const person2 = await getRequest<HttpResponse<ITrainee>>(person);

  return {
    report: response?.data?.data,
    img: person2?.data?.data?.profileImage
  };
}

export default function FollowUp() {
  const user = UseUser();

  const param = useParams();

  const [searchParams] = useSearchParams();

  const [txt, setTxt] = useState<string>('');

  const [update, setUpdate] = useState(0);

  const loc = useLocation();

  const reportID = param?.reportId;
  const trainee = searchParams.get('trainee') as string;

  const { data } = useQuery(
    ['get me a report right nowwwww', loc, update],
    () => getReport(reportID as string),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    }
  );

  const { mutateAsync: sendMessage } = usePostQuery();

  /*if(isLoading)
  {
    return <Loader />
  }*/

  console.log(data);

  const report = data?.report;

  console.log(report);

  let i = -1;
  const img =
    trainee == 'true'
      ? 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=640'
      : data?.img;

  const toShow = report?.followUp?.map((message: Message) => {
    const sender: boolean = (trainee == 'true') !== message?.isAdmin;

    return (
      <div key={++i} className='row my-2'>
        <div className='col-1'>
          {!sender && (
            <img
              alt={'Some Dude'}
              height='35'
              src={img}
              style={{ borderRadius: '50px' }}
              width='40'
            />
          )}
        </div>
        <div
          className={`col-11 d-flex ${
            sender ? 'justify-content-end' : 'justify-content-start'
          }`}
        >
          <div
            className={` ${
              sender ? styles.sender || '' : styles.receiver || ''
            }`}
            style={{ minWidth: '3rem', padding: '0.5rem 0.7rem' }}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  });

  async function SendMessage() {
    const message = ReportDataService.POST.sendMessage;

    message.URL = `/report/${report?._id as string}/user/${
      user?._id as string
    }`;

    message.payload = {
      content: `${txt}`
    };

    await sendMessage(message);
    setUpdate(update + 1);
    setTxt('');
  }

  return (
    <>
      <div
        className='container'
        style={{ maxWidth: '40rem', margin: '3rem auto' }}
      >
        <div
          className='text-center'
          style={{
            fontSize: '1.5rem',
            fontWeight: '500',
            color: '#a00407',
            marginBottom: '2rem'
          }}
        >
          Follow Ups with the {trainee == 'true' ? 'Admin' : 'User'}
        </div>
        <div className={styles.message_holder}>{toShow}</div>

        <div className={styles.send_message}>
          <textarea
            className={styles.message}
            value={txt}
            onChange={e => setTxt(e.target.value)}
          />
          <button
            style={{ border: 'none' }}
            type='button'
            onClick={() => SendMessage()}
          >
            <FiSend style={{ color: '#a00407', fontSize: '1.4rem' }} />
          </button>
        </div>
      </div>
    </>
  );
}

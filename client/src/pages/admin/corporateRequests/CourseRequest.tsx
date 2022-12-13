import { useReqQuery } from './useReqQuery';

import { AllReport } from '@/interfaces/reports.interface';
import AdminTable from '@pages/admin/adminTable/AdminTable';
import Loader from '@/components/loader/loaderpage/Loader';

export default function CourseRequest() {
  const { data, isLoading } = useReqQuery();

  if (isLoading) {
    return <Loader />;
  }

  const arr = data?.data?.data;

  return (
    <>
      <div
        style={{
          marginTop: '3rem',
          backgroundColor: '#F5F7F8',
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            marginLeft: '3rem',
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#A00407',
            display: 'inline-block'
          }}
        >
          Course Requests
        </div>
        <div style={{ display: 'inline-block' }}>AA</div>
        <div style={{ marginLeft: '3rem', marginTop: '1.5rem' }}>
          <AdminTable data={arr as AllReport[]} />
        </div>
      </div>
    </>
  );
}

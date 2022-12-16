import { useRef, useState } from 'react';

import { AiFillPlusCircle } from 'react-icons/ai';

import { Overlay } from 'react-bootstrap';

import { toast } from 'react-toastify';

import { useReqQuery } from './useReqQuery';

import styles from './CourseRequest.module.scss';

import {
  AllReport,
  FilterAdmin,
  FilterElement,
  Status
} from '@/interfaces/reports.interface';

import Loader from '@/components/loader/loaderpage/Loader';

import AdminTable from '@pages/admin/adminTable/AdminTable';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';

import usePatchQuery from '@/hooks/usePatchQuery';
import { toastOptions } from '@/components/toast/options';

import Filter from '@pages/admin/adminTable/Filter';

export default function CourseRequest() {
  const [set, setSet] = useState(new Set());

  const [update, setUpdate] = useState(0);

  const target = useRef(null);

  const [visible, setVisible] = useState<boolean>(false);

  function removeFoo(foo: AllReport) {
    setSet(prev => new Set([...prev].filter(x => x !== foo)));
  }

  function addFoo(foo: AllReport) {
    setSet(prev => new Set(prev.add(foo)));
  }

  const [filterV1, setFilterV1] = useState<string>('All');

  const f1: FilterElement = {
    values: ['Resolved', 'Pending', 'Rejected', 'All'],
    setValue: setFilterV1,
    actualValue: filterV1,
    title: 'Status'
  };

  const filters: FilterAdmin = { att: [f1] };

  const { data, isLoading } = useReqQuery(update, filterV1);

  const { mutateAsync: updateReport } = usePatchQuery();

  if (isLoading) {
    return <Loader />;
  }

  const arr = data?.data?.data;

  function test() {
    setVisible(!visible);
  }

  async function applyAll(status: Status) {
    const arrSet: AllReport[] = Array.from(set) as AllReport[];
    for (let i = 0; i < arrSet?.length; ++i) {
      const currId: string = arrSet[i]?._id as string;

      const Rep = ReportDataService.PATCH.updateReport;

      Rep.URL = `/report/${currId}`;

      Rep.payload = {
        status: status
      };

      await updateReport(Rep);
    }
    setSet(new Set());
    toast.success('Actions are applied successfully...', toastOptions);
    setUpdate(update + 1);
  }

  return (
    <>
      <div
        style={{ backgroundColor: '#F5F7F8', width: '100%', height: '100%' }}
      >
        <div
          style={{
            marginLeft: '3rem',
            fontSize: '1.4rem',
            fontWeight: '500',
            color: '#A00407',
            display: 'inline-block',
            marginTop: '2rem'
          }}
        >
          Course Requests
        </div>
        <div style={{ display: 'inline-block', marginLeft: '75%' }}>
          <button
            ref={target}
            style={{
              backgroundColor: '#A00407',
              color: 'white',
              fontWeight: '600',
              marginTop: '2rem'
            }}
            type='button'
            onClick={() => test()}
          >
            Actions({set?.size}) &nbsp;
            <AiFillPlusCircle />
          </button>

          <Overlay placement='bottom' show={visible} target={target?.current}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                className={styles.drop_down}
                {...props}
                style={{
                  borderRadius: 3,
                  ...props.style,
                  marginTop: '10px',
                  zIndex: 9999
                }}
              >
                <button
                  style={{ display: 'block' }}
                  type='button'
                  onClick={() => applyAll(Status.RESOLVED)}
                >
                  Accept all
                </button>
                <button type='button' onClick={() => applyAll(Status.REJECTED)}>
                  Reject all
                </button>
              </div>
            )}
          </Overlay>
        </div>
        <div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
          <Filter elements={filters} fun={setSet} />
        </div>

        <div style={{ marginLeft: '3rem', marginTop: '1.5rem' }}>
          <AdminTable
            data={arr as AllReport[]}
            funA={addFoo}
            funR={removeFoo}
            num={update}
            st={set as Set<AllReport>}
            updateTable={setUpdate}
          />
        </div>
      </div>
    </>
  );
}

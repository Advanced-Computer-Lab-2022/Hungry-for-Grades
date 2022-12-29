import { useRef, useState } from 'react';
import { Overlay } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';

import { toast } from 'react-toastify';

import RefundTable from './RefundTable';

import styles from './Refund.module.scss';

import { useRefundQuery } from './useRefunds';

import { AllReport, Status } from '@/interfaces/reports.interface';
import { toastOptions } from '@/components/toast/options';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import usePatchQuery from '@/hooks/usePatchQuery';
import Pagination from '@/components/pagination/Pagination';
import Loader from '@/components/loader/loaderpage/Loader';
import { PaymentRoutes } from '@/services/axios/dataServices/PaymenrDataService';
import { UseUser } from '@/store/userStore';
import usePostQuery from '@/hooks/usePostQuery';

export default function Refund() {
  const [set, setSet] = useState(new Set());

  const [update, setUpdate] = useState(0);

  const target = useRef(null);

  const user = UseUser();

  const [visible, setVisible] = useState<boolean>(false);

  const { mutateAsync: updateReport } = usePatchQuery();

  const { mutateAsync: makeTheRefund } = usePostQuery();

  const { data, isLoading, activePage, setActivePage } = useRefundQuery(
    update,
    'All'
  );

  if (isLoading) {
    return <Loader />;
  }

  function removeFoo(foo: AllReport) {
    setSet(prev => new Set([...prev].filter(x => x !== foo)));
  }

  function addFoo(foo: AllReport) {
    setSet(prev => new Set(prev.add(foo)));
  }

  function updateTable() {
    setUpdate(update + 1);
  }

  async function applyAll(status: Status) {
    const arrSet: AllReport[] = Array.from(set) as AllReport[];
    for (let i = 0; i < arrSet?.length; ++i) {
      const currId: string = arrSet[i]?._id as string;

      //const courseId: string = arrSet[i]?._course?.at(0)?._id as string;

      const Rep = ReportDataService.PATCH.updateReport;

      Rep.URL = `/report/${currId}`;

      Rep.payload = {
        status: status
      };

      await updateReport(Rep);
     /* if (status == Status.RESOLVED) {
        const Reffund = PaymentRoutes.POST.Refund;

        Reffund.URL = `/payment/refund/trainee/${
          user?._id as string
        }/course/${courseId}`;

        await makeTheRefund(Reffund);
      }*/
    }
    setSet(new Set());
    toast.success('Actions are applied successfully...', toastOptions);
    setUpdate(update + 1);
  }

  return (
    <>
      <div
        className='py-5'
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
          Reported Problems
        </div>
        <div style={{ display: 'inline-block', marginLeft: '75%' }}>
          <button
            ref={target}
            disabled = {set.size == 0}
            style={{
              backgroundColor: '#A00407',
              color: 'white',
              fontWeight: '600',
              marginTop: '2rem'
            }}
            type='button'
            onClick={() => setVisible(!visible)}
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

        <div style={{ marginLeft: '3rem', marginTop: '1.5rem' }}>
          <RefundTable
            data={data?.data?.data as unknown as AllReport[]}
            funA={addFoo}
            funR={removeFoo}
            num={update}
            st={set as Set<AllReport>}
            updateTable={updateTable}
          />
          { data?.data?.totalPages != undefined && data?.data?.totalPages > 1 &&
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages}
            setActivePage={setActivePage}
          />
          }
        </div>
      </div>
    </>
  );
}

import {  useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import DiscountTable from './DiscountTable';

import { useGetCourses } from './useGetCourses';

import Loader from '@/components/loader/loaderpage/Loader';
import { ICourse } from '@/interfaces/course.interface';

import DiscountModal from '@/pages/admin/addDiscounts/DiscountModal';
import Pagination from '@/components/pagination/Pagination';

export default function MakeDiscounts() {
  const [set, setSet] = useState(new Set());

  const [showModal, setShowModal] = useState<boolean>(false);

  const [update, setUpdate] = useState(0);

  function handleUpdate() {
    setUpdate(update + 1);
  }

  const { data, isLoading, activePage, setActivePage } = useGetCourses(update);

  const arr: ICourse[] = data?.data?.data as ICourse[];

  if (isLoading) {
    return <Loader />;
  }

  function closeModal() {
    setShowModal(false);
  }

  function removeFoo(foo: ICourse) {
    setSet(prev => new Set([...prev].filter(x => x !== foo)));
  }

  function addFoo(foo: ICourse) {
    setSet(prev => new Set(prev.add(foo)));
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
          Course Discounts
        </div>
        <div style={{ display: 'inline-block', marginLeft: '75%' }}>
          <button
            disabled = {set.size == 0}
            style={{
              backgroundColor: '#A00407',
              color: 'white',
              fontWeight: '600',
              marginTop: '2rem'
            }}
            type='button'
            onClick={() => setShowModal(true)}
          >
            Add Discount({set?.size}) &nbsp;
            <AiFillPlusCircle />
          </button>
        </div>

        <div style={{ marginLeft: '3rem', marginTop: '1.5rem' }}>
          <DiscountTable
            data={arr}
            funA={addFoo}
            funR={removeFoo}
            st={set as Set<ICourse>}
          />
          {
            data?.data?.totalPages != undefined && data?.data?.totalPages > 1 &&
          <Pagination activePage={activePage} pages={data?.data?.totalPages} setActivePage={setActivePage} />
          }
        </div>
        {showModal && (
          <DiscountModal
            handleClose={closeModal}
            id={set as Set<ICourse>}
            updateFunc={handleUpdate}
          />
        )}
      </div>
    </>
  );
}

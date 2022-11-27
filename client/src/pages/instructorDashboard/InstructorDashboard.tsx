// import InstructorCoursesSection from './InstructorCoursesSection';
// import useSearchQuery from './useSearchQuery';
// import { useSeletedFilters } from './useSelectedFilters';

// import Pagination from '@/components/pagination/Pagination';

// function InstructorDashboard() {
//   const [selectedFilters, setSelectedFilters] = useSeletedFilters();
//   const { isLoading, isError, data, error, activePage, setActivePage } =
//     useSearchQuery(selectedFilters);
//   if (isError) return <div>{error?.message}</div>;
//   return (
//     <>
//       <div className='container px-0 my-3'>
//         <input
//           aria-describedby='search-addon'
//           aria-label='Search'
//           className='form-control rounded input'
//           name={'searchTerm'}
//           placeholder='Search by the course name ...'
//           type='search'
//           value={selectedFilters.searchTerm}
//           onChange={e => {
//             setSelectedFilters(prev => {
//               return { ...prev, [e.target.name]: e.target.value };
//             });
//           }}
//         />
//       </div>
//       {!isLoading && (
//         <>
//           <InstructorCoursesSection {...data?.data} />
//           <Pagination
//             activePage={activePage}
//             pages={data?.data?.totalPages as number}
//             setActivePage={setActivePage}
//           />
//         </>
//       )}
//     </>
//   );
// }

// export default InstructorDashboard;

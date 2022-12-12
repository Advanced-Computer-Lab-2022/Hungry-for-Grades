function SearchSection(props: {
  setSelectedFilters: any;
  selectedFilters: any;
}) {
  const { setSelectedFilters, selectedFilters } = props;

  return (
    <div className='container px-0 my-3'>
      <input
        aria-describedby='search-addon'
        aria-label='Search'
        className='form-control rounded input'
        name={'searchTerm'}
        placeholder='Search by the course name ...'
        type='search'
        value={selectedFilters.searchTerm}
        onChange={e => {
          setSelectedFilters((prev: any) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
        }}
      />
    </div>
  );
}

export default SearchSection;

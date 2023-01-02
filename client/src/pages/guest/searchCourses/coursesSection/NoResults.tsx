function NoResults() {
  return (
    <div className='text-start'>
      <h3>Sorry, we couldnt find any results for</h3>
      <h4>Try adjusting your search. Here are some ideas:</h4>
      <ul>
        <li className='list-group-item '>
          &#x2713; &nbsp; Make sure all words are spelled correctly
        </li>
        <li className='list-group-item'>
          &#x2713; &nbsp; Try more general search terms
        </li>
        <li className='list-group-item'>
          &#x2713; &nbsp; Try different search terms
        </li>
      </ul>
    </div>
  );
}

export default NoResults;

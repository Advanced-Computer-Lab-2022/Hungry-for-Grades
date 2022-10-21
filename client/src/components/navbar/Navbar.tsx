function Navbar() {
  return (
    <div className='dropdown'>
      <button
        aria-expanded='false'
        className='btn btn-secondary dropdown-toggle'
        data-bs-toggle='dropdown'
        type='button'
      >
        Dropdown button
      </button>
      <ul className='dropdown-menu'>
        <li>
          <a className='dropdown-item' href='/'>
            Action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='/'>
            Another action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='/'>
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

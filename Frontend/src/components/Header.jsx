import React from 'react';
import 'boxicons/css/boxicons.min.css';

const Header = () => {
  return (
    <header className="h-14 bg-white px-6 flex items-center gap-6 sticky top-0 z-10" style={{ background: "#F9F9F9" }}>
      <button aria-label="Toggle menu" className="text-2xl">
        <i className='bx bx-menu cursor-pointer'></i>
      </button>
      <a href="#" className="nav-link text-lg text-gray-800" aria-label="Categories">Categories</a>
      <form action="#" className="max-w-md w-full mr-auto" aria-label="Search form">
        <div className="form-input flex items-center h-9">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            className="flex-grow px-4 h-full bg-gray-200 rounded-l-full text-gray-800 outline-none"
          />
          <button type="submit" className="w-9 h-full bg-blue-500 text-white rounded-r-full flex items-center justify-center" aria-label="Search">
            <i className='bx bx-search'></i>
          </button>
        </div>
      </form>
      <a href="#" className="profile" aria-label="Profile">
        <img src="img/hardik.png" alt="profile" className="w-9 h-9 rounded-full object-cover" />
      </a>
    </header>
  );
};

export default Header;

import React, { useEffect, useRef } from 'react';
import '../index.css';

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const menuBarRef = useRef(null);
  const searchButtonRef = useRef(null);
  const searchButtonIconRef = useRef(null);
  const searchFormRef = useRef(null);
  const switchModeRef = useRef(null);

  useEffect(() => {
    const handleMenuClick = () => {
      sidebarRef.current.classList.toggle('hide');
    };

    const handleSearchClick = (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchFormRef.current.classList.toggle('show');
        if (searchFormRef.current.classList.contains('show')) {
          searchButtonIconRef.current.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIconRef.current.classList.replace('bx-x', 'bx-search');
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 576) {
        searchButtonIconRef.current.classList.replace('bx-x', 'bx-search');
        searchFormRef.current.classList.remove('show');
      }
    };

    const handleSwitchModeChange = () => {
      if (switchModeRef.current.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach((item) => {
      const li = item.parentElement;
      item.addEventListener('click', function () {
        allSideMenu.forEach((i) => {
          i.parentElement.classList.remove('active');
        });
        li.classList.add('active');
      });
    });

    menuBarRef.current.addEventListener('click', handleMenuClick);
    searchButtonRef.current.addEventListener('click', handleSearchClick);
    window.addEventListener('resize', handleResize);
    switchModeRef.current.addEventListener('change', handleSwitchModeChange);

    if (window.innerWidth < 768) {
      sidebarRef.current.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIconRef.current.classList.replace('bx-x', 'bx-search');
      searchFormRef.current.classList.remove('show');
    }

    return () => {
      menuBarRef.current.removeEventListener('click', handleMenuClick);
      searchButtonRef.current.removeEventListener('click', handleSearchClick);
      window.removeEventListener('resize', handleResize);
      switchModeRef.current.removeEventListener('change', handleSwitchModeChange);
    };
  }, []);

  return (
    <div>
      <nav ref={menuBarRef} className="bx bx-menu">Menu</nav>
      <div id="sidebar" ref={sidebarRef} className="sidebar">
        {/* Your sidebar content */}
        <section id="sidebar">
      <a href="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">AdminHub</span>
      </a>
      <ul className="side-menu top">
        <li className="active">
          <a href="#">
            <i className='bx bxs-dashboard' ></i>
            <span className="text"></span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bxs-shopping-bag-alt' ></i>
            <span className="text">All Inventory</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bxs-doughnut-chart' ></i>
            <span className="text">Analytics</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bxs-message-dots' ></i>
            <span className="text">Message</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className='bx bxs-group' ></i>
            <span className="text">Team</span>
          </a>
        </li>
      </ul>
      <ul className="side-menu">
        <li>
          <a href="#">
            <i className='bx bxs-cog' ></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" className="logout">
            <i className='bx bxs-log-out-circle' ></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
      </div>
      <form ref={searchFormRef}>
        <div className="form-input">
          <input type="text" />
          <button ref={searchButtonRef}>
            <i ref={searchButtonIconRef} className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" ref={switchModeRef} />
    </div>
  );
};

export default Sidebar;

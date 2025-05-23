'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import menuData from './menuData';
import { UserAuth } from '@/config/AuthContext';
import BugReportButton from '../BugReport/BugReport';
import UserDropDown from './userDropDown';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, isGameOpen } = UserAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const usePathName = usePathname();
  const router = useRouter();
  const navbarRef = useRef<HTMLDivElement>(null);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined' && isGameOpen) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <header className="header fixed top-0 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-center w-full max-w-screen-2xl bg-white bg-opacity-60 py-4 shadow-sticky backdrop-blur-sm transition rounded-full mt-8">
      <div className="container px-6 lg:px-12">
        <div className="relative flex items-center justify-between">
          {/* Logo Section */}
          <div className="w-36 flex-shrink-0">
            <Image
              onClick={() => handleNavigation('/')}
              src="/MonteryaNoicon.png"
              alt="logo"
              width={140}
              height={30}
              className="w-full cursor-pointer transition-transform active:scale-95"
            />
          </div>

          {/* Add spacing between logo and menu */}
          <div className="flex items-center justify-between w-full ml-8 lg:ml-12">
            {/* Navigation Menu */}
            <nav
              id="navbarCollapse"
              ref={navbarRef}
              className={`lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 absolute right-0 z-30 w-[250px] rounded-lg bg-white px-6 py-4 lg:flex lg:space-x-6 ${
                navbarOpen
                  ? 'visible top-full opacity-100'
                  : 'invisible top-[120%] opacity-0'
              } transition-all duration-300`}
            >
              <ul className="block lg:flex lg:space-x-6">
                {menuData.map((menuItem: any, index: number) => (
                  <li key={index} className="relative group">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        className={`flex items-center px-4 py-2 text-base lg:inline-flex lg:px-6 cursor-pointer ${
                          usePathName === menuItem.path
                            ? 'text-blue-600 font-bold bg-blue-100 rounded-lg shadow-md transition-all'
                            : 'text-slate-900 hover:text-blue-500 dark:text-white font-bold hover:bg-white/10 rounded-lg transition-all active:scale-95 active:bg-blue-200 active:text-blue-700'
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center py-2 text-base text-dark lg:py-4"
                          aria-expanded={openIndex === index}
                          aria-haspopup="true"
                        >
                          {menuItem.title}
                          <span className="pl-3">
                            <svg width="25" height="24" viewBox="0 0 25 24">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={`absolute left-0 top-full w-[200px] bg-white rounded-lg shadow-md transition-transform duration-300 ${
                            openIndex === index ? 'block' : 'hidden'
                          }`}
                        >
                          {menuItem.submenu.map(
                            (submenuItem: any, subIndex: number) => (
                              <Link
                                href={submenuItem.path}
                                key={subIndex}
                                className="block px-4 py-2 text-sm text-dark hover:bg-gray-200"
                              >
                                {submenuItem.title}
                              </Link>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="lg:hidden block rounded-lg p-3 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition duration-300 ease-in-out absolute right-4"
            >
              {navbarOpen ? (
                <FaTimes
                  className="text-white text-sm"
                />
              ) : (
                <FaBars
                  className="text-white text-sm"
                />
              )}
            </button>

            {/* User Actions and Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <UserDropDown />
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-900 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-blue-700 active:scale-95 active:bg-gray-200 active:border-blue-500 transition duration-200 ease-in-out"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-900 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-blue-700 active:scale-95 active:bg-gray-200 active:border-blue-500 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </>
              )}
              <Link
                href="/gameEngine"
                className="rounded-full bg-blue-700 hover:bg-blue-600 px-4 py-1.5 sm:px-6 sm:py-2 text-sm sm:text-base font-medium text-white shadow-lg transition duration-300 w-[150px] sm:w-[250px] hidden sm:inline-flex items-center justify-center"
              >
                <span className="mr-2">Start Playing</span>
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

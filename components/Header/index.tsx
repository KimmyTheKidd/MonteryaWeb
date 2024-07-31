"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { UserAuth } from "@/config/AuthContext";
import BugReportButton from "../BugReport/BugReport";
import UserDropDown from "./userDropDown";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { user, isGameOpen } = UserAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const usePathName = usePathname();
  const router = useRouter();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleSubmenu = (index: any) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const handleNavigation = (path: any) => {
    if (isGameOpen) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <header
    className={`header fixed top-0 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-center w-full max-w-screen-2xl bg-black bg-opacity-40 py-6 lg:py-4 shadow-sticky backdrop-blur-sm transition rounded-xl mt-10`}
    >
      <div className="container">
        <div className="relative flex items-center justify-between mx-4 xl:mx-0">
          <div className="w-40 px-4 xl:mr-12">
            <Image
              onClick={() => handleNavigation("/")}
              src="/MonteryaNoicon.png"
              alt="logo"
              width={140}
              height={30}
              className="w-full dark:hidden hover:cursor-pointer"
            />
            <Image
              src="/MonteryaNoicon.png"
              alt="logo"
              width={140}
              height={30}
              className="hidden w-full dark:block"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            {/* For the X when miniize */}
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 block rounded-lg px-3 py-2 lg:hidden"
            >
              <span
                className={`block h-0.5 w-[30px] bg-white transition-all duration-300 ${
                  navbarOpen ? "rotate-45" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-[30px] bg-white transition-all duration-300 ${
                  navbarOpen ? "-rotate-45" : ""
                }`}
              />
            </button>

            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[250px] rounded-lg bg-black px-6 py-4 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                navbarOpen
                  ? "visible top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:space-x-4">
                {menuData.map((menuItem: any, index: any) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <a
                        onClick={() => handleNavigation(menuItem.path)}
                        className={`flex items-center px-4 py-2 text-base lg:mr-0 lg:inline-flex lg:px-6 lg:py-2 cursor-pointer ${
                          usePathName === menuItem.path
                            ? "text-rose-600 font-bold"
                            : "text-dark hover:text-white dark:text-white font-bold hover:bg-white/10 rounded transition-all"
                        }`}
                      >
                        {menuItem.title}
                      </a>
                    ) : (
                      <>
                        <p
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
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
                        </p>
                        <div
                          className={`submenu absolute left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100  lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                            openIndex === index ? "block" : "hidden"
                          }`}
                        >
                          {menuItem.submenu.map(
                            (submenuItem: any, subIndex: any) => (
                              <a
                                onClick={() =>
                                  handleNavigation(submenuItem.path)
                                }
                                key={subIndex}
                                className="block rounded py-2.5 text-sm text-dark hover:bg-gray-200  lg:px-3 cursor-pointer"
                              >
                                {submenuItem.title}
                              </a>
                            )
                          )}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-end pr-16 lg:pr-8">
              {user ? (
                <div className="flex space-x-6">
                  <UserDropDown />
                  <BugReportButton />
                </div>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className={`px-6 py-2 text-base font-medium text-dark hover:bg-white/10 md:block cursor-pointer rounded transition-all`}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className={`px-6 py-2 text-base font-medium text-dark hover:bg-white/10 md:block cursor-pointer rounded transition-all`}
                  >
                    Login
                  </Link>
                </>
              )}

              <Link
                href="/gameEngine"
                className="hidden ml-4 mr-4 rounded-lg bg-blue-600 hover:bg-blue-500 px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:flex md:items-center md:justify-center md:px-9 lg:px-6 xl:px-9 cursor-pointer"
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

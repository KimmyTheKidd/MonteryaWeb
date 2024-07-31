import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Patch Notes",
    path: "/patches",
    newTab: false,
  },
  {
    id: 33,
    title: "Road Map",
    path: "/roadmap",
    newTab: false,
  },
  {
    id: 33,
    title: "Game Wiki",
    path: "/GameWiki",
    newTab: false,
  }
  // {
  //   id: 3,
  //   title: "Support",
  //   path: "/contact",
  //   newTab: false,
  // },
  // {
  //   id: 4,
  //   title: "Pages",
  //   newTab: false,
  //   submenu: [
  //     {
  //       id: 48,
  //       title: "Error Page",
  //       path: "/error",
  //       newTab: false,
  //     },
  //   ],
  // },
];
export default menuData;

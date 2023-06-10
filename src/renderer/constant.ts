export enum Path {
  Home = '/home',
  Bookshelf="bookshelf",
  SourceManger="sourcemanger",
}

export const BASE_INFO = {
  appName: 'Reader',
  author: 'aakqaj',
  link: 'https://github.com/aakqaj/electron-react-shu',
};

export const SideBarConfig = [
  {
    title: '书架',
    path: '/home/bookshelf',
  },
  {
    title: '书源管理',
    path: '/home/sourcemanger',
  },
  {
    title: '书架管理',
    path: '/home/setting',
  },
  {
    title: '快捷键',
    path: '/home/settin',
  },

  {
    title: '关于',
    path: '/home/about',
  },
];

export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

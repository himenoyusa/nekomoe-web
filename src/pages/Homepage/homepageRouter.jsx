import loadable from '@loadable/component';

// const MainPage = loadable(() => import('./components/MainPage'), {
//   fallback: null,
// });

// const DetailPage = loadable(() => import('./components/DetailPage'), {
//   fallback: null,
// });

// const SearchPage = loadable(() => import('./components/SearchPage'), {
//   fallback: null,
// });

import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';
import SearchPage from './components/SearchPage';

const homepageRouter = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/detail/:name',
    component: DetailPage,
  },
  {
    path: '/search/:keyword',
    component: SearchPage,
  },
];

export default homepageRouter;

import loadable from '@loadable/component';

const MainPage = loadable(() => import('./components/MainPage'), {
  fallback: null,
});

const DetailPage = loadable(() => import('./components/DetailPage'), {
  fallback: null,
});

const homepageRouter = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/detail/:name',
    component: DetailPage,
  },
];

export default homepageRouter;

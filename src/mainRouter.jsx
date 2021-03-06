import loadable from '@loadable/component';

const Homepage = loadable(() => import('./pages/Homepage'), {
  fallback: null,
});

const Admin = loadable(() => import('./pages/Admin'), {
  fallback: null,
});

const mainRouter = [
  {
    path: '/admin',
    component: Admin,
  },
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '*',
    component: () => 404,
  },
];

export default mainRouter;

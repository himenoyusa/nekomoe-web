import loadable from '@loadable/component';

const Homepage = loadable(() => import('./pages/Homepage'), {
  fallback: null,
});

const Admin = loadable(() => import('./pages/Admin'), {
  fallback: null,
});

const mainRouter = [
  {
    path: '/',
    component: Homepage,
  },
  {
    path: '/admin',
    component: Admin,
  },
];

export default mainRouter;

import loadable from '@loadable/component';

const Homepage = loadable(() => import('./pages/Homepage'), {
  fallback: 'loading',
});

const Admin = loadable(() => import('./pages/Admin'), {
  fallback: 'loading',
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

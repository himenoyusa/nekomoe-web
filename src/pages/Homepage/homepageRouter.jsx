import React from 'react';

import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';
import SearchPage from './components/SearchPage';

const homepageRouter = [
  {
    path: '/',
    component: (match) => <MainPage match={match} />,
  },
  {
    path: '/detail/:name',
    component: (match) => <DetailPage match={match} />,
  },
  {
    path: '/search/:keyword',
    component: (match) => <SearchPage match={match} />,
  },
];

export default homepageRouter;

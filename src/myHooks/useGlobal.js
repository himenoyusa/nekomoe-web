import React from 'react';
import globalHook from 'use-global-hook';
import { getLang, setLang, getTheme, setTheme, getToken, setToken } from 'utils/localStorage';

/**
 * @param {object} lang 语言词组列表
 * @param {string} theme 主题
 */
const initialState = {
  lang: getLang(),
  theme: getTheme(),
  token: getToken(),
  menuKey: { type: '', value: 'homepage' },
  searchWord: '',
};

const actions = {
  changeTheme: (store, theme) => {
    setTheme(theme);
    store.setState({ theme });
  },
  changeLang: (store, lang) => {
    const keyList = setLang(lang);
    store.setState({ lang: keyList });
  },
  changeUser: (store, token) => {
    setToken(token);
    store.setState({ token });
  },
  changeMenu: (store, menuKey) => {
    store.setState({ menuKey });
  },
  changeSearchWord: (store, searchWord) => {
    store.setState({ searchWord });
  },
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;

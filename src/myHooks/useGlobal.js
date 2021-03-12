import React from 'react';
import globalHook from 'use-global-hook';
import { getLang, setLang, getTheme, setTheme } from 'utils/localStorage';

/**
 * @param {object} lang 语言词组列表
 * @param {string} theme 主题
 */
const initialState = {
  lang: getLang(),
  theme: getTheme(),
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
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;

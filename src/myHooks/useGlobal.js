import React from 'react';
import globalHook from 'use-global-hook';
import { getLang, setLang } from 'utils/lang';

/**
 * @param {object} lang 语言词组列表
 * @param {string} theme 主题
 */
const initialState = {
  lang: getLang(),
  theme: 'white',
};

const actions = {
  changeTheme: (store, theme) => {
    store.setState({ theme });
  },
  changeLang: (store, lang) => {
    const keyList = setLang(lang);
    store.setState({ keyList });
  },
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;

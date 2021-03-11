import language from '../language.json';

/**
 * @description 获取当前默认语言词组
 */
const getLang = () => {
  const defaultLang = window.localStorage.getItem('lang') || 'sc';
  const keyList = language[defaultLang];
  return keyList;
};

/**
 * @description 设置当前语言
 * @param {string} lang 语言类型，必须位于语言表中
 * @return {object} 直接返回语言词组列表
 * @throw 参数不在当前语言表则报错
 */
const setLang = (lang) => {
  const langList = Object.keys(language);
  if (langList.includes(lang)) {
    window.localStorage.setItem('lang', lang);
  } else {
    throw new Error(`Can't set ${lang}!`);
  }
  return language[lang];
};

export { getLang, setLang };

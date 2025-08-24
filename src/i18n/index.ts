import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译资源
import enCommon from '@/i18n/locales/en-US/common.json';
import enHome from '@/i18n/locales/en-US/home.json';
import zhCommon from '@/i18n/locales/zh-CN/common.json';
import zhHome from '@/i18n/locales/zh-CN/home.json';

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // 预加载资源
    resources: {
      'en-US': {
        common: enCommon,
        home: enHome,
      },
      'zh-CN': {
        common: zhCommon,
        home: zhHome,
      },
    },
    fallbackLng: 'en-US',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
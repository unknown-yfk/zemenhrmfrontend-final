import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// const fallbackLng = ['en'];
const availableLanguages = ['en','am','om','ti'];


const option = {

    order: ['cookie','navigator','htmlTag','path','querystring','localStorage','sessionStorage','subdomain'],
    checkWhitelist: true,
    caches: ['cookie']

  }


i18n
  
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist: availableLanguages,
    detection: option,
    backend: {

      loadpath: '/locales/{{lng}}/translation.json',


    }

    // interpolation: {
    //   escapeValue: false, // not needed for react as it escapes by default
    // }
  });


export default i18n;
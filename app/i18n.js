/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import zhLocaleData from 'react-intl/locale-data/zh';
// import allData from 'react-intl/locale-data/index';

import { DEFAULT_LOCALE } from '../app/containers/App/constants';

import enTranslationMessages from './translations/en.json';
import zhTranslationMessages from './translations/zh.json';

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

export const appLocales = [
  'zh',
  'en',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  zh: formatTranslationMessages('zh', zhTranslationMessages),
  en: formatTranslationMessages('en', enTranslationMessages),
};

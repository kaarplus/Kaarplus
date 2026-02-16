import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files - Estonian
import commonEt from '../messages/et/common.json';
import homeEt from '../messages/et/home.json';
import listingsEt from '../messages/et/listings.json';
import authEt from '../messages/et/auth.json';
import errorsEt from '../messages/et/errors.json';

// Import translation files - Russian
import commonRu from '../messages/ru/common.json';
import homeRu from '../messages/ru/home.json';
import listingsRu from '../messages/ru/listings.json';
import authRu from '../messages/ru/auth.json';
import errorsRu from '../messages/ru/errors.json';

// Import translation files - English
import commonEn from '../messages/en/common.json';
import homeEn from '../messages/en/home.json';
import listingsEn from '../messages/en/listings.json';
import authEn from '../messages/en/auth.json';
import errorsEn from '../messages/en/errors.json';

const resources = {
    et: {
        common: commonEt,
        home: homeEt,
        listings: listingsEt,
        auth: authEt,
        errors: errorsEt,
    },
    ru: {
        common: commonRu,
        home: homeRu,
        listings: listingsRu,
        auth: authRu,
        errors: errorsRu,
    },
    en: {
        common: commonEn,
        home: homeEn,
        listings: listingsEn,
        auth: authEn,
        errors: errorsEn,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'et', // default language
        fallbackLng: 'et',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    });

export default i18n;

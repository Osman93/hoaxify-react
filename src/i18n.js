import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr_json from "./lang/tr.json";
import en_json from "./lang/en.json";

i18n
    .use(initReactI18next)
    .init({
        resources:{
            tr:{
                translations:tr_json
            },
            en:{
                translations:en_json
            },
        },
        lng:"tr",
        fallbackLng: 'tr',
        ns:["translations"],
        defaultNS:"translations",
        keySeperator:false,
        react: {
            useSuspense: false,
            wait: true
        }
    })


export default i18n;
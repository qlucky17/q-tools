import axios from 'axios';
import { nextTick, WritableComputedRef } from 'vue';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';

export function setupI18n(options?: I18nOptions): I18n;
export function setupI18n(options?: I18nOptions): I18n {
  let i18InParams = {};
  let defaultLocale = 'zh-CN';
  const datetimeFormats = {
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    'zh-CN': {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      },
    },
  };
  if (!options) {
    i18InParams = {
      legacy: false,
      datetimeFormats,
      fallbackLocale: {
        /* 1 */ 'zh-CN': ['zh'],
        /* 3 */ 'en-US': ['en'],
        /* 6 */ default: ['en'],
      },
    };
  } else {
    i18InParams = { ...options };
    if (options.locale) {
      defaultLocale = options.locale;
      delete i18InParams['locale'];
    }
  }
  const i18n = createI18n(i18InParams);

  setI18nLanguage(i18n, defaultLocale as string);
  return i18n;
}
//设置语种
export function setI18nLanguage(i18n: I18n, locale: string, isCustom?: boolean) {
  //if (!i18n.global.availableLocales.includes(locale)) {
  if (!isCustom) {
    loadLocaleMessages(i18n, locale);
  } else {
    loadOnlineMessages(i18n, locale);
  }
  // }
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as WritableComputedRef<string>).value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  axios.defaults.headers.common['Accept-Language'] = locale;
  document?.querySelector('html')?.setAttribute('lang', locale);
}

//获取本地所有语种
export function getLocales() {
  const result = {};
  const LocalesModules = (import.meta as any).globEager('./lang/*.ts');
  const keys = Object.keys(LocalesModules);
  keys.forEach((key) => {
    const k = key.lastIndexOf('/');
    const kStr = key.substring(k + 1, key.length);
    const kStrIndex = kStr.lastIndexOf('.');
    const objectKey = kStr.substring(0, kStrIndex);
    result[objectKey] = LocalesModules[key].default;
  });

  return result;
}
//加载设置的语种
export async function loadLocaleMessages(i18n: I18n, locale: string) {
  // load locale messages with dynamic import
  try {
    const locales = getLocales();
    const loaleKeys = Object.keys(locales);
    if (loaleKeys?.includes(locale)) {
      i18n.global.setLocaleMessage(locale, locales[locale]);
    } else {
      if (locale?.includes('-')) {
        //包含-，例如zh-CN
        const lastIndex = locale.lastIndexOf('-');
        const objectKey = locale.substring(0, lastIndex);
        //直接找zh
        if (loaleKeys.includes(objectKey)) {
          // set locale and locale message
          i18n.global.setLocaleMessage(locale, locales[objectKey]);
        } else {
          const localeItemKey = loaleKeys?.find((m) => m.includes(objectKey));
          if (localeItemKey) {
            // set locale and locale message
            i18n.global.setLocaleMessage(locale, locales[localeItemKey]);
          } else {
            //兜底方案
            i18n.global.setLocaleMessage(locale, locales['zh-CN']);
          }
        }
      } else {
        //不规范的只设置了语种
        const localeItemKey = loaleKeys?.find((m) => m.includes(locale));
        if (localeItemKey) {
          // set locale and locale message
          i18n.global.setLocaleMessage(locale, locales[localeItemKey]);
        } else {
          //兜底方案
          i18n.global.setLocaleMessage(locale, locales['zh-CN']);
        }
      }
    }
  } catch (error) {}

  return nextTick();
}
//加载在线语种
export async function loadOnlineMessages(i18n: I18n, locale: string) {
  console.log(i18n, locale);
}
export const i18n = setupI18n();
export const t = i18n.global.t as any;
export const d = i18n.global.d as any;

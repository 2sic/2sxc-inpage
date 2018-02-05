import * as i18next from './libs/i18next.min';
import * as i18nextXHRBackend from './libs/i18nextXHRBackend.min';
import * as jqueryI18next from './libs/jquery-i18next.min';

/**
 * initialize the translation system; ensure toolbars etc. are translated
 */

window.i18next = i18next;
window.i18nextXHRBackend = i18nextXHRBackend;

let initialized: boolean = false;

// ReSharper disable once InconsistentNaming
export function _translateInit(manage: any): void {
  if (initialized) return;

  window.i18next
    .use(i18nextXHRBackend)
    .init({
      lng: manage._editContext.Language.Current.substr(0, 2), // "en",
      fallbackLng: 'en',
      whitelist: ['en', 'de', 'fr', 'it', 'uk', 'nl'],
      preload: ['en'],
      backend: {
        loadPath: manage._editContext.Environment.SxcRootUrl + 'desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js'
      }
    }, (err, t) => {
      // for options see
      // https://github.com/i18next/jquery-i18next#initialize-the-plugin
      // ReSharper disable once TsResolvedFromInaccessibleModule
      jqueryI18next.init(i18next, $);
      // start localizing, details:
      // https://github.com/i18next/jquery-i18next#usage-of-selector-function
      $('ul.sc-menu').localize(); // inline toolbars
      $('.sc-i18n').localize();   // quick-insert menus
    });
  initialized = true;
};


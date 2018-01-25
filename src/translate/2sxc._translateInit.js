"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jqueryI18next = require("./libs/jquery-i18next.min.js");
window.i18next = require('./libs/i18next.min.js');
window.i18nextXHRBackend = require('./libs/i18nextXHRBackend.min.js');
/**
 * initialize the translation system; ensure toolbars etc. are translated
 */
var initialized = false;
function _translateInit(manage) {
    if (initialized)
        return;
    window.i18next
        .use(window.i18nextXHRBackend)
        .init({
        lng: manage._editContext.Language.Current.substr(0, 2),
        fallbackLng: 'en',
        whitelist: ['en', 'de', 'fr', 'it', 'uk', 'nl'],
        preload: ['en'],
        backend: {
            loadPath: manage._editContext.Environment.SxcRootUrl + 'desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js'
        }
    }, function (err, t) {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(window.i18next, $);
        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('ul.sc-menu').localize(); // inline toolbars
        $('.sc-i18n').localize(); // quick-insert menus
    });
    initialized = true;
}
exports._translateInit = _translateInit;
;
//# sourceMappingURL=2sxc._translateInit.js.map
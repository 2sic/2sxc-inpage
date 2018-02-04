"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CbOrMod = /** @class */ (function () {
    function CbOrMod() {
    }
    return CbOrMod;
}());
;
var Selectors = /** @class */ (function () {
    function Selectors() {
    }
    return Selectors;
}());
// the quick-edit object
// the quick-insert object
exports.$quickE = window.$quickE = {
    body: $('body'),
    win: $(window),
    main: $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>"),
    template: "<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>"
        + "<a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>"
        + btn('select', 'ok', 'Select', true)
        + btn('paste', 'paste', 'Paste', true, true),
    selected: $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
        .append(btn('delete', 'trash-empty', 'Delete'), btn('sendToPane', 'export', 'Move', null, null, 'sc-cb-mod-only'), "<div id='paneList'></div>"),
    contentBlocks: null,
    cachedPanes: null,
    modules: null,
    nearestCb: null,
    nearestMod: null,
    modManage: null // will be populated later in the module section
};
// selectors used all over the in-page-editing, centralized to ensure consistency
exports.selectors = {
    cb: {
        id: 'cb',
        "class": 'sc-content-block',
        selector: '.sc-content-block',
        listSelector: '.sc-content-block-list',
        context: 'data-list-context',
        singleItem: 'single-item'
    },
    mod: {
        id: 'mod',
        "class": 'DnnModule',
        selector: '.DnnModule',
        listSelector: '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)',
        context: null
    },
    eitherCbOrMod: '.DnnModule, .sc-content-block',
    selected: 'sc-cb-is-selected'
};
function btn(action, icon, i18N, invisible, unavailable, classes) {
    return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + ' '
        + (invisible ? ' sc-invisible ' : '')
        + (unavailable ? ' sc-unavailable ' : '')
        + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
}
;
// add stuff which dependes on other values to create
exports.$quickE.cbActions = $(exports.$quickE.template);
exports.$quickE.modActions = $(exports.$quickE.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
    .attr('data-context', 'module')
    .addClass('sc-content-block-menu-module');
/**
 * build the toolbar (hidden, but ready to show)
 */
function prepareToolbarInDom() {
    exports.$quickE.body.append(exports.$quickE.main)
        .append(exports.$quickE.selected);
    exports.$quickE.main.append(exports.$quickE.cbActions)
        .append(exports.$quickE.modActions);
}
exports.prepareToolbarInDom = prepareToolbarInDom;
;
//# sourceMappingURL=$quickE.{}.js.map
﻿import { Selectors } from './selectors';

// the quick-edit object
// the quick-insert object
export let $quickE = window.$quickE = {
  body: $('body'),
  win: $(window),
  main: $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>"),
  template: "<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>"
  + "<a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>"
  + btn('select', 'ok', 'Select', true)
  + btn('paste', 'paste', 'Paste', true, true),
  selected: $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
    .append(
    btn('delete', 'trash-empty', 'Delete'),
    btn('sendToPane', 'export', 'Move', null, null, 'sc-cb-mod-only'),
    "<div id='paneList'></div>",
    ),
  contentBlocks: null,
  cachedPanes: null,
  modules: null,
  nearestCb: null,
  nearestMod: null,
  modManage: null, // will be populated later in the module section
} as I$quickE;

// selectors used all over the in-page-editing, centralized to ensure consistency
export let selectors: Selectors = {
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
    listSelector: '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)', // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
    context: null
  },
  eitherCbOrMod: '.DnnModule, .sc-content-block',
  selected: 'sc-cb-is-selected'
};

function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string {
  return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + ' '
    + (invisible ? ' sc-invisible ' : '')
    + (unavailable ? ' sc-unavailable ' : '')
    + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
};

// add stuff which dependes on other values to create
$quickE.cbActions = $($quickE.template);
$quickE.modActions = $($quickE.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
  .attr('data-context', 'module')
  .addClass('sc-content-block-menu-module');

/**
 * build the toolbar (hidden, but ready to show)
 */
export function prepareToolbarInDom(): void {
  $quickE.body.append($quickE.main)
    .append($quickE.selected);
  $quickE.main.append($quickE.cbActions)
    .append($quickE.modActions);
};

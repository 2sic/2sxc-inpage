import { getTag } from '../manage/api';
import { buildToolbars} from '../toolbar/build-toolbars';
import { getSxcInstance } from './sxc';
import { Log } from '../logging/log';
import { LogUtils } from '../logging/log-utils';
import { quickDialog } from '../quick-dialog/quick-dialog';
import QuickEditState = require('../quick-dialog/state');
import { windowInPage as window } from '../interfaces/window-in-page';
import { DebugConfig } from '../DebugConfig';
import { CleanupTagToolbars } from '../toolbar/tag-toolbar'

/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
const initializedInstances: JQuery<HTMLElement>[] = [];
let openedTemplatePickerOnce = false;
const diagCancelStateOnStart = QuickEditState.cancelled.get();


$(document).ready(() => {
  // reset cancelled state after one reload
  if (diagCancelStateOnStart)
    QuickEditState.cancelled.remove();

  // initialize all modules
  initAllInstances(true);

  // start observing the body for configured mutations
  watchDomChanges();
});

/**
 * Scan all instances and initialize them
 * @param isFirstRun should be true only on the very initial call
 */
function initAllInstances(isFirstRun: boolean): void {
  (window.$2sxc as any).stats.watchDomChanges++;
  $('div[data-edit-context]').each(function() { initInstance(this, isFirstRun)});
  if (isFirstRun)
    tryShowTemplatePicker();
}

/**
 * create an observer instance and start observing
 */
function watchDomChanges() {
  const observer = new MutationObserver(() => initAllInstances(false));
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
}

/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker(): boolean {
  let sxc: SxcInstanceWithInternals = undefined;
  // first check if we should show one according to the state-settings
  const openDialogId = QuickEditState.cbId.get();
  if (openDialogId) {
    // must check if it's on this page, as it could be from another page
    const found = $(`[data-cb-id="${openDialogId}"]`);
    if(found.length)
      sxc = window.$2sxc(openDialogId) as SxcInstanceWithInternals;
  }

  if (!sxc) {
    const uninitializedModules: any = $('.sc-uninitialized');

    if (diagCancelStateOnStart || openedTemplatePickerOnce) return false;

    // already showing a dialog
    if (quickDialog.isVisible()) return false;

    // not exactly one uninitialized module
    if (uninitializedModules.length !== 1) return false;

    // show the template picker of this module
    const module = uninitializedModules.parent('div[data-edit-context]')[0];
    sxc = getSxcInstance(module);
  }

  if (sxc) {
    sxc.manage.run('layout');
    openedTemplatePickerOnce = true;
  }
  return true;
}

function initInstance(module: JQuery<HTMLElement>, isFirstRun: boolean): void {
  // check if module is already in the list of initialized modules
  if (initializedInstances.find((m) => m === module)) return;

  // add to modules-list first, in case we run into recursions
  initializedInstances.push(module);

  let sxc = getSxcInstance(module);
  
  // check if the sxc must be re-created. This is necessary when modules are dynamically changed
  // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
  if (!isFirstRun)
    sxc = sxc.recreate(true);

  // check if we must show the glasses
  // this must always run because it can be added ajax-style
  const wasEmpty = showGlassesButtonIfUninitialized(sxc);

  // Remove orphan tag-toolbars
  if (!isFirstRun)
    CleanupTagToolbars();

  if (isFirstRun || !wasEmpty) {
    // use a logger for each iteration
    const log = new Log('Bts.Module');

    buildToolbars(log, module);
    if(DebugConfig.bootstrap.initInstance)
      LogUtils.logDump(log);
  };
}

function showGlassesButtonIfUninitialized(sxci: SxcInstanceWithInternals): boolean {
  // already initialized
  if (isInitialized(sxci)) return false;

  // already has a glasses button
  const tag: any = $(getTag(sxci));
  if (tag.find('.sc-uninitialized').length !== 0) return false;

  // note: title is added on mouseover, as the translation isn't ready at page-load
  const btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">'
    + '<div class="icon-sxc-glasses"></div>'
    + '</div>');

  btn.on('click', () => sxci.manage.run('layout'));

  tag.append(btn);
  return true;
}

function isInitialized(sxci: SxcInstanceWithInternals): boolean {
  const cg = sxci && sxci.manage && sxci.manage._editContext && sxci.manage._editContext.ContentGroup;
  return (cg && cg.TemplateId !== 0);
}


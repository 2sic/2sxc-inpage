import { getTag } from '../manage/api';
import { buildToolbars} from '../toolbar/build-toolbars';
import { getSxcInstance } from './sxc';
import { Log } from '../logging/log';
import { LogUtils } from '../logging/log-utils';
import { quickDialog } from '../quick-dialog/quick-dialog';
import QuickEditState = require('../quick-dialog/quick-edit-state');

/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
const initializedModules: any[] = [];
let openedTemplatePickerOnce = false;
let cancelledDialog: boolean;

// callback function to execute when mutations are observed
let initAllModulesCallback = (mutationsList: any) => {
  initAllModules(false);
};

// create an observer instance linked to the callback function
let observer = new MutationObserver(initAllModulesCallback);

$(document).ready(() => {

  cancelledDialog = QuickEditState.cancelled.get(); // localStorage.getItem('cancelled-dialog');

  if (cancelledDialog) {
    QuickEditState.cancelled.remove();
    //localStorage.removeItem('cancelled-dialog');
  };

  initAllModules(true);

  // document.body.addEventListener('DOMSubtreeModified', (event) => initAllModules(false), false);
  // start observing the body for configured mutations
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
});

function initAllModules(isFirstRun: boolean): void {
  $('div[data-edit-context]').each(function() {
    initModule(this, isFirstRun);
  });
  tryShowTemplatePicker();
}

/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker(): boolean {
  const uninitializedModules: any = $('.sc-uninitialized');

  if (cancelledDialog || openedTemplatePickerOnce) {
    return false;
  };

  // already showing a dialog
  if (quickDialog.isShowing()) {// (current !== null) {
    return false;
  };

  // not exactly one uninitialized module
  if (uninitializedModules.length !== 1) {
    return false;
  };

  // show the template picker of this module
  const module = uninitializedModules.parent('div[data-edit-context]')[0];
  const sxc = getSxcInstance(module);
  sxc.manage.run('layout');
  openedTemplatePickerOnce = true;
  return true;
}

function initModule(module: any, isFirstRun: boolean) {
  // check if module is already in the list of initialized modules
  if (initializedModules.find((m) => m === module)) {
    return false;
  };

  // add to modules-list
  initializedModules.push(module);

  let sxc = getSxcInstance(module);
  
  // check if the sxc must be re-created. This is necessary when modules are dynamically changed
  // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
  if (!isFirstRun) {
    sxc = sxc.recreate(true);
  };

  // check if we must show the glasses
  // this must run even after first-run, because it can be added ajax-style
  const wasEmpty = showGlassesButtonIfUninitialized(sxc);

  if (isFirstRun || !wasEmpty) {
    // use a logger for each iteration
    const log = new Log('Bts.Module');
    buildToolbars(log, module);
    LogUtils.logDump(log);
  };

  return true;
}

function showGlassesButtonIfUninitialized(sxci: SxcInstanceWithInternals) {
  // already initialized
  if (sxci && sxci.manage && sxci.manage._editContext && sxci.manage._editContext.ContentGroup && sxci.manage._editContext.ContentGroup.TemplateId !== 0) {
    return false;
  };

  // already has a glasses button
  const tag: any = $(getTag(sxci));
  if (tag.find('.sc-uninitialized').length !== 0) {
    return false;
  }

  // note: title is added on mouseover, as the translation isn't ready at page-load
  const btn = $('<div class="sc-uninitialized"  onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');

  btn.on('click',
    (): void => {
      sxci.manage.run('layout');
    });

  tag.append(btn);
  return true;
}

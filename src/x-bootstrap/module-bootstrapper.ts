import { current } from '../quick-dialog/quick-dialog';
import { getTag } from '../manage/api';
import { translate } from '../translate/2sxc.translate';
//import '/2sxc-api/js/2sxc.api';

/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
// 
// 

export let $2sxc = window.$2sxc as SxcControllerWithInternals;

let initializedModules = [];
let openedTemplatePickerOnce = false;
let cancelledDialog = localStorage.getItem('cancelled-dialog');

if (cancelledDialog) localStorage.removeItem('cancelled-dialog');

initAllModules(true);

// watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
document.body.addEventListener('DOMSubtreeModified', event => initAllModules(false), false);

//return; // avoid side-effects

function initAllModules(isFirstRun) {
  $('div[data-edit-context]').each(function () {
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
function tryShowTemplatePicker() {
  let uninitializedModules = $('.sc-uninitialized');

  if (cancelledDialog || openedTemplatePickerOnce) return false;

  // already showing a dialog
  if (current !== null) return false;

  // not exactly one uninitialized module
  if (uninitializedModules.length !== 1) return false;

  // show the template picker of this module
  let module = uninitializedModules.parent('div[data-edit-context]')[0];
  let sxc: SxcInstanceWithInternals = $2sxc(module) as SxcInstanceWithInternals;
  sxc.manage.run('layout');
  openedTemplatePickerOnce = true;
}

export let sxc: SxcInstanceWithInternals;

function initModule(module, isFirstRun) {

  // check if module is already in the list of initialized modules
  if (initializedModules.find(m => m === module)) return false;

  // add to modules-list
  initializedModules.push(module);

  sxc = $2sxc(module) as SxcInstanceWithInternals;

  // check if the sxc must be re-created. This is necessary when modules are dynamically changed
  // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
  if (!isFirstRun) sxc = sxc.recreate(true);

  // check if we must show the glasses
  // this must run even after first-run, because it can be added ajax-style
  let wasEmpty = showGlassesButtonIfUninitialized(sxc);

  if (isFirstRun || !wasEmpty) $2sxc._toolbarManager.buildToolbars(module);

  return true;
}

function showGlassesButtonIfUninitialized(sxc) {

  // already initialized
  if (sxc.manage._editContext.ContentGroup.TemplateId !== 0) return false;

  // already has a glasses button
  let tag = $(getTag(sxc));
  if (tag.find('.sc-uninitialized').length !== 0) return false;

  // note: title is added on mouseover, as the translation isn't ready at page-load
  let btn = $('<div class="sc-uninitialized" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');

  btn.on('click', (): void => {
    sxc.manage.run('layout');
  });

  btn.on('mouseover', (): void => {
    btn.title = translate(btn.title);
  });

  tag.append(btn);
  return true;
}

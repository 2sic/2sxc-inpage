import { buildToolbars } from '../abtesting/toolbar-feature';
import { context } from '../context/context';
import { getTag } from '../manage/api';
import { current } from '../quick-dialog/quick-dialog';
import { translate } from '../translate/2sxc.translate';
import { getSxcInstance } from './sxc';
// import '/2sxc-api/js/2sxc.api';

/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
const initializedModules: any[] = [];
let openedTemplatePickerOnce = false;
const cancelledDialog = localStorage.getItem('cancelled-dialog');

if (cancelledDialog) localStorage.removeItem('cancelled-dialog');

initAllModules(true);

// watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
// ReSharper disable once UnusedParameter
document.body.addEventListener('DOMSubtreeModified', (event) => initAllModules(false), false);

// return; // avoid side-effects

function initAllModules(isFirstRun: boolean): void {
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
function tryShowTemplatePicker(): boolean {
  const uninitializedModules: any = $('.sc-uninitialized');

  if (cancelledDialog || openedTemplatePickerOnce) return false;

  // already showing a dialog
  if (current !== null) return false;

  // not exactly one uninitialized module
  if (uninitializedModules.length !== 1) return false;

  // show the template picker of this module
  const module = uninitializedModules.parent('div[data-edit-context]')[0];
  const sxc = getSxcInstance(module);
  sxc.manage.run2(context(module), 'layout');
  openedTemplatePickerOnce = true;
  return true;
}

function initModule(module: any, isFirstRun: boolean) {

  // check if module is already in the list of initialized modules
  if (initializedModules.find((m) => m === module)) return false;

  // add to modules-list
  initializedModules.push(module);

  let sxc = getSxcInstance(module);

  // check if the sxc must be re-created. This is necessary when modules are dynamically changed
  // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
  if (!isFirstRun) sxc = sxc.recreate(true);

  // check if we must show the glasses
  // this must run even after first-run, because it can be added ajax-style
  const wasEmpty = showGlassesButtonIfUninitialized(sxc);

  if (isFirstRun || !wasEmpty) buildToolbars(module);

  return true;
}

function showGlassesButtonIfUninitialized(sxci: SxcInstanceWithInternals) {

  // already initialized
  if (sxci.manage._editContext.ContentGroup.TemplateId !== 0) return false;

  // already has a glasses button
  const tag: any = $(getTag(sxci));
  if (tag.find('.sc-uninitialized').length !== 0) return false;

  // note: title is added on mouseover, as the translation isn't ready at page-load
  const btn = $('<div class="sc-uninitialized" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');

  btn.on('click', (): void => {
    sxci.manage.run2(context(tag), 'layout');
  });

  btn.on('mouseover', (): void => {
    btn.title = translate(btn.title);
  });

  tag.append(btn);
  return true;
}

import { reset } from '../quick-edit/$quickE.start';
import { hide } from '../quick-dialog/2sxc._quickDialog';
import { getTag } from '../manage/manage.api';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { _contentBlock } from './contentBlock.{}';
import { getPreviewWithTemplate } from './contentBlock.webApiPromises';

/*
 * this is the content block manager in the browser
 * 
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

let cbm = _contentBlock;

/**
 * ajax update/replace the content of the content-block
 * optionally also initialze the toolbar (if not just preview)
 * @param {Object<>} sxc 
 * @param {string} newContent 
 * @param {boolean} justPreview 
 * @returns {} 
 */
function replaceCb(sxc: any, newContent: any, justPreview: boolean): void {
  try {
    let newStuff = $(newContent);

    // Must disable toolbar before we attach to DOM
    if (justPreview) twoSxc._toolbarManager.disable(newStuff);

    $(getTag(sxc)).replaceWith(newStuff);

    // reset the cache, so the sxc-object is refreshed
    sxc.recreate(true);
  } catch (e) {
    console.log('Error while rendering template:', e);
  }
};

/**
 * Show a message where the content of a module should be - usually as placeholder till something else happens
 * @param {object} sxc 
 * @param {string} newContent 
 * @returns {} - nothing
 */
export function showMessage(sxc: any, newContent: any): void {
  $(getTag(sxc)).html(newContent);
};

/**
 * ajax-call, then replace
 * @param sxc
 * @param alternateTemplateId
 * @param justPreview
 */
export function ajaxLoad(sxc: any, alternateTemplateId: any, justPreview: boolean): any {
  return getPreviewWithTemplate(sxc, alternateTemplateId)
    .then(result => replaceCb(sxc, result, justPreview))
    .then(reset); // reset quick-edit, because the config could have changed
};

/**
 * this one assumes a replace / change has already happened, but now must be finalized...
 * @param sxc
 * @param forceAjax
 * @param preview
 */
export function reloadAndReInitialize(sxc: any, forceAjax?: boolean, preview? : boolean): any {
  let manage = sxc.manage;

  // if ajax is not supported, we must reload the whole page
  if (!forceAjax && !manage._reloadWithAjax) return window.location.reload();

  return ajaxLoad(sxc, cbm.cUseExistingTemplate, !!preview)
    .then(() => {

      // tell Evoq that page has changed if it has changed (Ajax call)
      if (window.dnn_tabVersioningEnabled) // this only exists in evoq or on new DNNs with tabVersioning
        try {
          window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
        }
        catch (e) { }

      // maybe check if already publish
      // compare to HTML module
      // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button

      // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
      // must check for side-effects, which would need the manager to re-build the configuration
      hide();
    });
};

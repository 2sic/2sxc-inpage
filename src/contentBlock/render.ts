import { ContextOfButton } from '../context/context-of-button';
import { windowInPage as window } from '../interfaces/window-in-page';
import { getTag } from '../manage/api';
import { reset } from '../quick-edit/start';
import { disable } from '../toolbar/build-toolbars';
import { MainContentBlock } from './main-content-block';
import { getPreviewWithTemplate } from './web-api-promises';
import { quickDialog } from '../quick-dialog/quick-dialog';

/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

/**
 * ajax update/replace the content of the content-block
 * optionally also initialize the toolbar (if not just preview)
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @param {boolean} justPreview
 * @returns {}
 */
function replaceCb(context: ContextOfButton, newContent: string, justPreview: boolean): void {
  try {
    const newStuff = $(newContent);

    // Must disable toolbar before we attach to DOM
    if (justPreview) disable(newStuff);

    $(getTag(context.sxc)).replaceWith(newStuff);
    // reset the cache, so the sxc-object is refreshed

    context.sxc.recreate(true);
  } catch (e) {
    console.log('Error while rendering template:', e);
  }
}

/**
 * Show a message where the content of a module should be - usually as placeholder till something else happens
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @returns {} nothing
 */
export function showMessage(context: ContextOfButton, newContent: any): void {
  $(getTag(context.sxc)).html(newContent);
}

/**
 * ajax-call, then replace
 * @param {ContextOfButton} context
 * @param {number} alternateTemplateId
 * @param {boolean} justPreview
 */
export function ajaxLoad(context: ContextOfButton, alternateTemplateId: number, justPreview: boolean): Promise<void> {
  return getPreviewWithTemplate(context, alternateTemplateId)
    .then((result: string) => {
      replaceCb(context, result, justPreview);
    })
    .then(() => {
      reset();
    }); // reset quick-edit, because the config could have changed
}

/**
 * this one assumes a replace / change has already happened, but now must be finalized...
 * @param {ContextOfButton} context
 * @param {boolean} forceAjax
 * @param {boolean} preview
 */
export function reloadAndReInitialize(context: ContextOfButton, forceAjax?: boolean, preview?: boolean): Promise<any> {
  // if ajax is not supported, we must reload the whole page
  if (!forceAjax && !context.app.supportsAjax) {
    window.location.reload();
    return Promise.resolve();
  }

  return ajaxLoad(context, MainContentBlock.cUseExistingTemplate, preview)
    .then((result) => {
      // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
      if (window.dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
        try {
          window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
        } catch (e) {
          // sink
        }
      }

      // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
      // must check for side-effects, which would need the manager to re-build the configuration
      quickDialog.hide();
      return result;
    }).catch((error) => {
      console.log('Error in reloadAndReInitialize', error);
    });
}

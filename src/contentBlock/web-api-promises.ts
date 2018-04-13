import { WebApiParams } from './web-api-params';
import { ContextOfButton } from '../context/context-of-button';

/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

//#region functions working only with what they are given
// 2017-08-27 2dm: I'm working on cleaning up this code, and an important part
// is to have code which doesn't use old state (like object-properties initialized earlier)
// extracting these methods is part of the work

/**
 * TODO - unclear if still in use
 * @param {object} sxc
 * @param {boolean} state
 * @returns {promise}
 */
// 2017-09-02 2dm removed, deprecated, it's not stored on the server any more
// cbm.setTemplateChooserState = function(sxc, state) {
//    return sxc.webApi.get({
//        url: "view/module/SetTemplateChooserState",
//        params: { state: state }
//    });
// };

/**
 * Save the template configuration for this instance
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @param {boolean} [forceCreateContentGroup]
 * @returns {promise}
 */
export function saveTemplate(context: ContextOfButton, templateId: number, forceCreateContentGroup: boolean): any /*Promise<any>*/ {
  const params: WebApiParams = {
    templateId: templateId,
    forceCreateContentGroup: forceCreateContentGroup,
    newTemplateChooserState: false,
  };
  return /*Promise.resolve(*/context.sxc.webApi.get({
    url: 'view/module/savetemplateid',
    params: params,
  })/*)*/;
}

/**
 * Retrieve the preview from the web-api
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @returns {promise} promise with the html in the result
 */
export function getPreviewWithTemplate(context: ContextOfButton, templateId: number) /*: Promise<any>*/ {
  templateId = templateId || -1; // fallback, meaning use saved ID
  const params: WebApiParams = {
    templateId: templateId,
    lang: context.app.currentLanguage,
    cbisentity: context.contentBlock.isEntity,
    cbid: context.contentBlock.id,
    originalparameters: JSON.stringify(context.instance.parameters),
  };
  return /*Promise.resolve(*/context.sxc.webApi.get({
    url: 'view/module/rendertemplate',
    params: params,
    dataType: 'html',
  })/*)*/;
}
//#endregion

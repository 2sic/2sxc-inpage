﻿import { WebApiParams } from './web-api-params';
import { ContextOfButton } from '../context/context-of-button';
import { getSxcInstance } from '../x-bootstrap/sxc';
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
 * @param {object} sxc
 * @param {int} templateId
 * @param {boolean} [forceCreateContentGroup]
 * @returns {promise}
 */
export function saveTemplate(context: ContextOfButton, templateId: number, forceCreateContentGroup: boolean): any {
  const sxc = getSxcInstance(context.instance.id);
  const params: WebApiParams = {
    templateId: templateId,
    forceCreateContentGroup: forceCreateContentGroup,
    newTemplateChooserState: false,
  };
  return sxc.webApi.get({
    url: 'view/module/savetemplateid',
    params: params,
  });
}

/**
 * Retrieve the preview from the web-api
 * @param {object} sxc
 * @param {int} templateId
 * @returns {promise} promise with the html in the result
 */
export function getPreviewWithTemplate(context: ContextOfButton, templateId: number): any {
  const sxc = getSxcInstance(context.instance.id);
  const ec = sxc.manage._editContext;
  templateId = templateId || -1; // fallback, meaning use saved ID
  const params: WebApiParams = {
    templateId: templateId,
    lang: ec.Language.Current,
    cbisentity: ec.ContentBlock.IsEntity,
    cbid: ec.ContentBlock.Id,
    originalparameters: JSON.stringify(ec.Environment.parameters),
  };
  return sxc.webApi.get({
    url: 'view/module/rendertemplate',
    params: params,
    dataType: 'html',
  });
}
//#endregion

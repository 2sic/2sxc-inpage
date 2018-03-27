import { ContextOfButton } from '../context/context-of-button';
import { ContentGroup } from '../data-edit-context/content-group';
import { hide } from '../quick-dialog/quick-dialog';
import { isDisabled } from '../toolbar/build-toolbars';
import { reloadAndReInitialize } from './render';
import { saveTemplate } from './web-api-promises';
import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {} sxc
 * @returns {}
 */

export function prepareToAddContent(context: ContextOfButton, useModuleList: boolean) {
  const isCreated: boolean = context.contentBlock.isCreated;
  if (isCreated || !useModuleList) return $.when(null);
  // return persistTemplate(sxc, null);
  // let manage = sxc.manage;
  // let contentGroup = manage._editContext.ContentGroup;
  // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
  // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;

  const templateId: number = context.contentBlock.templateId;

  // template has not changed
  // if (groupExistsAndTemplateUnchanged) return $.when(null);

  // persist the template
  return updateTemplate(context, templateId, true);
}

/**
 * Update the template and adjust UI accordingly.
 * @param {*} sxc
 * @param {*} templateId
 * @param {*} forceCreate
 */
export function updateTemplateFromDia(context: ContextOfButton, templateId: number, forceCreate: boolean) {
  const sxc = getSxcInstance(context.instance.id);
  const contentGroup: ContentGroup = sxc.manage._editContext.ContentGroup;
  const showingAjaxPreview = isDisabled(sxc);

  // todo: should move things like remembering undo etc. back into the contentBlock state manager
  // or just reset it, so it picks up the right values again ?
  return updateTemplate(context, templateId, forceCreate)
    .then(() => {
      
      hide();

      // if it didn't have content, then it only has now...
      if (!contentGroup.HasContent) {
        contentGroup.HasContent = forceCreate;
      }

      // only reload on ajax, not on app as that was already re-loaded on the preview
      // necessary to show the original template again
      if (showingAjaxPreview) {
        reloadAndReInitialize(context);
      }
    });
}

/**
 * Update the template.
 */
export function updateTemplate(context: ContextOfButton, templateId: number, forceCreate: boolean) {

  return saveTemplate(context, templateId, forceCreate)
    .then(function (data: any, textStatus: any, xhr: any) {
      // error handling
      if (xhr.status !== 200) {
        return alert('error - result not ok, was not able to create ContentGroup');
      }

      if (!data) {
        return;
      }

      // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
      const newGuid: string = data.replace(/[\",\']/g, '');

      if (console) {
        console.log(`created content group {${newGuid}}`);
      }

      context.contentBlock.contentGroupId = newGuid;
      // $2sxc._manage._updateContentGroupGuid(context, newGuid);
    });
}

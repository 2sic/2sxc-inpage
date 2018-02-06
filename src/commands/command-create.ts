import { translate } from '../translate/2sxc.translate';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { extend } from '../lib-helpers/2sxc._lib.extend';
import { Settings } from './settings';
import { Cmd } from './cmd';
import { Params } from './params';
import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(sxc: SxcInstanceWithInternals, editContext: DataEditContext, specialSettings: Settings): Cmd {
  let settings: Settings = Object.assign(sxc.manage._instanceConfig, specialSettings) as Settings; // merge button with general toolbar-settings
  let ngDialogUrl: string = editContext.Environment.SxcRootUrl +
    'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
    editContext.Environment.SxcVersion;
  let isDebug: string = twoSxc.urlParams.get('debug') ? '&debug=true' : '';

  let cmd: Cmd = {
    settings: settings,
    items: settings.items || [], // use predefined or create empty array
    params: Object.assign({
      dialog: settings.dialog || settings.action // the variable used to name the dialog changed in the history of 2sxc from action to dialog
    }, settings.params) as Params,

    addSimpleItem: () => {
      let item: Item = {} as Item;
      let ct: string = cmd.settings.contentType || cmd.settings.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
      if (cmd.settings.entityId) item.EntityId = cmd.settings.entityId;
      if (ct) item.ContentTypeName = ct;

      // only add if there was stuff to add
      if (item.EntityId || item.ContentTypeName) cmd.items.push(item);
    },

    // this adds an item of the content-group, based on the group GUID and the sequence number
    addContentGroupItem: (guid, index, part, isAdd, isEntity, cbid, sectionLanguageKey) => {
      cmd.items.push({
        Group: {
          Guid: guid,
          Index: index,
          Part: part,
          Add: isAdd
        },
        Title: translate(sectionLanguageKey)
      });
    },

    // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
    addContentGroupItemSetsToEditList: withPresentation => {
      let isContentAndNotHeader = (cmd.settings.sortOrder !== -1),
        index = isContentAndNotHeader ? cmd.settings.sortOrder : 0,
        prefix = isContentAndNotHeader ? '' : 'List',
        cTerm = prefix + 'Content',
        pTerm = prefix + 'Presentation',
        isAdd = cmd.settings.action === 'new',
        groupId = cmd.settings.contentGroupId;
      cmd.addContentGroupItem(groupId, index, cTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, 'EditFormTitle.' + cTerm);

      if (withPresentation) cmd.addContentGroupItem(groupId, index, pTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, 'EditFormTitle.' + pTerm);
    },

    // build the link, combining specific params with global ones and put all in the url
    generateLink: () => {
      // if there is no items-array, create an empty one (it's required later on)
      if (!cmd.settings.items) cmd.settings.items = [];
      //#region steps for all actions: prefill, serialize, open-dialog
      // when doing new, there may be a prefill in the link to initialize the new item
      if (cmd.settings.prefill) {
        for (let i = 0; i < cmd.items.length; i++) {
          cmd.items[i].Prefill = cmd.settings.prefill;
        }
      }
      cmd.params.items = JSON.stringify(cmd.items); // Serialize/json-ify the complex items-list

      // clone the params and adjust parts based on partOfPage settings...
      let sharedParams = extend({}, sxc.manage._dialogParameters);
      if (!cmd.settings.partOfPage) {
        delete sharedParams.versioningRequirements;
        delete sharedParams.publishing;
        sharedParams.partOfPage = false;
      }

      return ngDialogUrl +
        '#' + $.param(sharedParams) +
        '&' + $.param(cmd.params) +
        isDebug;
      //#endregion
    }
  } as Cmd;
  return cmd;
}
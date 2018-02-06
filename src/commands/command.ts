﻿import { Settings } from './settings';
import { Params } from './params';
import { NgDialogParams } from '../manage/ng-dialog-params';
import { translate } from '../translate/2sxc.translate';

export class Command {

  items: any;
  params: Params;

  constructor(public sxc: SxcInstanceWithInternals, public settings: Settings, public ngDialogUrl: string, public isDebug: string) {
    this.settings = settings;
    this.items = settings.items || []; // use predefined or create empty array
    this.params = Object.assign({
      dialog: settings.dialog || settings.action // the variable used to name the dialog changed in the history of 2sxc from action to dialog
    },
      settings.params) as Params;
  }

  addSimpleItem = () => {
    let item = {} as Item;
    let ct: string = this.settings.contentType || this.settings.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
    if (this.settings.entityId) item.EntityId = this.settings.entityId;
    if (ct) item.ContentTypeName = ct;
    // only add if there was stuff to add
    if (item.EntityId || item.ContentTypeName) this.items.push(item);
  };

  // this adds an item of the content-group, based on the group GUID and the sequence number
  addContentGroupItem = (guid, index, part, isAdd, isEntity, cbid, sectionLanguageKey) => {
    this.items.push({
      Group: {
        Guid: guid,
        Index: index,
        Part: part,
        Add: isAdd
      },
      Title: translate(sectionLanguageKey)
    });
  };

  // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
  addContentGroupItemSetsToEditList = withPresentation => {
    let isContentAndNotHeader = (this.settings.sortOrder !== -1),
      index = isContentAndNotHeader ? this.settings.sortOrder : 0,
      prefix = isContentAndNotHeader ? '' : 'List',
      cTerm = prefix + 'Content',
      pTerm = prefix + 'Presentation',
      isAdd = this.settings.action === 'new',
      groupId = this.settings.contentGroupId;
    this.addContentGroupItem(groupId, index, cTerm.toLowerCase(), isAdd, this.settings.cbIsEntity, this.settings.cbId, 'EditFormTitle.' + cTerm);

    if (withPresentation) this.addContentGroupItem(groupId, index, pTerm.toLowerCase(), isAdd, this.settings.cbIsEntity, this.settings.cbId, 'EditFormTitle.' + pTerm);
  }

  // build the link, combining specific params with global ones and put all in the url
  generateLink = () => {
    // if there is no items-array, create an empty one (it's required later on)
    if (!this.settings.items) this.settings.items = [];
    //#region steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (this.settings.prefill) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].Prefill = this.settings.prefill;
      }
    }
    this.params.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

    // clone the params and adjust parts based on partOfPage settings...
    let sharedParams = Object.assign({}, this.sxc.manage._dialogParameters) as NgDialogParams;
    if (!this.settings.partOfPage) {
      delete sharedParams.versioningRequirements;
      delete sharedParams.publishing;
      sharedParams.partOfPage = false;
    }

    return this.ngDialogUrl +
      '#' + $.param(sharedParams) +
      '&' + $.param(this.params) +
      this.isDebug;
    //#endregion
  }
}
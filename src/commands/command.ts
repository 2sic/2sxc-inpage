import { ContextOfButton } from '../context/context-of-button';
import { NgDialogParams } from '../manage/ng-dialog-params';
import { translate } from '../translate/2sxc.translate';
import { Params } from './params';
import { Settings } from './settings';
import { ButtonConfig } from '../toolbar/button/button-config';
import { buildNgDialogParams } from '../manage/api';

export class Command {
  sxc: SxcInstanceWithInternals;
  items: any;
  params: Params;


  constructor(public context: ContextOfButton, public ngDialogUrl: string, public isDebug: string) {
    this.sxc = context.sxc.sxc;
    //this.settings = settings;
    this.items = context.button.action.params.items || []; // use predefined or create empty array
    this.params = Object.assign({
        dialog:
          context.button.dialog || context.button.action.name, // the variable used to name the dialog changed in the history of 2sxc from action to dialog
      },
      this.evalPropOrFunction(context.button.params, context, {})) as Params;
  }

  private evalPropOrFunction = (propOrFunction: any, context: ContextOfButton, fallback: any) => {
    if (propOrFunction === undefined || propOrFunction === null) {
      return fallback;
    }
    return (typeof (propOrFunction) === 'function' ? propOrFunction(context) : propOrFunction);
  }

  addSimpleItem = () => {
    const item = {} as Item;
    const ct = this.context.button.action.params.contentType || this.context.button.action.params.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
    if (this.context.button.action.params.entityId) {
      item.EntityId = this.context.button.action.params.entityId;
    }
    if (ct) {
      item.ContentTypeName = ct;
    }
    // only add if there was stuff to add
    if (item.EntityId || item.ContentTypeName) {
      this.items.push(item);
    }
  }

  // this adds an item of the content-group, based on the group GUID and the sequence number
  addContentGroupItem = (
    guid: string,
    index: number,
    part: string,
    isAdd: boolean,
    isEntity: boolean,
    cbid: number,
    sectionLanguageKey: string) => {
    this.items.push({
      Group: {
        Guid: guid,
        Index: index,
        Part: part,
        Add: isAdd,
      },
      Title: translate(sectionLanguageKey),
    });
  }

  // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
  addContentGroupItemSetsToEditList = (withPresentation: boolean) => {
    const isContentAndNotHeader = (this.context.button.action.params.sortOrder !== -1);
    const index = isContentAndNotHeader ? this.context.button.action.params.sortOrder : 0;
    const prefix = isContentAndNotHeader ? '' : 'List';
    const cTerm = prefix + 'Content';
    const pTerm = prefix + 'Presentation';
    const isAdd = this.context.button.action.name === 'new';
    const groupId = this.context.contentBlock.contentGroupId;

    this.addContentGroupItem(groupId,
      index,
      cTerm.toLowerCase(),
      isAdd,
      this.context.contentBlock.isEntity,
      this.context.contentBlock.id,
      `EditFormTitle.${cTerm}`);

    if (withPresentation) {
      this.addContentGroupItem(groupId,
        index,
        pTerm.toLowerCase(),
        isAdd,
        this.context.contentBlock.isEntity,
        this.context.contentBlock.id,
        `EditFormTitle.${pTerm}`);
    }
  }

  // build the link, combining specific params with global ones and put all in the url
  generateLink = (context: ContextOfButton) => {
    // if there is no items-array, create an empty one (it's required later on)
    if (!context.button.action.params.items) {
      context.button.action.params.items = [];
    }
    //#region steps for all actions: prefill, serialize, open-dialog
    // when doing new, there may be a prefill in the link to initialize the new item
    if (context.button.action.params.prefill) {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].Prefill = context.button.action.params.prefill;
      }
    }
    this.params.items = JSON.stringify(this.items); // Serialize/json-ify the complex items-list

    // clone the params and adjust parts based on partOfPage settings...
    var ngDialogParams = buildNgDialogParams(this.sxc, this.context.sxc.editContext);
    const sharedParams = Object.assign({}, ngDialogParams) as NgDialogParams;
    const partOfPage = context.button.partOfPage(context);
    if (!partOfPage) {
      delete sharedParams.versioningRequirements;
      delete sharedParams.publishing;
      sharedParams.partOfPage = false;
    }

    return this.ngDialogUrl +
      '#' +
      $.param(sharedParams) +
      '&' +
      $.param(this.params) +
      this.isDebug;
    //#endregion
  }
}

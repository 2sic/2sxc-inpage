import { $quickE as quickE } from './quick-e';
import { copyPasteInPage } from './$quickE.clipboard';
import { cb } from './$quickE.cmds';
import { selectors } from './selectors-instance';

/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
  let list: any = quickE.main.actionsForCb.closest(selectors.cb.listSelector);
  let listItems: any = list.find(selectors.cb.selector);
  let actionConfig: any = JSON.parse(list.attr(selectors.cb.context));
  let index: number = 0;
  let newGuid: string | null  = actionConfig.guid || null;

  if (quickE.main.actionsForCb.hasClass(selectors.cb.class))
    index = listItems.index(quickE.main.actionsForCb[0]) + 1;

  // check cut/paste
  let cbAction = $(this).data('action');
  if (cbAction) {
    // this is a cut/paste action
    return copyPasteInPage(cbAction, list, index, selectors.cb.id);
  } else {
    let appOrContent = $(this).data('type');
    return cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
  }
}

quickE.cbActions.click(onCbButtonClick);

import { selectors } from './$quickE.{}';
import { copyPasteInPage } from './$quickE.clipboard';

/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
  var list: any = $quickE.main.actionsForCb.closest(selectors.cb.listSelector);
  var listItems: any = list.find(selectors.cb.selector);
  var actionConfig: any = JSON.parse(list.attr(selectors.cb.context));
  var index: number = 0;
  var newGuid: any  = actionConfig.guid || null;

  if ($quickE.main.actionsForCb.hasClass(selectors.cb.class))
    index = listItems.index($quickE.main.actionsForCb[0]) + 1;

  // check cut/paste
  var cbAction = $(this).data("action");
  if (cbAction) {
    // this is a cut/paste action
    return copyPasteInPage(cbAction, list, index, selectors.cb.id);
  } else {
    var appOrContent = $(this).data("type");
    return $quickE.cmds.cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
  }
}

$quickE.cbActions.click(onCbButtonClick);

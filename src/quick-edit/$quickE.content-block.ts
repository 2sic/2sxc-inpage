// content-block specific stuff like actions

function onCbButtonClick() {
  var list: any = $quickE.main.actionsForCb.closest($quickE.selectors.cb.listSelector);
  var listItems: any = list.find($quickE.selectors.cb.selector);
  var actionConfig: any = JSON.parse(list.attr($quickE.selectors.cb.context));
  var index: number = 0;
  var newGuid: any  = actionConfig.guid || null;

  if ($quickE.main.actionsForCb.hasClass($quickE.selectors.cb.class))
    index = listItems.index($quickE.main.actionsForCb[0]) + 1;

  // check cut/paste
  var cbAction = $(this).data("action");
  if (cbAction) {
    // this is a cut/paste action
    return $quickE.copyPasteInPage(cbAction, list, index, $quickE.selectors.cb.id);
  } else {
    var appOrContent = $(this).data("type");
    return $quickE.cmds.cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
  }
}

$quickE.cbActions.click(onCbButtonClick);

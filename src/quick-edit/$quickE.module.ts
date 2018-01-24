import { selectors } from './$quickE.{}';
import modManage from './$quickE.modManage';
var mm = new modManage();

/**
 * module specific stuff
 */
function onModuleButtonClick() {
  var type = $(this).data("type"),
    dnnMod = $quickE.main.actionsForModule,
    pane = dnnMod.closest(selectors.mod.listSelector),
    index = 0;

  if (dnnMod.hasClass("DnnModule"))
    index = pane.find(".DnnModule").index(dnnMod[0]) + 1;

  var cbAction = $(this).data("action");
  if (cbAction)  // copy/paste
    return $quickE.copyPasteInPage(cbAction, pane, index, selectors.mod.id);

  return mm.create(mm.getPaneName(pane), index, type);
}

// bind module actions click
$quickE.modActions.click(onModuleButtonClick);

import { $quickE as quickE, selectors } from './$quickE.{}';
import { copyPasteInPage } from './$quickE.clipboard';
import { modManage } from './$quickE.modManage';

let mm = new modManage();

/**
 * module specific stuff
 */
function onModuleButtonClick() {
  var type = $(this).data("type"),
    dnnMod = quickE.main.actionsForModule,
    pane = dnnMod.closest(selectors.mod.listSelector),
    index = 0;

  if (dnnMod.hasClass("DnnModule"))
    index = pane.find(".DnnModule").index(dnnMod[0]) + 1;

  var cbAction = $(this).data("action");
  if (cbAction) {
    return copyPasteInPage(cbAction, pane, index, selectors.mod.id); // copy/paste
  }
  return mm.create(mm.getPaneName(pane), index, type);
}

/**
 * bind module actions click
 */
quickE.modActions.click(onModuleButtonClick);

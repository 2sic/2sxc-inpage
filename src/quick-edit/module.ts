import { $quickE as quickE } from './quick-e';
import { copyPasteInPage } from './clipboard';
import { modManage } from './mod-manage';
import { selectors } from './selectors-instance';

let mm = new modManage();

/**
 * module specific stuff
 */
function onModuleButtonClick() {
  let type = $(this).data('type'),
    dnnMod = quickE.main.actionsForModule,
    pane = dnnMod.closest(selectors.mod.listSelector),
    index = 0;

  if (dnnMod.hasClass('DnnModule'))
    index = pane.find('.DnnModule').index(dnnMod[0]) + 1;

  let cbAction = $(this).data('action');
  if (cbAction) {
    return copyPasteInPage(cbAction, pane, index, selectors.mod.id); // copy/paste
  }
  return mm.create(mm.getPaneName(pane), index, type);
}

/**
 * bind module actions click
 */
quickE.modActions.click(onModuleButtonClick);

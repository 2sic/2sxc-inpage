import { generateButtonHtml } from './generate-button-html';
import * as buttonHelpers from './helpers';
import { standardButtons } from './standard-buttons';

export function generateToolbarHtml(sxc, tbConfig, moreSettings) {

  console.log("TV#1: ", sxc, tbConfig, moreSettings);

  // if it has an action or is an array, keep that. Otherwise get standard buttons
  tbConfig = tbConfig || {}; // if null/undefined, use empty object
  let btnList = tbConfig;
  if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
    btnList = standardButtons(sxc.manage._user.canDesign /* editContext.User.CanDesign */, tbConfig);

  // whatever we had, if more settings were provided, override with these...
  let tlbDef = buttonHelpers.buildFullDefinition(btnList, sxc.manage._commands.commands, sxc.manage._instanceConfig /* tb.config */, moreSettings);
  let btnGroups = tlbDef.groups;
  let behaviourClasses = ' sc-tb-hover-' + tlbDef.settings.hover + ' sc-tb-show-' + tlbDef.settings.show;

  // todo: these settings assume it's not in an array...
  let tbClasses = 'sc-menu group-0 ' + behaviourClasses + ' ' +
    ((tbConfig.sortOrder === -1) ? ' listContent' : '') +
    (tlbDef.settings.classes ? ' ' + tlbDef.settings.classes : '');
  let toolbar = $('<ul />', {
    'class': tbClasses,
    'onclick': 'let e = arguments[0] || window.event; e.stopPropagation();'
  });

  for (let i = 0; i < btnGroups.length; i++) {
    let btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++)
      toolbar.append($('<li />').append($(generateButtonHtml(sxc, btns[h], i))));
  }

  toolbar.attr('group-count', btnGroups.length);
  return toolbar[0].outerHTML;
}

﻿import { Action } from '../commands/action';
import { commandInitializeInstanceCommands } from '../commands/command-initialize-instance-commands';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getEditContext } from '../manage/api';
import { generateButtonHtml } from './generate-button-html';
import * as buttonHelpers from './helpers';
import { standardButtons } from './standard-buttons';

export function generateToolbarHtml(sxc: SxcInstanceWithInternals, tbConfig: any, moreSettings: any): string {

  // if it has an action or is an array, keep that. Otherwise get standard buttons
  tbConfig = tbConfig || {}; // if null/undefined, use empty object
  let btnList = tbConfig;
  if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
    btnList = standardButtons(sxc.manage._user.canDesign /* editContext.User.CanDesign */, tbConfig);

  // whatever we had, if more settings were provided, override with these...
  const editContext: DataEditContext = getEditContext(sxc);
  const commands: Action = commandInitializeInstanceCommands(editContext);
  const tlbDef = buttonHelpers.buildFullDefinition(btnList, /*sxc.manage._commands.*/commands, sxc.manage._instanceConfig /* tb.config */, moreSettings);
  const btnGroups = tlbDef.groups;
  const behaviourClasses = ' sc-tb-hover-' + tlbDef.settings.hover + ' sc-tb-show-' + tlbDef.settings.show;

  // todo: these settings assume it's not in an array...
  const tbClasses = 'sc-menu group-0 ' + behaviourClasses + ' ' +
    ((tbConfig.sortOrder === -1) ? ' listContent' : '') +
    (tlbDef.settings.classes ? ' ' + tlbDef.settings.classes : '');

  const toolbar = $('<ul />', {
    'class': tbClasses,
    'onclick': 'let e = arguments[0] || window.event; e.stopPropagation();',
  });

  for (let i = 0; i < btnGroups.length; i++) {
    const btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++)
      toolbar.append($('<li />').append($(generateButtonHtml(sxc, btns[h], i))));
  }

  toolbar.attr('group-count', btnGroups.length);
  return toolbar[0].outerHTML;
}

import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getEditContext } from '../manage/api';
import { Commands } from './command/commands';
import { generateButtonHtml } from './generate-button-html';
import * as buttonHelpers from './helpers';
import { standardButtons } from './standard-buttons';
import { ToolbarSettings } from './toolbar/toolbar-settings';

export function generateToolbarHtml(sxc: SxcInstanceWithInternals, tbConfig: any, toolbarSettings: ToolbarSettings): any {
  // if it has an action or is an array, keep that. Otherwise get standard buttons
  tbConfig = tbConfig || {}; // if null/undefined, use empty object
  let btnList = tbConfig;
  if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
    btnList = standardButtons(sxc.manage._user.canDesign /* editContext.User.CanDesign */, tbConfig);

  const editContext: DataEditContext = getEditContext(sxc);

  // stv: temp start
  const newCommands = new Commands(editContext);
  // console.log('stv: new Command JSON', JSON.stringify(newCommands));
  console.log('stv: new Command', newCommands);
  // stv: temp end

  // whatever we had, if more settings were provided, override with these...
  const tlbDef = buttonHelpers.buildFullDefinition(btnList, newCommands, sxc.manage._instanceConfig /* tb.config */, toolbarSettings);
  const btnGroups = tlbDef.items;
  const behaviourClasses = ` sc-tb-hover-${tlbDef.settings.hover} sc-tb-show-${tlbDef.settings.show}`;

  // todo: these settings assume it's not in an array...
  const tbClasses = 'sc-menu group-0 ' + behaviourClasses + ' ' +
    ((tbConfig.sortOrder === -1) ? ' listContent' : '') +
    (tlbDef.settings.classes ? ' ' + tlbDef.settings.classes : '');

  const toolbar = $('<ul />', {
    // ReSharper disable once UsingOfReservedWord
    class: tbClasses,
    onclick: 'let e = arguments[0] || window.event; e.stopPropagation();',
  });

  for (let i = 0; i < btnGroups.length; i++) {
    const btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++)
      toolbar.append($('<li />').append($(generateButtonHtml(sxc, btns[h], i))));
  }

  toolbar.attr('group-count', btnGroups.length);
  return toolbar[0].outerHTML;
}

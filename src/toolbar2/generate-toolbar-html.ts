import { generateButtonHtml } from './generate-button-html';
import { ToolbarConfig } from './toolbar/toolbar-config';
import { ToolbarSettings } from './toolbar/toolbar-settings';

export function generateToolbarHtml(sxc: SxcInstanceWithInternals, tbConfig: any, toolbarSettings: ToolbarSettings, tlbDef: ToolbarConfig): any {

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

import { generateButtonHtml } from './generate-button-html';
import { ToolbarConfig } from './toolbar/toolbar-config';

export function generateToolbarHtml(sxc: SxcInstanceWithInternals, toolbarData: any, toolbarConfig: ToolbarConfig): string {

  // debugger;
  const btnGroups = toolbarConfig.groups;

  const behaviourClasses = ` sc-tb-hover-${toolbarConfig.settings.hover} sc-tb-show-${toolbarConfig.settings.show}`;

  // todo: these settings assume it's not in an array...
  const tbClasses = 'sc-menu group-0 ' + behaviourClasses + ' ' +
    ((toolbarData.sortOrder === -1) ? ' listContent' : '') +
    (toolbarConfig.settings.classes ? ' ' + toolbarConfig.settings.classes : '');

  const toolbar = $('<ul />', {
    // ReSharper disable once UsingOfReservedWord
    class: tbClasses,
    onclick: 'var e = arguments[0] || window.event; e.stopPropagation();',
  });

  for (let i = 0; i < btnGroups.length; i++) {
    const btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++)
      toolbar.append($('<li />').append($(generateButtonHtml(sxc, btns[h], i))));
  }

  toolbar.attr('group-count', btnGroups.length);
  return toolbar[0].outerHTML;
}

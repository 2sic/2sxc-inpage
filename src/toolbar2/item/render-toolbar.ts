import { ToolbarConfig } from '../toolbar/toolbar-config';
import { renderGroups } from './render-groups';

export function renderToolbar(sxc: SxcInstanceWithInternals, toolbarData: any, toolbarConfig: ToolbarConfig): string {
  // todo: stv, remove jquery
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

  // render groups of buttons
  const groups = renderGroups(sxc, toolbarConfig);
  toolbar.append(groups);
  toolbar.attr('group-count', groups.length);

  return toolbar[0].outerHTML;
}

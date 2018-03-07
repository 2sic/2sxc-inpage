import { ContextOfButton } from '../../context/context-of-button';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { renderGroups } from './render-groups';
import { addClasses } from './render-helpers';

export function renderToolbar(context: ContextOfButton, toolbarData: any, toolbarConfig: ToolbarConfig): string {

  // render groups of buttons
  const groups = renderGroups(context, toolbarConfig);

  // render toolbar
  const toolbar = document.createElement('ul');
  toolbar.classList.add(...['sc-menu', 'group-0']);

  // add behaviour classes
  toolbar.classList.add(`sc-tb-hover-${toolbarConfig.settings.hover}`);
  toolbar.classList.add(`sc-tb-show-${toolbarConfig.settings.show}`);
  if (toolbarData.sortOrder === -1) {
    toolbar.classList.add('listContent');
  }
  addClasses(toolbar, toolbarConfig.settings.classes, ' ');
  toolbar.setAttribute('onclick', 'var e = arguments[0] || window.event; e.stopPropagation();'); // serialize JavaScript because of ajax

  // add button groups to toolbar
  toolbar.setAttribute('group-count', toolbarConfig.groups.length.toString());
  for (let g = 0; g < groups.length; g++) {
    toolbar.appendChild(groups[g]);
  }

  return toolbar.outerHTML;
}

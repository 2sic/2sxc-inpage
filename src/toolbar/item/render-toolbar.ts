import { ContextOfButton } from '../../context/context-of-button';
import { renderGroups } from './render-groups';
import { addClasses } from './render-helpers';

export function renderToolbar(context: ContextOfButton): string {
  // render groups of buttons
  const groups = renderGroups(context);

  // render toolbar
  const toolbar = document.createElement('ul');
  toolbar.classList.add('sc-menu');
  toolbar.classList.add('group-0'); // IE11 fix, add each class separately

  // add behaviour classes
  toolbar.classList.add(`sc-tb-hover-${context.toolbar.settings.hover}`);
  toolbar.classList.add(`sc-tb-show-${context.toolbar.settings.show}`);
  if (context.toolbar.params.sortOrder === -1) {
    toolbar.classList.add('listContent');
  }
  addClasses(toolbar, context.toolbar.settings.classes, ' ');
  toolbar.setAttribute('onclick', 'var e = arguments[0] || window.event; console.log("stv: ul-menu click", e.screenX, e.screenY, e.target); e.preventDefault();'); // serialize JavaScript because of ajax
  // e.target.style.opacity = "1";
  toolbar.setAttribute('onmouseenter', 'var e = arguments[0] || window.event; console.log("stv: mouseenter", e.screenX, e.screenY, e.target); e.target.style.opacity = "1"'); // serialize JavaScript because of ajax
  toolbar.setAttribute('onmousover', 'var e = arguments[0] || window.event; console.log("stv: mouseover", e.screenX, e.screenY, e.target);'); // serialize JavaScript because of ajax
  toolbar.setAttribute('onmouseleave', 'var e = arguments[0] || window.event; console.log("stv: mouseleave", e.screenX, e.screenY, e.target); if (e.screenX!=0 && e.screenY!=0) e.target.style.opacity = "0";'); // serialize JavaScript because of ajax
  toolbar.setAttribute('onmouseout', 'var e = arguments[0] || window.event; console.log("stv: mouseout", e.screenX, e.screenY, e.target);'); // serialize JavaScript because of ajax
  toolbar.setAttribute('onresize', 'var e = arguments[0] || window.event; console.log("stv: resize", e.screenX, e.screenY, e.target);'); // serialize JavaScript because of ajax

  // add button groups to toolbar
  toolbar.setAttribute('group-count', context.toolbar.groups.length.toString());
  for (let g = 0; g < groups.length; g++) {
    toolbar.appendChild(groups[g]);
  }

  return toolbar.outerHTML;
}

import { ToolbarConfig } from '../toolbar/toolbar-config';
import { renderButton } from './render-button';

/**
 * render groups of buttons in toolbar
 * @param sxc
 * @param toolbarConfig
 */
export function renderGroups(sxc: SxcInstanceWithInternals, toolbarConfig: ToolbarConfig): HTMLElement[] {
  const groupsBuffer: HTMLElement[] = []; // temporary storage for detached HTML DOM objects
  const btnGroups = toolbarConfig.groups;
  for (let i = 0; i < btnGroups.length; i++) {
    const btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++) {
      // create one button
      const button = renderButton(sxc, btns[h], i);
      // add button to group of buttons
      const item = document.createElement('li');
      item.appendChild(button);
      groupsBuffer.push(item);
    }
  }
  return groupsBuffer;
}

import { ToolbarConfig } from '../toolbar/toolbar-config';
import { renderButton } from './render-button';

/**
 * render groups of buttons in toolbar
 * @param sxc
 * @param toolbarConfig
 */
export function renderGroups(sxc: SxcInstanceWithInternals, toolbarConfig: ToolbarConfig): any[] {

  const groupsBuffer = []; // temporary storage for detached DOM objects

  const btnGroups = toolbarConfig.groups;

  for (let i = 0; i < btnGroups.length; i++) {
    const btns = btnGroups[i].buttons;
    for (let h = 0; h < btns.length; h++) {

      // render one button
      const button = renderButton(sxc, btns[h], i);
      groupsBuffer.push($('<li />').append($(button)));

    }
  }

  return groupsBuffer;
}

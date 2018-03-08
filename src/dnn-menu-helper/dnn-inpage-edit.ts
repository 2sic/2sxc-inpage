import { context } from '../context/context';
import { getTag } from '../manage/api';
import { getSxcInstance } from '../x-bootstrap/sxc';

/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: any;
  private tag: HTMLElement;

  constructor(moduleId: number) {
    const sxc = getSxcInstance(moduleId) as SxcInstanceWithInternals;
    this.tag = getTag(sxc);
    this.run = sxc.manage.run2;
  }

  changeLayoutOrContent = () => { this.run(context(this.tag), 'layout'); };

  addItem = () => { this.run(context(this.tag), 'add', { useModuleList: true, sortOrder: 0 }); };

  edit = () => { this.run(context(this.tag), 'edit', { useModuleList: true, sortOrder: 0 }); };

  adminApp = () => { this.run(context(this.tag), 'app'); };

  adminZone = () => { this.run(context(this.tag), 'zone'); };

  develop = () => { this.run(context(this.tag), 'template-develop'); };
}

window.$2sxcActionMenuMapper = (moduleId: number) => {
  return new ActionMenuMapper(moduleId);
};

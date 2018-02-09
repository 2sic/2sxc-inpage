import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
export class ActionMenuMapper {
  private run: any;

  constructor(moduleId: number) {
    const sxc: SxcInstanceWithInternals = twoSxc(moduleId) as SxcInstanceWithInternals;
    this.run = sxc.manage.run;
  }

  changeLayoutOrContent = () => { this.run('layout'); };

  addItem = () => { this.run('add', { useModuleList: true, sortOrder: 0 }); };

  edit = () => { this.run('edit', { useModuleList: true, sortOrder: 0 }); };

  adminApp = () => { this.run('app'); };

  adminZone = () => { this.run('zone'); };

  develop = () => { this.run('template-develop'); };
}

window.$2sxcActionMenuMapper = (moduleId: number) => {
  return new ActionMenuMapper(moduleId);
};

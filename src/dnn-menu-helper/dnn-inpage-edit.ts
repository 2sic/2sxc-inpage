import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
// Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)

let $2sxcActionMenuMapper = moduleId => {
  let sxc: SxcInstanceWithInternals = twoSxc(moduleId) as SxcInstanceWithInternals;
  let run = sxc.manage.run;
  return {
    changeLayoutOrContent() { run('layout'); },
    addItem() { run('add', { useModuleList: true, sortOrder: 0 }); },
    edit() { run('edit', { useModuleList: true, sortOrder: 0 }); },
    adminApp() { run('app'); },
    adminZone() { run('zone'); },
    develop() { run('template-develop'); },
  };
};
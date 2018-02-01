import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */
// 
twoSxc.system = {
  finishUpgrade: finishUpgrade
};

// upgrade command - started when an error contains a link to start this
function finishUpgrade(domElement: any): void {
  let mc = twoSxc(domElement);
  $.ajax({
    type: 'get',
    url: mc.resolveServiceUrl('view/module/finishinstallation'),
    beforeSend: $.ServicesFramework(mc.id).setModuleHeaders
  }).success(() => {
    alert('Upgrade ok, restarting the CMS and reloading...');
    location.reload();
  });
  alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
}

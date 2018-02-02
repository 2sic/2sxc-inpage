"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */
// 
module_bootstrapper_1.$2sxc.system = {
    finishUpgrade: finishUpgrade
};
// upgrade command - started when an error contains a link to start this
function finishUpgrade(domElement) {
    var mc = module_bootstrapper_1.$2sxc(domElement);
    $.ajax({
        type: 'get',
        url: mc.resolveServiceUrl('view/module/finishinstallation'),
        beforeSend: $.ServicesFramework(mc.id).setModuleHeaders
    }).success(function () {
        alert('Upgrade ok, restarting the CMS and reloading...');
        location.reload();
    });
    alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
}
//# sourceMappingURL=2sxc.system.js.map
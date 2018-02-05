"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
// Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
var $2sxcActionMenuMapper = function (moduleId) {
    var sxc = module_bootstrapper_1.$2sxc(moduleId);
    var run = sxc.manage.run;
    return {
        changeLayoutOrContent: function () { run('layout'); },
        addItem: function () { run('add', { useModuleList: true, sortOrder: 0 }); },
        edit: function () { run('edit', { useModuleList: true, sortOrder: 0 }); },
        adminApp: function () { run('app'); },
        adminZone: function () { run('zone'); },
        develop: function () { run('template-develop'); },
    };
};
//# sourceMappingURL=dnn-inpage-edit.js.map
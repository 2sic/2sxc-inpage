// Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)

var $2sxcActionMenuMapper = moduleId => {
    var run = $2sxc(moduleId).manage.run;
    return {
        changeLayoutOrContent() { run("layout"); },
        addItem() { run("add", { useModuleList: true, sortOrder: 0 }); },
        edit() { run("edit", { useModuleList: true, sortOrder: 0 }); },
        adminApp() { run("app"); },
        adminZone() { run("zone"); },
        develop() { run("template-develop"); },
    };
};
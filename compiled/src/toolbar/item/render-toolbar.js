"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_groups_1 = require("./render-groups");
var render_helpers_1 = require("./render-helpers");
function renderToolbar(context) {
    // render groups of buttons
    var groups = render_groups_1.renderGroups(context);
    // render toolbar
    var toolbar = document.createElement('ul');
    (_a = toolbar.classList).add.apply(_a, ['sc-menu', 'group-0']);
    // add behaviour classes
    toolbar.classList.add("sc-tb-hover-" + context.toolbar.settings.hover);
    toolbar.classList.add("sc-tb-show-" + context.toolbar.settings.show);
    if (context.toolbar.params.sortOrder === -1) {
        toolbar.classList.add('listContent');
    }
    render_helpers_1.addClasses(toolbar, context.toolbar.settings.classes, ' ');
    toolbar.setAttribute('onclick', 'var e = arguments[0] || window.event; e.stopPropagation();'); // serialize JavaScript because of ajax
    // add button groups to toolbar
    toolbar.setAttribute('group-count', context.toolbar.groups.length.toString());
    for (var g = 0; g < groups.length; g++) {
        toolbar.appendChild(groups[g]);
    }
    return toolbar.outerHTML;
    var _a;
}
exports.renderToolbar = renderToolbar;
//# sourceMappingURL=render-toolbar.js.map
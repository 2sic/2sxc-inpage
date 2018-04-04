"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var api_1 = require("../manage/api");
var render_toolbar_1 = require("./item/render-toolbar");
var toolbar_manager_1 = require("./toolbar-manager");
var toolbar_expand_config_1 = require("./toolbar/toolbar-expand-config");
var toolbar_settings_1 = require("./toolbar/toolbar-settings");
var log_1 = require("../logging/log");
// quick debug - set to false if not needed for production
var dbg = false;
// generate an empty / fallback toolbar tag
function generateFallbackToolbar() {
    var settingsString = JSON.stringify(toolbar_settings_1.settingsForEmptyToolbar);
    return $("<ul class='sc-menu' toolbar='' settings='" + settingsString + "'/>");
}
exports.generateFallbackToolbar = generateFallbackToolbar;
// find current toolbars inside this wrapper-tag
function getToolbarTags(parentTag) {
    var allInner = $('.sc-menu[toolbar],.sc-menu[data-toolbar]', parentTag);
    // return only those, which don't belong to a sub-item
    var res = allInner.filter(function (i, e) { return $(e).closest('.sc-content-block')[0] === parentTag[0]; });
    if (dbg) {
        console.log('found toolbars for parent', parentTag, res);
    }
    return res;
}
// create a process-toolbar command to generate toolbars inside a tag
function buildToolbars(parentLog, parentTag, optionalId) {
    var log = new log_1.Log('Tlb.BldAll', parentLog);
    parentTag = $(parentTag || '.DnnModule-' + optionalId);
    // if something says the toolbars are disabled, then skip
    if (parentTag.attr(toolbar_manager_1.disableToolbarAttribute)) {
        return;
    }
    // todo: change mechanism to not render toolbar, this uses a secret class name which the toolbar shouldn't know
    // don't add, if it is has un-initialized content
    // 2017-09-08 2dm disabled this, I believe the bootstrapping should never call this any more, if sc-uninitialized. if ok, then delete this in a few days
    // let disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;
    var toolbars = getToolbarTags(parentTag);
    // no toolbars found, must help a bit because otherwise editing is hard
    if (toolbars.length === 0) {
        if (dbg) {
            console.log("didn't find toolbar, so will auto-create", parentTag);
        }
        var outsideCb = !parentTag.hasClass($2sxc.c.cls.scCb); // "sc-content-block");
        var contentTag = outsideCb ? parentTag.find('div.sc-content-block') : parentTag;
        contentTag.addClass($2sxc.c.cls.scElm); // "sc-element");
        contentTag.prepend(generateFallbackToolbar());
        toolbars = getToolbarTags(parentTag);
    }
    for (var i = 0; i < toolbars.length; i++) {
        var tag = $(toolbars[i]);
        var toolbarData = void 0;
        var toolbarSettings = void 0;
        var at = $2sxc.c.attr;
        try {
            var data = getTextContent(toolbars[i], at.toolbar, at.toolbarData);
            toolbarData = JSON.parse(data);
            var settings = getTextContent(toolbars[i], at.settings, at.settingsData);
            toolbarSettings = JSON.parse(settings);
        }
        catch (err) {
            console.error('error in settings JSON - probably invalid - make sure you also quote your properties like "name": ...', 
            // ReSharper disable once UsageOfPossiblyUnassignedValue
            toolbarData, err);
            return;
        }
        try {
            var cnt = context_1.context(tag);
            cnt.toolbar = toolbar_expand_config_1.expandToolbarConfig(cnt, toolbarData, toolbarSettings, log);
            var toolbar_1 = render_toolbar_1.renderToolbar(cnt);
            tag.replaceWith(toolbar_1);
        }
        catch (err2) {
            // note: errors happen a lot on custom toolbars, make sure the others are still rendered
            console.error('error creating toolbar - will skip this one', err2);
        }
    }
}
exports.buildToolbars = buildToolbars;
function getTextContent(toolbar, name1, name2) {
    var item1 = toolbar.attributes.getNamedItem(name1);
    var item2 = toolbar.attributes.getNamedItem(name2);
    if (item1 && item1.textContent) {
        return item1.textContent;
    }
    else if (item2 && item2.textContent) {
        return item2.textContent;
    }
    ;
    return '{}';
}
function disable(tag) {
    tag = $(tag);
    tag.attr(toolbar_manager_1.disableToolbarAttribute, true);
}
exports.disable = disable;
function isDisabled(sxc) {
    var tag = $(api_1.getTag(sxc));
    return !!tag.attr(toolbar_manager_1.disableToolbarAttribute);
}
exports.isDisabled = isDisabled;
//# sourceMappingURL=build-toolbars.js.map
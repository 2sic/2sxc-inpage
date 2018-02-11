"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_config_1 = require("./$quickE.config");
var _quickE_positioning_1 = require("./$quickE.positioning");
var selectors_instance_1 = require("./selectors-instance");
function enable() {
    // build all toolbar html-elements
    _quickE___1.prepareToolbarInDom();
    // Cache the panes (because panes can't change dynamically)
    initPanes();
}
;
/**
 * start watching for mouse-move
 */
function watchMouse() {
    var refreshTimeout = null;
    $('body').on('mousemove', function (e) {
        if (refreshTimeout === null)
            refreshTimeout = window.setTimeout(function () {
                requestAnimationFrame(function () {
                    _quickE_positioning_1.refresh(e);
                    refreshTimeout = null;
                });
            }, 20);
    });
}
;
function start() {
    try {
        _quickE_config_1._readPageConfig();
        if (_quickE___1.$quickE.config.enable) {
            // initialize first body-offset
            _quickE___1.$quickE.bodyOffset = _quickE_positioning_1.getBodyPosition();
            enable();
            toggleParts();
            watchMouse();
        }
    }
    catch (e) {
        console.error("couldn't start quick-edit", e);
    }
}
;
/**
 * cache the panes which can contain modules
 */
function initPanes() {
    _quickE___1.$quickE.cachedPanes = $(selectors_instance_1.selectors.mod.listSelector);
    _quickE___1.$quickE.cachedPanes.addClass('sc-cb-pane-glow');
}
;
/**
 * enable/disable module/content-blocks as configured
 */
function toggleParts() {
    //// content blocks actions
    //quickE.cbActions.toggle(quickE.config.innerBlocks.enable);
    //// module actions
    //quickE.modActions.hide(quickE.config.modules.enable);
}
;
/**
 * reset the quick-edit
 * for example after ajax-loading a content-block, which may cause changed configurations
 */
function reset() {
    _quickE_config_1._readPageConfig();
    toggleParts();
}
exports.reset = reset;
;
/**
 * run on-load
 */
$(start);
//# sourceMappingURL=$quickE.start.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var configAttr = "quick-edit-config";
/**
 * the initial configuration
 */
var conf = $quickE.config = {
    enable: true,
    innerBlocks: {
        enable: null // default: auto-detect
    },
    modules: {
        enable: null // default: auto-detect
    }
};
function _readPageConfig() {
    var configs = $("[" + configAttr + "]");
    var finalConfig = {};
    var confJ;
    var confO;
    // any inner blocks found? will currently affect if modules can be inserted...
    var hasInnerCBs = ($(_quickE___1.selectors.cb.listSelector).length > 0);
    if (configs.length > 0) {
        // go through reverse list, as the last is the most important...
        for (var c = configs.length; c >= 0; c--) {
            confJ = configs[0].getAttribute(configAttr);
            try {
                confO = JSON.parse(confJ);
                $.extend(finalConfig, confO);
            }
            catch (e) {
                console.warn('had trouble with json', e);
            }
        }
        $.extend(conf, finalConfig);
    }
    // re-check "auto" or "null"
    // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
    if (conf.modules.enable === null || conf.modules.enable === 'auto')
        conf.modules.enable = !hasInnerCBs;
    // for now, ContentBlocks are only enabled if they exist on the page
    if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
        conf.innerBlocks.enable = hasInnerCBs;
}
exports._readPageConfig = _readPageConfig;
;
//# sourceMappingURL=$quickE.config.js.map
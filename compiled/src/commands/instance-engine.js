"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var Cms_1 = require("../cms/Cms");
var InstanceEngine = /** @class */ (function () {
    //commands = Commands.getInstance;
    //context: ContextOfButton;
    function InstanceEngine(sxc) {
        this.sxc = sxc;
    }
    // 2dm - don't think this is ever used, disabled for now
    // todo q2stv - do we need this?
    //// todo: stv, check this specialSettings
    //// assemble an object which will store the configuration and execute it
    //create = (context: ContextOfButton, specialSettings: Settings) => {
    //  return commandCreate(context);
    //}
    InstanceEngine.prototype.run = function (nameOrSettings, eventOrSettings, event) {
        var cntx = context_1.context(this.sxc);
        return new Cms_1.Cms().run(cntx, nameOrSettings, eventOrSettings, event);
    };
    return InstanceEngine;
}());
exports.InstanceEngine = InstanceEngine;
// 2dm - not sure why we would create a second constructor, doesn't seem to make sense
// todo q2stv - why would we have a second constructor?
//export function instanceEngine(sxc: SxcInstanceWithInternals): InstanceEngine {
//  return new InstanceEngine(sxc);
//}
//# sourceMappingURL=instance-engine.js.map
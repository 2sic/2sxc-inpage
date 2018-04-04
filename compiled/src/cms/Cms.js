"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("../commands/engine");
var has_log_1 = require("../logging/has-log");
var log_1 = require("../logging/log");
var logId = 'Cms.Api';
var dumpLog = true;
var Cms = /** @class */ (function (_super) {
    __extends(Cms, _super);
    function Cms() {
        var _this = _super.call(this, logId, null) || this;
        /**
         * if true (default) will reset the log everytime something is done
         * if false, will preserve the log over multiple calls
         */
        _this.autoReset = true;
        _this.autoDump = dumpLog;
        return _this;
    }
    /**
     * reset / clear the log
     */
    Cms.prototype.resetLog = function () {
        this.log = new log_1.Log(logId, null, 'log was reset');
    };
    ;
    Cms.prototype.run = function (context, nameOrSettings, eventOrSettings, event) {
        var _this = this;
        this.do(function () { return new engine_1.Engine(_this.log).detectParamsAndRun(context, nameOrSettings, eventOrSettings, event); });
    };
    /**
     * reset/clear the log if alwaysResetLog is true
     */
    Cms.prototype.do = function (innerCall) {
        if (this.autoReset)
            this.resetLog();
        console.log('before');
        var result = innerCall();
        console.log('after');
        if (this.autoDump)
            console.log(this.log.dump());
        return result;
    };
    return Cms;
}(has_log_1.HasLog));
exports.Cms = Cms;
//# sourceMappingURL=Cms.js.map
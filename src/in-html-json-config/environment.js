"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Environment class
 */
var Environment = /** @class */ (function () {
    function Environment(data) {
        this.WebsiteId = data.WebsiteId;
        this.WebsiteUrl = data.WebsiteUrl;
        this.PageId = data.PageId;
        this.PageUrl = data.PageUrl;
        this.parameters = data.parameters;
        this.InstanceId = data.InstanceId;
        this.SxcVersion = data.SxcVersion;
        this.SxcRootUrl = data.SxcRootUrl;
        this.IsEditable = data.IsEditable;
    }
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map
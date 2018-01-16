"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ContentBlock class
 */
var ContentBlock = /** @class */ (function () {
    function ContentBlock(data) {
        this.ShowTemplatePicker = data.ShowTemplatePicker;
        this.IsEntity = data.IsEntity;
        this.VersioningRequirements = data.VersioningRequirements;
        this.Id = data.Id;
        this.ParentFieldName = data.ParentFieldName;
        this.ParentFieldSortOrder = data.ParentFieldSortOrder;
        this.PartOfPage = data.PartOfPage;
    }
    return ContentBlock;
}());
exports.ContentBlock = ContentBlock;
//# sourceMappingURL=content-block.js.map
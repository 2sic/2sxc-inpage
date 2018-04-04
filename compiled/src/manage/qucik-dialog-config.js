"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var QucikDialogConfig = /** @class */ (function () {
    function QucikDialogConfig(editContext) {
        this.appId = editContext.ContentGroup.AppId;
        this.isContent = editContext.ContentGroup.IsContent;
        this.hasContent = editContext.ContentGroup.HasContent;
        this.isList = editContext.ContentGroup.IsList;
        this.templateId = editContext.ContentGroup.TemplateId;
        this.contentTypeId = editContext.ContentGroup.ContentTypeName;
        this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
        this.user = api_1.getUserOfEditContext(editContext);
        this.supportsAjax = editContext.ContentGroup.SupportsAjax;
    }
    return QucikDialogConfig;
}());
exports.QucikDialogConfig = QucikDialogConfig;
//# sourceMappingURL=qucik-dialog-config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _2sxc_translate_1 = require("../translate/2sxc.translate");
/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */
//#region contentItem Commands
exports.contentItems = {
    // delete command - try to really delete a content-item
    "delete": function (sxc, itemId, itemGuid, itemTitle) {
        // first show main warning / get ok
        var ok = confirm(_2sxc_translate_1.translate('Delete.Confirm')
            .replace('{id}', itemId.toString())
            .replace('{title}', itemTitle));
        if (!ok)
            return;
        sxc.webApi.delete('app-content/any/' + itemGuid, null, null, true)
            .success(function () {
            location.reload();
        }).error(function (error) {
            var msgJs = _2sxc_translate_1.translate('Delete.ErrCheckConsole');
            console.log(error);
            // check if it's a permission config problem
            if (error.status === 401)
                alert(_2sxc_translate_1.translate('Delete.ErrPermission') + msgJs);
            if (error.status === 400)
                alert(_2sxc_translate_1.translate('Delete.ErrInUse') + msgJs);
        });
    }
};
//# sourceMappingURL=item-commands.js.map
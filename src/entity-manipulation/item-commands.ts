import { translate } from '../translate/2sxc.translate';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

// this enhances the $2sxc client controller with stuff only needed when logged in

if (window.$2sxc) {

  //#region contentItem Commands
  twoSxc.contentItems = {
    // delete command - try to really delete a content-item
    "delete": function (sxc, itemId, itemGuid, itemTitle) {
      // first show main warning / get ok
      var ok = confirm(translate("Delete.Confirm")
        .replace("{id}", itemId)
        .replace("{title}", itemTitle));
      if (!ok) return;

      sxc.webApi.delete("app-content/any/" + itemGuid, null, null, true)
        .success(function () {
          location.reload();
        }).error(function (error) {
          var msgJs = translate("Delete.ErrCheckConsole");
          console.log(error);

          // check if it's a permission config problem
          if (error.status === 401) alert(translate("Delete.ErrPermission") + msgJs);
          if (error.status === 400) alert(translate("Delete.ErrInUse") + msgJs);
        });
    }
  };
  //#endregion

}

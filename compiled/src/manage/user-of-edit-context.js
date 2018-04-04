"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserOfEditContext = /** @class */ (function () {
    function UserOfEditContext() {
    }
    // todo: stv, constructor should be removed after refactoring
    //constructor(editContext?: DataEditContext) {
    //  if (editContext) {
    //    this.canDesign = editContext.User.CanDesign;
    //    this.canDevelop = editContext.User.CanDesign;
    //  }
    //}
    UserOfEditContext.fromContext = function (context) {
        var user = new UserOfEditContext();
        user.canDesign = context.user.canDesign;
        user.canDevelop = context.user.canDevelop;
        return user;
    };
    return UserOfEditContext;
}());
exports.UserOfEditContext = UserOfEditContext;
//# sourceMappingURL=user-of-edit-context.js.map
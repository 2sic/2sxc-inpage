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
var command_base_1 = require("../command-base");
/**
 * import this module to commands.ts
 */
var More = /** @class */ (function (_super) {
    __extends(More, _super);
    function More() {
        var _this = _super.call(this) || this;
        _this.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
            code: function (context, event) {
                var btn = $(event.target);
                var fullMenu = btn.closest('ul.sc-menu');
                var oldState = Number(fullMenu.attr('data-state') || 0);
                var max = Number(fullMenu.attr('group-count'));
                var newState = (oldState + 1) % max;
                fullMenu.removeClass("group-" + oldState)
                    .addClass("group-" + newState)
                    .attr('data-state', newState);
            },
        });
        return _this;
    }
    return More;
}(command_base_1.CommandBase));
exports.More = More;
// ReSharper disable once UnusedLocals
var cmd = new More();
//# sourceMappingURL=more.js.map
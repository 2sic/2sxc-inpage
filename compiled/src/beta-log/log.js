"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = require("./entry");
var maxScopeLen = 3;
var maxNameLen = 6;
var Log = /** @class */ (function () {
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     */
    function Log(name, parent, initialMessage) {
        var _this = this;
        this.name = 'unknwn';
        this.scope = 'tdo';
        this.entries = new Array();
        this.id = function () { return _this.idCache || (_this.idCache = _this.randomString(2)); };
        this.identifier = function () { return _this.scope + _this.name + _this.id(); };
        this.fullIdentifier = function () { return _this.parent.fullIdentifier() + _this.identifier(); };
        this.linkTo = function (parent) {
            _this.parent = parent || _this.parent; // if new parent isn't defined, don't replace
        };
        this.rename(name);
        this.linkTo(parent);
        if (initialMessage != null)
            this.add(initialMessage);
    }
    Log.prototype.rename = function (name) {
        try {
            var dot = name.indexOf('.');
            this.scope = dot > 0 ? name.substr(0, Math.min(dot, maxScopeLen)) + '.' : '';
            var rest = dot > 0 ? name.substr(dot + 1) : name;
            this.name = rest.substr(0, Math.min(rest.length, maxNameLen));
            this.name = this.name.substr(0, Math.min(this.name.length, maxNameLen));
        }
        catch (e) {
            /* ignore */
        }
    };
    Log.prototype.add = function (message) {
        this.addEntry(new entry_1.Entry(this, message));
        return message;
    };
    Log.prototype.addEntry = function (entry) {
        this.entries.push(entry);
        if (this.parent)
            this.parent.addEntry(entry);
    };
    Log.prototype.randomString = function (stringLength) {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
        var randomstring = '';
        for (var i = 0; i < stringLength; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    };
    return Log;
}());
exports.Log = Log;
//# sourceMappingURL=log.js.map
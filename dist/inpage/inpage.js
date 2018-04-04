/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command-base.ts'\n    at Error (native)");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\polyfills\\Object.assign.ts'\n    at Error (native)");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// ReSharper restore InconsistentNaming
exports.windowInPage = window;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\quick-e.ts'\n    at Error (native)");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = __webpack_require__(2);
// ReSharper restore InconsistentNaming
exports.$2sxcInPage = window_in_page_1.windowInPage.$2sxc;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\manage\\api.ts'\n    at Error (native)");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\selectors-instance.ts'\n    at Error (native)");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = __webpack_require__(4);
function getSxcInstance(module) {
    var sxc = sxc_controller_in_page_1.$2sxcInPage(module);
    return sxc;
}
exports.getSxcInstance = getSxcInstance;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var entry_1 = __webpack_require__(67);
var maxScopeLen = 3;
var maxNameLen = 6;
var liveDump = false;
var Log = /** @class */ (function () {
    /**
     * Create a logger and optionally attach it to a parent logger
     * @param string name this logger should use
     * @param Log optional parrent logger to attach to
     * @param string optional initial message to log
     */
    function Log(name, parent, initialMessage) {
        var _this = this;
        /**
         * all log-entries on this logger
         */
        this.entries = new Array();
        /**
         * Full identifier of this log-object, with full hierarchy
         */
        this.fullIdentifier = function () {
            return "" + (_this.parent ? _this.parent.fullIdentifier() : '') + _this.identifier();
        };
        /**
         * link this log to a parent
         * usually happens in constructor, but in rare cases
         * this must be called manually
         */
        this.linkLog = function (parent) {
            _this.parent = parent || _this.parent; // if new parent isn't defined, don't replace
        };
        /**
         * scope of this logger - to easily see which ones
         * are about the same topic
         */
        this.scope = 'tdo';
        /**
         * name of this logger
         */
        this.name = 'unknwn';
        /**
         * Unique 2-character ID of this specific log object
         */
        this.id = function () { return _this.idCache || (_this.idCache = _this.randomString(2)); };
        /**
         * Unique identifier of this log object, with name and ID
         */
        this.identifier = function () { return "" + _this.scope + _this.name + "(" + _this.id() + ")"; };
        this.rename(name);
        this.linkLog(parent);
        if (initialMessage != null)
            this.add(initialMessage);
    }
    /**
     * give this logger a new name
     * usually happens in constructor, but in rare cases
     * it's called manually
     * @param name
     */
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
    /**
     * add a message to the log-list
     * @param message
     *
     * preferred usage is with string parameter:
     * log.add(`description ${ parameter }`);
     *
     * in case that we experience error with normal string parameter, we can use arrow function to enclose parameter like this () => parameter
     * but use it very rarely, because there is certainly a performance implication!
     * log.add(`description ${() => parameter}`);
     */
    Log.prototype.add = function (message) {
        var messageText;
        if (message instanceof Function) {
            try {
                messageText = (message()).toString();
                message = null; // maybe it is unnecessary, but added to be safe as possible that arrow function parameter will be garbage collected
            }
            catch (e) {
                messageText = 'undefined';
            }
        }
        else {
            messageText = message.toString();
        }
        var entry = new entry_1.Entry(this, messageText);
        this.addEntry(entry);
        if (liveDump)
            console.log(this.dump(undefined, undefined, undefined, entry));
        return messageText;
    };
    /**
     * helper to create a text-output of the log info
     * @param separator
     * @param start
     * @param end
     */
    Log.prototype.dump = function (separator, start, end, one) {
        if (separator === void 0) { separator = ' - '; }
        if (start === void 0) { start = ''; }
        if (end === void 0) { end = ''; }
        if (one === void 0) { one = null; }
        var lg = start;
        var dumpOne = function (e) { return lg += e.source() + separator + e.message + '\n'; };
        if (one)
            dumpOne(one);
        else
            this.entries.forEach(dumpOne);
        lg += end;
        return lg;
    };
    /**
     * add an entry-object to this logger
     * this is often called by sub-loggers to add to parent
     * @param entry
     */
    Log.prototype.addEntry = function (entry) {
        this.entries.push(entry);
        if (this.parent)
            this.parent.addEntry(entry);
    };
    /**
     * helper to generate a random 2-char ID
     * @param stringLength
     */
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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context.ts'\n    at Error (native)");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\translate\\2sxc.translate.ts'\n    at Error (native)");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\commands.ts'\n    at Error (native)");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __webpack_require__(14);
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * internal helper, to do something and reload the content block
 * @param {ContextOfButton} context
 * @param {string} url
 * @param {ActionParams} params
 * @returns {any}
 */
function getAndReload(context, url, params) {
    return context.sxc.webApi.get({
        url: url,
        params: params,
    }).then(function () { render_1.reloadAndReInitialize(context); });
}
/**
 * remove an item from a list, then reload
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
function removeFromList(context, sortOrder) {
    return getAndReload(context, 'view/module/removefromlist', { sortOrder: sortOrder });
}
exports.removeFromList = removeFromList;
/**
 * change the order of an item in a list, then reload
 * @param {ContextOfButton} context
 * @param {number} initOrder
 * @param {number} newOrder
 * @returns {any}
 */
function changeOrder(context, initOrder, newOrder) {
    return getAndReload(context, 'view/module/changeorder', { sortOrder: initOrder, destinationSortOrder: newOrder });
}
exports.changeOrder = changeOrder;
/**
 * add an item to the list at this position
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
function addItem(context, sortOrder) {
    return getAndReload(context, 'view/module/additem', { sortOrder: sortOrder });
}
exports.addItem = addItem;
/**
 * set a content-item in this block to published, then reload
 * @param {ContextOfButton} context
 * @param {string} part
 * @param {number} sortOrder
 * @returns {any}
 */
function publish(context, part, sortOrder) {
    return getAndReload(context, 'view/module/publish', { part: part, sortOrder: sortOrder });
}
exports.publish = publish;
/**
 * publish an item using it's ID
 * @param {ContextOfButton} context
 * @param {number} entityId
 * @returns {any}
 */
function publishId(context, entityId) {
    return getAndReload(context, 'view/module/publish', { id: entityId });
}
exports.publishId = publishId;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// polyfills
__webpack_require__(1); // fix for IE11 Object.assign
var main_content_block_1 = __webpack_require__(26);
var render_1 = __webpack_require__(14);
var templates_1 = __webpack_require__(18);
var context_1 = __webpack_require__(9);
var api_1 = __webpack_require__(5);
var quick_dialog_config_1 = __webpack_require__(74);
var ng_dialog_params_1 = __webpack_require__(37);
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
var resizeInterval = 200;
var scrollTopOffset = 80;
var resizeWatcher = null;
var diagShowClass = 'dia-select';
var isFullscreen = false;
/**
 * dialog manager - the currently active dialog object
 */
// let diagManager = twoSxc._quickDialog = {}
exports.current = null;
/**
 * toggle visibility
 * @param {boolean} [show] true/false optional
 */
function toggle(show) {
    var cont = $(getContainer());
    if (show === undefined)
        show = !cont.hasClass(diagShowClass);
    // show/hide visually
    cont.toggleClass(diagShowClass, show);
    exports.current = show ? getIFrame() : null;
}
exports.toggle = toggle;
function hide() {
    if (exports.current)
        toggle(false);
}
exports.hide = hide;
/**
 * cancel the current dialog
 */
function cancel() {
    if (exports.current)
        exports.current.cancel(); // cancel & hide
}
exports.cancel = cancel;
/**
 * Remember dialog state across page-reload
 * @param {Object<any>} context - the sxc which is persisted for
 */
function persistDialog(context) {
    sessionStorage.setItem('dia-cbid', context.contentBlock.id.toString());
}
exports.persistDialog = persistDialog;
/**
 * get the current container
 * @returns {element} html element of the div
 */
function getContainer() {
    var container = $('.inpage-frame-wrapper');
    return container.length > 0 ? container : buildContainerAndIFrame();
}
exports.getContainer = getContainer;
/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
function getIFrame(container) {
    if (!container)
        container = getContainer();
    return container.find('iframe')[0];
}
exports.getIFrame = getIFrame;
/**
 * check if the dialog is showing for the current sxc-instance
 * @param {ContextOfButton} context object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
function isShowing(context, dialogName) {
    return exports.current // there is a current dialog
        &&
            exports.current.sxcCacheKey === context.sxc.cacheKey // the iframe is showing for the current sxc
        &&
            exports.current.dialogName === dialogName; // the view is the same as previously
}
exports.isShowing = isShowing;
/**
 * show / reset the current iframe to use new url and callback
 * @param {ContextOfButton} context object
 * @param {string} url - url to show
 * @param {function()} closeCallback - callback event
 * @param {boolean} fullScreen - if it should open full screen
 * @param {string} [dialogName] - optional name of dialog, to check if it's already open
 * @returns {any} jquery object of the iframe
 */
function showOrToggle(context, url, closeCallback, fullScreen, dialogName) {
    setSize(fullScreen);
    var iFrame = getIFrame();
    // in case it's a toggle
    if (dialogName && isShowing(context, dialogName)) {
        return hide();
    }
    iFrame.rewire(context.sxc, closeCallback, dialogName);
    iFrame.setAttribute('src', rewriteUrl(url));
    // if the window had already been loaded, re-init
    if (iFrame.contentWindow && iFrame.contentWindow.reboot)
        iFrame.contentWindow.reboot();
    // make sure it's visible'
    iFrame.toggle(true);
    return iFrame;
}
exports.showOrToggle = showOrToggle;
/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame() {
    var container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>');
    var newIFrame = document.createElement('iframe');
    newIFrame = extendIFrameWithSxcState(newIFrame);
    container.find('.inpage-frame').html(newIFrame);
    $('body').append(container);
    watchForResize();
    return container;
}
/**
 * set container css for size
 * @param {boolean} fullScreen
 */
function setSize(fullScreen) {
    var container = getContainer();
    // set container height
    container.css('min-height', fullScreen ? '100%' : '225px');
    isFullscreen = fullScreen;
}
/**
 * extend IFrame with Sxc state
 * @param iFrame
 */
function extendIFrameWithSxcState(iFrame) {
    var hiddenSxc = null;
    // ReSharper disable once UnusedLocals
    var cbApi = main_content_block_1._contentBlock;
    var tagModule = null;
    /**
     * get the sxc-object of this iframe
     * @returns {Object<any>} refreshed sxc-object
     */
    function reSxc() {
        if (!hiddenSxc)
            throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return hiddenSxc.recreate();
    }
    function getContext() {
        return context_1.context(api_1.getTag(reSxc()));
    }
    var newFrm = Object.assign(iFrame, {
        closeCallback: null,
        rewire: function (sxc, callback, dialogName) {
            hiddenSxc = sxc;
            tagModule = $($(api_1.getTag(sxc)).parent().eq(0));
            newFrm.sxcCacheKey = sxc.cacheKey;
            newFrm.closeCallback = callback;
            if (dialogName)
                newFrm.dialogName = dialogName;
        },
        getManageInfo: function () { return ng_dialog_params_1.NgDialogParams.fromContext(reSxc().manage.context); },
        getAdditionalDashboardConfig: function () { return quick_dialog_config_1.QuickDialogConfig.fromContext(reSxc().manage.context); },
        persistDia: function () { return persistDialog(getContext()); },
        scrollToTarget: function () {
            $('body').animate({
                scrollTop: tagModule.offset().top - scrollTopOffset,
            });
        },
        toggle: function (show) { return toggle(show); },
        cancel: function () {
            newFrm.toggle(false);
            // todo: only re-init if something was changed?
            // return cbApi.reloadAndReInitialize(reSxc());
            // cancel the dialog
            localStorage.setItem('cancelled-dialog', 'true');
            return newFrm.closeCallback();
        },
        run: function (verb) { return reSxc().manage.run(verb); },
        showMessage: function (message) { return render_1.showMessage(getContext(), "<p class=\"no-live-preview-available\">" + message + "</p>"); },
        reloadAndReInit: function () { return render_1.reloadAndReInitialize(getContext(), true, true); },
        saveTemplate: function (templateId) { return templates_1.updateTemplateFromDia(getContext(), templateId, false); },
        previewTemplate: function (templateId) { return render_1.ajaxLoad(getContext(), templateId, true); },
    });
    return newFrm;
}
/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the "wrong" dialog
 * @returns {string} new url
 */
function rewriteUrl(url) {
    // change default url-schema from the primary angular-app to the quick-dialog
    url = url.replace('dist/dnn/ui.html?', 'dist/ng/ui.html?');
    // special debug-code when running on local ng-serve
    // this is only activated if the developer manually sets a value in the localStorage
    try {
        var devMode = localStorage.getItem('devMode');
        if (devMode && ~~devMode)
            url = url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
    }
    catch (e) {
        // ignore
    }
    return url;
}
/**
 * create watcher which monitors the iframe size and adjusts the container as needed
 * @param {boolean} [keepWatching] optional true/false to start/stop the watcher
 * @returns {null} nothing
 */
function watchForResize(keepWatching) {
    if ((keepWatching === null || keepWatching === false) && resizeWatcher) {
        clearInterval(resizeWatcher);
        resizeWatcher = null;
        return null;
    }
    var cont = getContainer();
    if (!resizeWatcher)
        resizeWatcher = setInterval(function () {
            try {
                var frm = getIFrame(cont);
                if (!frm)
                    return;
                var height = frm.contentDocument.body.offsetHeight;
                if (frm.previousHeight === height)
                    return;
                frm.style.minHeight = cont.css('min-height');
                frm.style.height = height + 'px';
                frm.previousHeight = height;
                if (isFullscreen) {
                    frm.style.height = '100%';
                    frm.style.position = 'absolute';
                }
            }
            catch (e) {
                // ignore
            }
        }, resizeInterval);
    return resizeWatcher;
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = __webpack_require__(2);
var api_1 = __webpack_require__(5);
var quick_dialog_1 = __webpack_require__(13);
var start_1 = __webpack_require__(27);
var build_toolbars_1 = __webpack_require__(15);
var main_content_block_1 = __webpack_require__(26);
var web_api_promises_1 = __webpack_require__(36);
/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * ajax update/replace the content of the content-block
 * optionally also initialize the toolbar (if not just preview)
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @param {boolean} justPreview
 * @returns {}
 */
function replaceCb(context, newContent, justPreview) {
    try {
        var newStuff = $(newContent);
        // Must disable toolbar before we attach to DOM
        if (justPreview)
            build_toolbars_1.disable(newStuff);
        $(api_1.getTag(context.sxc)).replaceWith(newStuff);
        // reset the cache, so the sxc-object is refreshed
        context.sxc.recreate(true);
    }
    catch (e) {
        console.log('Error while rendering template:', e);
    }
}
/**
 * Show a message where the content of a module should be - usually as placeholder till something else happens
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @returns {} nothing
 */
function showMessage(context, newContent) {
    $(api_1.getTag(context.sxc)).html(newContent);
}
exports.showMessage = showMessage;
/**
 * ajax-call, then replace
 * @param {ContextOfButton} context
 * @param {number} alternateTemplateId
 * @param {boolean} justPreview
 */
function ajaxLoad(context, alternateTemplateId, justPreview) {
    return web_api_promises_1.getPreviewWithTemplate(context, alternateTemplateId)
        .then(function (result) { return replaceCb(context, result, justPreview); })
        .then(start_1.reset); // reset quick-edit, because the config could have changed
}
exports.ajaxLoad = ajaxLoad;
/**
 * this one assumes a replace / change has already happened, but now must be finalized...
 * @param {ContextOfButton} context
 * @param {boolean} forceAjax
 * @param {boolean} preview
 */
function reloadAndReInitialize(context, forceAjax, preview) {
    // if ajax is not supported, we must reload the whole page
    if (!forceAjax && !context.app.supportsAjax) {
        return window_in_page_1.windowInPage.location.reload();
    }
    // ReSharper disable once DoubleNegationOfBoolean
    return ajaxLoad(context, main_content_block_1.MainContentBlock.cUseExistingTemplate, !!preview)
        .then(function () {
        // tell Evoq that page has changed if it has changed (Ajax call)
        if (window_in_page_1.windowInPage.dnn_tabVersioningEnabled)
            try {
                window_in_page_1.windowInPage.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
            }
            catch (e) {
                // sink
            }
        // maybe check if already publish
        // compare to HTML module
        // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button
        // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
        // must check for side-effects, which would need the manager to re-build the configuration
        quick_dialog_1.hide();
    });
}
exports.reloadAndReInitialize = reloadAndReInitialize;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\build-toolbars.ts'\n    at Error (native)");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = __webpack_require__(8);
var HasLog = /** @class */ (function () {
    /**
     * initialize the logger
     * ideally it has a parent-logger to attach to
     * @param logName name to show in the logger
     * @param parentLog parent-logger to attach to
     * @param initialMessage optional start-message to log
     */
    function HasLog(logName, parentLog, initialMessage) {
        var _this = this;
        this.parentLog = parentLog;
        this.initLog = function (name, parentLog, initialMessage) { return _this.initLogInternal(name, parentLog, initialMessage); };
        this.logId = 'unknwn';
        this.linkLog = function (parentLog) { return _this.log.linkLog(parentLog); };
        this.initLogInternal(logName, parentLog, initialMessage);
    }
    HasLog.prototype.initLogInternal = function (name, parentLog, initialMessage) {
        if (this.log == null)
            // standard & most common case: just create log
            this.log = new log_1.Log(name, parentLog, initialMessage);
        else {
            // late-init case, where the log was already created - just reconfig keeping what was in it
            this.log.rename(name);
            this.linkLog(parentLog);
            if (initialMessage != null)
                this.log.add(initialMessage);
        }
    };
    return HasLog;
}());
exports.HasLog = HasLog;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\button\\expand-button-config.ts'\n    at Error (native)");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var quick_dialog_1 = __webpack_require__(13);
var build_toolbars_1 = __webpack_require__(15);
var render_1 = __webpack_require__(14);
var web_api_promises_1 = __webpack_require__(36);
/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {ContextOfButton} context
 * @returns {any}
 */
function prepareToAddContent(context, useModuleList) {
    var isCreated = context.contentBlock.isCreated;
    if (isCreated || !useModuleList)
        return $.when(null);
    // return persistTemplate(sxc, null);
    // let manage = sxc.manage;
    // let contentGroup = manage._editContext.ContentGroup;
    // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
    // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;
    var templateId = context.contentBlock.templateId;
    // template has not changed
    // if (groupExistsAndTemplateUnchanged) return $.when(null);
    // persist the template
    return updateTemplate(context, templateId, true);
}
exports.prepareToAddContent = prepareToAddContent;
/**
 * Update the template and adjust UI accordingly.
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @param {boolean} forceCreate
 */
function updateTemplateFromDia(context, templateId, forceCreate) {
    var showingAjaxPreview = build_toolbars_1.isDisabled(context.sxc);
    // todo: should move things like remembering undo etc. back into the contentBlock state manager
    // or just reset it, so it picks up the right values again ?
    return updateTemplate(context, templateId, forceCreate)
        .then(function () {
        quick_dialog_1.hide();
        // if it didn't have content, then it only has now...
        if (!context.app.hasContent) {
            context.app.hasContent = forceCreate;
        }
        // only reload on ajax, not on app as that was already re-loaded on the preview
        // necessary to show the original template again
        if (showingAjaxPreview) {
            render_1.reloadAndReInitialize(context);
        }
    });
}
exports.updateTemplateFromDia = updateTemplateFromDia;
/**
 * Update the template.
 */
function updateTemplate(context, templateId, forceCreate) {
    return web_api_promises_1.saveTemplate(context, templateId, forceCreate)
        .then(function (data, textStatus, xhr) {
        // error handling
        if (xhr.status !== 200) {
            return alert('error - result not ok, was not able to create ContentGroup');
        }
        if (!data) {
            return;
        }
        // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
        var newGuid = data.replace(/[\",\']/g, '');
        if (console) {
            console.log("created content group {" + newGuid + "}");
        }
        context.contentBlock.contentGroupId = newGuid;
        // $2sxc._manage._updateContentGroupGuid(context, newGuid);
    });
}
exports.updateTemplate = updateTemplate;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\item\\render-toolbar.ts'\n    at Error (native)");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\item\\render-button.ts'\n    at Error (native)");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\button\\button-action.ts'\n    at Error (native)");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\button\\button-config.ts'\n    at Error (native)");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 24 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\clipboard.ts'\n    at Error (native)");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\cms\\Cms.ts'\n    at Error (native)");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = __webpack_require__(18);
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 *
 * Maybe ToDo 2cb:
 * 2sxc should have one entry point (interface to browser context) only.
 * Otherwise, we cannot know, when which part will be executed and debugging becomes very difficult.
 *
 */
var MainContentBlock = /** @class */ (function () {
    function MainContentBlock() {
        this.prepareToAddContent = templates_1.prepareToAddContent;
        this.updateTemplateFromDia = templates_1.updateTemplateFromDia;
    }
    // constants
    MainContentBlock.cViewWithoutContent = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
    MainContentBlock.cUseExistingTemplate = -1;
    return MainContentBlock;
}());
exports.MainContentBlock = MainContentBlock;
/**
 * The main content-block manager
 */
// ReSharper disable once InconsistentNaming
exports._contentBlock = new MainContentBlock();


/***/ }),
/* 27 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\start.ts'\n    at Error (native)");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\positioning.ts'\n    at Error (native)");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\item\\render-helpers.ts'\n    at Error (native)");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar-manager.ts'\n    at Error (native)");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\toolbar-config-templates.ts'\n    at Error (native)");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\toolbar-expand-config.ts'\n    at Error (native)");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\adapters\\parameters-adapter.ts'\n    at Error (native)");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\adapters\\settings-adapter.ts'\n    at Error (native)");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\toolbar-settings.ts'\n    at Error (native)");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
//#region functions working only with what they are given
// 2017-08-27 2dm: I'm working on cleaning up this code, and an important part
// is to have code which doesn't use old state (like object-properties initialized earlier)
// extracting these methods is part of the work
/**
 * TODO - unclear if still in use
 * @param {object} sxc
 * @param {boolean} state
 * @returns {promise}
 */
// 2017-09-02 2dm removed, deprecated, it's not stored on the server any more
// cbm.setTemplateChooserState = function(sxc, state) {
//    return sxc.webApi.get({
//        url: "view/module/SetTemplateChooserState",
//        params: { state: state }
//    });
// };
/**
 * Save the template configuration for this instance
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @param {boolean} [forceCreateContentGroup]
 * @returns {promise}
 */
function saveTemplate(context, templateId, forceCreateContentGroup) {
    var params = {
        templateId: templateId,
        forceCreateContentGroup: forceCreateContentGroup,
        newTemplateChooserState: false,
    };
    return context.sxc.webApi.get({
        url: 'view/module/savetemplateid',
        params: params,
    });
}
exports.saveTemplate = saveTemplate;
/**
 * Retrieve the preview from the web-api
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @returns {promise} promise with the html in the result
 */
function getPreviewWithTemplate(context, templateId) {
    templateId = templateId || -1; // fallback, meaning use saved ID
    var params = {
        templateId: templateId,
        lang: context.app.currentLanguage,
        cbisentity: context.contentBlock.isEntity,
        cbid: context.contentBlock.id,
        originalparameters: JSON.stringify(context.instance.parameters),
    };
    return context.sxc.webApi.get({
        url: 'view/module/rendertemplate',
        params: params,
        dataType: 'html',
    });
}
exports.getPreviewWithTemplate = getPreviewWithTemplate;
//#endregion


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_of_edit_context_1 = __webpack_require__(23);
var NgDialogParams = /** @class */ (function () {
    function NgDialogParams() {
    }
    //constructor(sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
    //  this.zoneId = editContext.ContentGroup.ZoneId;
    //  this.appId = editContext.ContentGroup.AppId;
    //  this.tid = editContext.Environment.PageId;
    //  this.mid = editContext.Environment.InstanceId;
    //  this.cbid = sxc.cbid;
    //  this.lang = editContext.Language.Current;
    //  this.langpri = editContext.Language.Primary;
    //  this.langs = JSON.stringify(editContext.Language.All);
    //  this.portalroot = editContext.Environment.WebsiteUrl;
    //  this.websiteroot = editContext.Environment.SxcRootUrl;
    //  this.partOfPage = editContext.ContentBlock.PartOfPage;
    //  // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
    //  this.publishing = editContext.ContentBlock.VersioningRequirements;
    //  // todo= probably move the user into the dashboard info
    //  this.user = getUserOfEditContext(editContext);
    //  this.approot = editContext.ContentGroup.AppUrl || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    //}
    NgDialogParams.fromContext = function (context) {
        var params = new NgDialogParams();
        params.zoneId = context.app.zoneId;
        params.appId = context.app.id;
        params.tid = context.page.id;
        params.mid = context.instance.id;
        params.cbid = context.contentBlock.id;
        params.lang = context.app.currentLanguage;
        params.langpri = context.app.primaryLanguage;
        params.langs = JSON.stringify(context.app.allLanguages);
        params.portalroot = context.tenant.url;
        params.websiteroot = context.instance.sxcRootUrl;
        params.partOfPage = context.contentBlock.partOfPage;
        // versioningRequirements= editContext.ContentBlock.VersioningRequirements;
        params.publishing = context.contentBlock.versioningRequirements;
        // todo= probably move the user into the dashboard info
        params.user = user_of_edit_context_1.UserOfEditContext.fromContext(context);
        params.approot = context.app.appPath || null; // this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
        return params;
    };
    return NgDialogParams;
}());
exports.NgDialogParams = NgDialogParams;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command-open-ng-dialog.ts'\n    at Error (native)");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\cb.ts'\n    at Error (native)");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\mod.ts'\n    at Error (native)");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\mod-manage.ts'\n    at Error (native)");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\translate\\libs\\i18next.min.js'\n    at Error (native)");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18nextXHRBackend",t):e.i18nextXHRBackend=t()}(this,function(){"use strict";function e(e){return a.call(r.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e}function t(e,t,n,i,a){if(i&&"object"===("undefined"==typeof i?"undefined":o["typeof"](i))){var r="",s=encodeURIComponent;for(var l in i)r+="&"+s(l)+"="+s(i[l]);i=r.slice(1)+(a?"":"&_t="+new Date)}try{var c=new(XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0");c.open(i?"POST":"GET",e,1),t.crossDomain||c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-type","application/x-www-form-urlencoded"),c.onreadystatechange=function(){c.readyState>3&&n&&n(c.responseText,c)},c.send(i)}catch(s){window.console&&console.log(s)}}function n(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"locales/add/{{lng}}/{{ns}}",allowMultiLoading:!1,parse:JSON.parse,crossDomain:!1,ajax:t}}var o={};o["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o.createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=[],a=i.forEach,r=i.slice,s=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o.classCallCheck(this,t),this.init(e,n),this.type="backend"}return o.createClass(t,[{key:"init",value:function(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.services=t,this.options=e(o,this.options||{},n())}},{key:"readMulti",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e.join("+"),ns:t.join("+")});this.loadUrl(o,n)}},{key:"read",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e,ns:t});this.loadUrl(o,n)}},{key:"loadUrl",value:function(e,t){var n=this;this.options.ajax(e,this.options,function(o,i){var a=i.status.toString();if(0===a.indexOf("5"))return t("failed loading "+e,!0);if(0===a.indexOf("4"))return t("failed loading "+e,!1);var r=void 0,s=void 0;try{r=n.options.parse(o)}catch(l){s="failed parsing "+e+" to json"}return s?t(s,!1):void t(null,r)})}},{key:"create",value:function(e,t,n,o){var i=this;"string"==typeof e&&(e=[e]);var a={};a[n]=o||"",e.forEach(function(e){var n=i.services.interpolator.interpolate(i.options.addPath,{lng:e,ns:t});i.options.ajax(n,i.options,function(e,t){},a)})}}]),t}();return s.type="backend",s});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("jqueryI18next",e):t.jqueryI18next=e()}(this,function(){"use strict";function t(t,a){function r(n,a,r){function i(t,n){return s.parseDefaultValueFromContent?e["extends"]({},t,{defaultValue:n}):t}if(0!==a.length){var o="text";if(0===a.indexOf("[")){var f=a.split("]");a=f[1],o=f[0].substr(1,f[0].length-1)}if(a.indexOf(";")===a.length-1&&(a=a.substr(0,a.length-2)),"html"===o)n.html(t.t(a,i(r,n.html())));else if("text"===o)n.text(t.t(a,i(r,n.text())));else if("prepend"===o)n.prepend(t.t(a,i(r,n.html())));else if("append"===o)n.append(t.t(a,i(r,n.html())));else if(0===o.indexOf("data-")){var l=o.substr("data-".length),d=t.t(a,i(r,n.data(l)));n.data(l,d),n.attr(o,d)}else n.attr(o,t.t(a,i(r,n.attr(o))))}}function i(t,n){var i=t.attr(s.selectorAttr);if(i||"undefined"==typeof i||i===!1||(i=t.text()||t.val()),i){var o=t,f=t.data(s.targetAttr);if(f&&(o=t.find(f)||t),n||s.useOptionsAttr!==!0||(n=t.data(s.optionsAttr)),n=n||{},i.indexOf(";")>=0){var l=i.split(";");a.each(l,function(t,e){""!==e&&r(o,e,n)})}else r(o,i,n);if(s.useOptionsAttr===!0){var d={};d=e["extends"]({clone:d},n),delete d.lng,t.data(s.optionsAttr,d)}}}function o(t){return this.each(function(){i(a(this),t);var e=a(this).find("["+s.selectorAttr+"]");e.each(function(){i(a(this),t)})})}var s=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];s=e["extends"]({},n,s),a[s.tName]=t.t.bind(t),a[s.i18nName]=t,a.fn[s.handleName]=o}var e={};e["extends"]=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};var n={tName:"t",i18nName:"i18n",handleName:"localize",selectorAttr:"data-i18n",targetAttr:"i18n-target",optionsAttr:"i18n-options",useOptionsAttr:!1,parseDefaultValueFromContent:!0},a={init:t};return a});

/***/ }),
/* 45 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\engine.ts'\n    at Error (native)");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\config.ts'\n    at Error (native)");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\coords.ts'\n    at Error (native)");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this will be everything about the current system, like system / api -paths etc.
 */
var SystemContext = /** @class */ (function () {
    function SystemContext() {
    }
    return SystemContext;
}());
exports.SystemContext = SystemContext;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this will be something about the current tenant(the dnn portal)
 */
var TenantContext = /** @class */ (function () {
    function TenantContext() {
    }
    return TenantContext;
}());
exports.TenantContext = TenantContext;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * things about the user
 */
var UserContext = /** @class */ (function () {
    function UserContext() {
    }
    return UserContext;
}());
exports.UserContext = UserContext;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\content-block-context\\content-block-context.ts'\n    at Error (native)");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-button.ts'\n    at Error (native)");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-toolbar.ts'\n    at Error (native)");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-item.ts'\n    at Error (native)");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-content-block.ts'\n    at Error (native)");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-instance.ts'\n    at Error (native)");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of-page.ts'\n    at Error (native)");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\context-of.ts'\n    at Error (native)");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\context\\base-context\\base-context.ts'\n    at Error (native)");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\instance-context\\app-context.ts'\n    at Error (native)");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * information related to the current DNN module, incl.instanceId,
 */
var InstanceContext = /** @class */ (function () {
    function InstanceContext() {
    }
    return InstanceContext;
}());
exports.InstanceContext = InstanceContext;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\item-context\\item-context.ts'\n    at Error (native)");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\context\\page-context\\page-context.ts'\n    at Error (native)");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\plumbing\\is.ts'\n    at Error (native)");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\item\\render-groups.ts'\n    at Error (native)");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\adapters\\old-parameters-adapter.ts'\n    at Error (native)");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\logging\\entry.ts'\n    at Error (native)");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\templates\\default-toolbar-template.ts'\n    at Error (native)");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\templates\\left-toolbar-template.ts'\n    at Error (native)");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used to build instance config
 */
var InstanceConfig = /** @class */ (function () {
    function InstanceConfig() {
    }
    //constructor(editContext: DataEditContext) {
    //  const ce = editContext.Environment;
    //  const cg = editContext.ContentGroup;
    //  const cb = editContext.ContentBlock;
    //  this.portalId = ce.WebsiteId;
    //  this.tabId = ce.PageId;
    //  this.moduleId = ce.InstanceId;
    //  this.version = ce.SxcVersion;
    //  this.contentGroupId = cg.Guid;
    //  this.cbIsEntity = cb.IsEntity;
    //  this.cbId = cb.Id;
    //  this.appPath = cg.AppUrl;
    //  this.isList = cg.IsList;
    //}
    InstanceConfig.fromContext = function (contextOfButton) {
        var config = new InstanceConfig();
        config.portalId = contextOfButton.tenant.id;
        config.tabId = contextOfButton.page.id;
        config.moduleId = contextOfButton.instance.id;
        config.version = contextOfButton.instance.sxcVersion;
        config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
        config.cbIsEntity = contextOfButton.contentBlock.isEntity;
        config.cbId = contextOfButton.contentBlock.id;
        config.appPath = contextOfButton.app.appPath;
        config.isList = contextOfButton.contentBlock.isList;
        return config;
    };
    return InstanceConfig;
}());
exports.InstanceConfig = InstanceConfig;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\adapters\\old-toolbar-settings-adapter.ts'\n    at Error (native)");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\button\\expand-group-config.ts'\n    at Error (native)");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\toolbar-config.ts'\n    at Error (native)");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var user_of_edit_context_1 = __webpack_require__(23);
var QuickDialogConfig = /** @class */ (function () {
    function QuickDialogConfig() {
    }
    //constructor(editContext: DataEditContext) {
    //  this.appId = editContext.ContentGroup.AppId;
    //  this.isContent = editContext.ContentGroup.IsContent;
    //  this.hasContent = editContext.ContentGroup.HasContent;
    //  this.isList = editContext.ContentGroup.IsList;
    //  this.templateId = editContext.ContentGroup.TemplateId;
    //  this.contentTypeId = editContext.ContentGroup.ContentTypeName;
    //  this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
    //  this.user = getUserOfEditContext(editContext);
    //  this.supportsAjax = editContext.ContentGroup.SupportsAjax;
    //}
    QuickDialogConfig.fromContext = function (context) {
        var config = new QuickDialogConfig();
        config.appId = context.app.id;
        config.isContent = context.app.isContent;
        config.hasContent = context.app.hasContent;
        config.isList = context.contentBlock.isList;
        config.templateId = context.contentBlock.templateId;
        config.contentTypeId = context.contentBlock.contentTypeId;
        config.templateChooserVisible = context.contentBlock.showTemplatePicker; // todo = maybe move to content-group
        config.user = user_of_edit_context_1.UserOfEditContext.fromContext(context);
        config.supportsAjax = context.app.supportsAjax;
        return config;
    };
    return QuickDialogConfig;
}());
exports.QuickDialogConfig = QuickDialogConfig;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command-link-to-ng-dialog.ts'\n    at Error (native)");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command-create.ts'\n    at Error (native)");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command.ts'\n    at Error (native)");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command-definition.ts'\n    at Error (native)");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\entity-manipulation\\item-commands.ts'\n    at Error (native)");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\instance-engine.ts'\n    at Error (native)");

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var toolbar_manager_1 = __webpack_require__(30);
var _2sxc_translate_1 = __webpack_require__(10);
var sxc_1 = __webpack_require__(7);
/** contains commands to create/move/delete a contentBlock in a page */
var sxcInstance;
/**
 * create content block
 * @param parentId
 * @param fieldName
 * @param index
 * @param appName
 * @param container
 * @param newGuid
 */
function create(parentId, fieldName, index, appName, container, newGuid) {
    // the wrapper, into which this will be placed and the list of pre-existing blocks
    var listTag = container;
    if (listTag.length === 0)
        return alert('can\'t add content-block as we couldn\'t find the list');
    var cblockList = listTag.find('div.sc-content-block');
    if (index > cblockList.length)
        index = cblockList.length; // make sure index is never greater than the amount of items
    var params = {
        parentId: parentId,
        field: fieldName,
        sortOrder: index,
        app: appName,
        guid: newGuid,
    };
    return sxcInstance.webApi.get({ url: 'view/module/generatecontentblock', params: params })
        .then(function (result) {
        var newTag = $(result); // prepare tag for inserting
        // should I add it to a specific position...
        if (cblockList.length > 0 && index > 0)
            $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                .after(newTag);
        else
            listTag.prepend(newTag);
        // ReSharper disable once UnusedLocals
        var sxcNew = sxc_1.getSxcInstance(newTag);
        toolbar_manager_1._toolbarManager.buildToolbars(newTag);
    });
}
/**
 * move content block
 * @param parentId
 * @param field
 * @param indexFrom
 * @param indexTo
 */
function move(parentId, field, indexFrom, indexTo) {
    var params = {
        parentId: parentId,
        field: field,
        indexFrom: indexFrom,
        indexTo: indexTo,
    };
    return sxcInstance.webApi.get({ url: 'view/module/moveiteminlist', params: params })
        .then(function () {
        console.log('done moving!');
        window.location.reload();
    });
}
/**
 * delete a content-block inside a list of content-blocks
 * @param parentId
 * @param field
 * @param index
 */
function remove(parentId, field, index) {
    if (!confirm(_2sxc_translate_1.translate('QuickInsertMenu.ConfirmDelete')))
        return null;
    var params = {
        parentId: parentId,
        field: field,
        index: index,
    };
    return sxcInstance.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
        .then(function () {
        console.log('done deleting!');
        window.location.reload();
    });
}
var Manipulator = /** @class */ (function () {
    function Manipulator() {
        this.create = create;
        this.move = move;
        this.delete = remove;
    }
    return Manipulator;
}());
exports.Manipulator = Manipulator;
function manipulator(sxc) {
    sxcInstance = sxc;
    return new Manipulator();
}
exports.manipulator = manipulator;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var create_1 = __webpack_require__(83);
/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 */
var Manage = /** @class */ (function () {
    function Manage() {
        this.initInstance = create_1.initInstance;
    }
    return Manage;
}());
exports._manage = new Manage(); // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var instance_engine_1 = __webpack_require__(80);
var manipulate_1 = __webpack_require__(81);
var context_1 = __webpack_require__(9);
var render_button_1 = __webpack_require__(20);
var render_toolbar_1 = __webpack_require__(19);
var toolbar_expand_config_1 = __webpack_require__(32);
var api_1 = __webpack_require__(5);
var local_storage_helper_1 = __webpack_require__(84);
var user_of_edit_context_1 = __webpack_require__(23);
var button_config_adapter_1 = __webpack_require__(85);
/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @param sxc
 *
 * we must keep signature of initInstance for compatibility because it is used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
 */
function initInstance(sxc) {
    try {
        _initInstance(sxc);
    }
    catch (e) {
        console.error('error in 2sxc - will log but not throw', e);
    }
}
exports.initInstance = initInstance;
// ReSharper disable once InconsistentNaming
function _initInstance(sxc) {
    var editContext = api_1.getEditContext(sxc);
    var context = context_1.getContextInstance(sxc);
    // context.sxc.sxc = sxc; // stv: this is temp
    // context.element = getTag(sxc); // HTMLElement
    var userInfo = user_of_edit_context_1.UserOfEditContext.fromContext(context); // 2dm simplified getUserOfEditContext(context);
    var cmdEngine = new instance_engine_1.InstanceEngine(sxc);
    var editManager = new EditManager(sxc, editContext, userInfo, cmdEngine, context);
    editManager.init();
    sxc.manage = editManager;
    return editManager;
}
var EditManager = /** @class */ (function () {
    function EditManager(sxc, editContext, userInfo, cmdEngine, context) {
        var _this = this;
        this.sxc = sxc;
        this.editContext = editContext;
        this.userInfo = userInfo;
        this.cmdEngine = cmdEngine;
        this.context = context;
        //#region Official, public properties and commands, which are stable for use from the outside
        /**
         * run a command - command used in toolbars and custom buttons
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.run = this.cmdEngine.run;
        /**
         * run2 a command - new command used in toolbars and custom buttons
         */
        //run2 = this.cmdEngine.run2;
        /**
         * Generate a button (an <a>-tag) for one specific toolbar-action.
         * @param {Object<any>} actDef - settings, an object containing the spec for the expected button
         * @param {int} groupIndex - number what button-group it's in'
         * @returns {string} html of a button
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.getButton = function (actDef, groupIndex) {
            //const tag: any = getTag(this.sxc);
            //const myContext = context(tag);
            var newButtonConfig = button_config_adapter_1.buttonConfigAdapter(_this.context, actDef, groupIndex);
            _this.context.button = newButtonConfig;
            var button = render_button_1.renderButton(_this.context, groupIndex);
            return button.outerHTML;
        };
        /**
         * Builds the toolbar and returns it as HTML
         * @param {Object<any>} tbConfig - general toolbar config
         * @param {Object<any>} moreSettings - additional / override settings
         * @returns {string} html of the current toolbar
         *
         * it is publicly used out of inpage, so take a care to preserve function signature
         */
        this.getToolbar = function (tbConfig, moreSettings) {
            //const tag: any = getTag(this.sxc);
            //const myContext = context(tag);
            var toolbarConfig = toolbar_expand_config_1.expandToolbarConfig(_this.context, tbConfig, moreSettings);
            _this.context.toolbar = toolbarConfig;
            return render_toolbar_1.renderToolbar(_this.context);
        };
        //#endregion official, public properties - everything below this can change at any time
        this._context = this.context;
        // ReSharper disable InconsistentNaming
        /**
         * internal method to find out if it's in edit-mode
         */
        // _isEditMode = () => this.editContext.Environment.IsEditable;
        this._isEditMode = function () { return _this.editContext.Environment.IsEditable; };
        /**
         * used for various dialogues
         */
        // _reloadWithAjax = this.editContext.ContentGroup.SupportsAjax;
        this._reloadWithAjax = this.context.app.supportsAjax;
        // 2dm disabled
        // todo q2stv - I think we don't need this any more
        // 
        //_dialogParameters = buildNgDialogParams(this.context);
        // 2dm disabled
        // todo q2stv - I think we don't need this any more
        /**
          * used to configure buttons / toolbars
          */
        //_instanceConfig = buildInstanceConfig(this.context);
        /**
         * metadata necessary to know what/how to edit
         */
        this._editContext = this.editContext;
        // 2dm disabled
        // todo q2stv - I think we don't need this any more
        /**
         * used for in-page dialogues
         */
        //_quickDialogConfig = buildQuickDialogConfig(this.context);
        /**
         * used to handle the commands for this content-block
         */
        this._commands = this.cmdEngine;
        this._user = this.userInfo;
        /**
         * private: show error when the app-data hasn't been installed yet for this imported-module
         */
        this._handleErrors = function (errType, cbTag) {
            var errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
            var msg = '';
            var toolbar = $("<ul class='sc-menu'></ul>");
            if (errType === 'DataIsMissing') {
                msg =
                    'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
                toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
            }
            errWrapper.append(msg);
            errWrapper.append(toolbar);
            $(cbTag).append(errWrapper);
        };
        this._getCbManipulator = function () { return manipulate_1.manipulator(_this.sxc); };
        // ReSharper restore InconsistentNaming
        /**
         * init this object
         */
        this.init = function () {
            var tag = api_1.getTag(_this.sxc);
            // enhance UI in case there are known errors / issues
            if (_this.editContext.error.type) {
                _this._handleErrors(_this.editContext.error.type, tag);
            }
            // todo: move this to dialog-handling
            // display the dialog
            var openDialogId = local_storage_helper_1.LocalStorageHelper.getItemValue('dia-cbid');
            if (_this.editContext.error.type || !openDialogId || openDialogId !== _this.sxc.cbid) {
                return false;
            }
            sessionStorage.removeItem('dia-cbid');
            _this.run('layout');
            return true;
        };
    }
    /**
     * change config by replacing the guid, and refreshing dependent sub-objects
     */
    EditManager.prototype._updateContentGroupGuid = function (context, newGuid) {
        context.contentBlock.contentGroupId = newGuid;
        this.editContext.ContentGroup.Guid = newGuid;
        // 2dm disabled, doesn't seem used - 
        // todo q2stv - pls confirm
        //this._instanceConfig = InstanceConfig.fromContext(context);// 2dm simplified buildInstanceConfig(context);
    };
    return EditManager;
}());


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * local storage helper to get typed values from it
 */
var LocalStorageHelper = /** @class */ (function () {
    function LocalStorageHelper() {
    }
    LocalStorageHelper.getItemValueString = function (key) {
        var value = localStorage.getItem(key);
        return value;
    };
    LocalStorageHelper.getItemValue = function (key) {
        var value = localStorage.getItem(key);
        return JSON.parse(value);
    };
    return LocalStorageHelper;
}());
exports.LocalStorageHelper = LocalStorageHelper;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\adapters\\button-config-adapter.ts'\n    at Error (native)");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModConfig = /** @class */ (function () {
    function ModConfig() {
    }
    return ModConfig;
}());
exports.ModConfig = ModConfig;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\translate\\2sxc._translateInit.ts'\n    at Error (native)");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\x-bootstrap\\module-bootstrapper.ts'\n    at Error (native)");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sxc_controller_in_page_1 = __webpack_require__(4);
/**
 * logDump - to write whole log to console if is enabled
 */
var LogUtils = /** @class */ (function () {
    function LogUtils() {
    }
    /**
     * Dump log to console, when debug logging is enabled by url query string parameters
     * @param log
     */
    LogUtils.logDump = function (log) {
        // 'jslog' is additional query string url parameter, to enable log dump (debug=true is required)
        // in the future would support more variations like jslog = toolbar etc.
        var jsLogUrlParam = sxc_controller_in_page_1.$2sxcInPage.urlParams.get('jslog');
        //if ($2sxc.debug.load) {
        //  console.log(log.dump());
        //}
        if (jsLogUrlParam) {
            console.log(log.dump());
        }
    };
    return LogUtils;
}());
exports.LogUtils = LogUtils;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\cmds-strategy-factory.ts'\n    at Error (native)");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(44);
__webpack_require__(92);
__webpack_require__(93);
__webpack_require__(25);
__webpack_require__(0);
__webpack_require__(76);
__webpack_require__(78);
__webpack_require__(75);
__webpack_require__(38);
__webpack_require__(77);
__webpack_require__(94);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(97);
__webpack_require__(98);
__webpack_require__(99);
__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(102);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);
__webpack_require__(112);
__webpack_require__(113);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(11);
__webpack_require__(119);
__webpack_require__(120);
__webpack_require__(45);
__webpack_require__(80);
__webpack_require__(121);
__webpack_require__(122);
__webpack_require__(123);
__webpack_require__(12);
__webpack_require__(26);
__webpack_require__(124);
__webpack_require__(81);
__webpack_require__(14);
__webpack_require__(18);
__webpack_require__(125);
__webpack_require__(36);
__webpack_require__(59);
__webpack_require__(48);
__webpack_require__(49);
__webpack_require__(50);
__webpack_require__(51);
__webpack_require__(52);
__webpack_require__(55);
__webpack_require__(56);
__webpack_require__(54);
__webpack_require__(57);
__webpack_require__(53);
__webpack_require__(58);
__webpack_require__(9);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(126);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(127);
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(79);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(4);
__webpack_require__(2);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(67);
__webpack_require__(16);
__webpack_require__(145);
__webpack_require__(89);
__webpack_require__(8);
__webpack_require__(5);
__webpack_require__(83);
__webpack_require__(70);
__webpack_require__(84);
__webpack_require__(82);
__webpack_require__(37);
__webpack_require__(74);
__webpack_require__(23);
__webpack_require__(64);
__webpack_require__(146);
__webpack_require__(1);
__webpack_require__(13);
__webpack_require__(147);
__webpack_require__(39);
__webpack_require__(24);
__webpack_require__(90);
__webpack_require__(148);
__webpack_require__(46);
__webpack_require__(149);
__webpack_require__(47);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(41);
__webpack_require__(40);
__webpack_require__(152);
__webpack_require__(28);
__webpack_require__(3);
__webpack_require__(6);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(27);
__webpack_require__(85);
__webpack_require__(66);
__webpack_require__(71);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(15);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(155);
__webpack_require__(17);
__webpack_require__(72);
__webpack_require__(156);
__webpack_require__(86);
__webpack_require__(157);
__webpack_require__(20);
__webpack_require__(65);
__webpack_require__(29);
__webpack_require__(19);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(30);
__webpack_require__(160);
__webpack_require__(68);
__webpack_require__(69);
__webpack_require__(161);
__webpack_require__(31);
__webpack_require__(73);
__webpack_require__(32);
__webpack_require__(35);
__webpack_require__(87);
__webpack_require__(10);
__webpack_require__(88);
module.exports = __webpack_require__(7);


/***/ }),
/* 92 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\2sxc-extensions\\2sxc.consts.ts'\n    at Error (native)");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var window_in_page_1 = __webpack_require__(2);
/** this enhances the $2sxc client controller with stuff only needed when logged in */
if (window_in_page_1.windowInPage.$2sxc && !window_in_page_1.windowInPage.$2sxc.system) {
    window_in_page_1.windowInPage.$2sxc.system = {
        finishUpgrade: finishUpgrade,
    };
}
// upgrade command - started when an error contains a link to start this
function finishUpgrade(domElement) {
    var mc = window_in_page_1.windowInPage.$2sxc(domElement);
    $.ajax({
        type: 'get',
        url: mc.resolveServiceUrl('view/module/finishinstallation'),
        beforeSend: $.ServicesFramework(mc.id).setModuleHeaders,
    }).success(function () {
        alert('Upgrade ok, restarting the CMS and reloading...');
        location.reload();
    });
    alert('starting upgrade. This could take a few minutes. You\'ll see an \'ok\' when it\'s done. Please wait...');
}


/***/ }),
/* 94 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\add.ts'\n    at Error (native)");

/***/ }),
/* 95 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\app-import.ts'\n    at Error (native)");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\app-resources.ts'\n    at Error (native)");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\app-settings.ts'\n    at Error (native)");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\app.ts'\n    at Error (native)");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\content-items.ts'\n    at Error (native)");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\content-type.ts'\n    at Error (native)");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\custom.ts'\n    at Error (native)");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\delete.ts'\n    at Error (native)");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\edit.ts'\n    at Error (native)");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\instance-list.ts'\n    at Error (native)");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\item-history.ts'\n    at Error (native)");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\layout.ts'\n    at Error (native)");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\metadata.ts'\n    at Error (native)");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\more.ts'\n    at Error (native)");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\movedown.ts'\n    at Error (native)");

/***/ }),
/* 110 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\moveup.ts'\n    at Error (native)");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\new.ts'\n    at Error (native)");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\publish.ts'\n    at Error (native)");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\remove.ts'\n    at Error (native)");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\replace.ts'\n    at Error (native)");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\template-develop.ts'\n    at Error (native)");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\template-query.ts'\n    at Error (native)");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\template-settings.ts'\n    at Error (native)");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\command\\zone.ts'\n    at Error (native)");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\definition.ts'\n    at Error (native)");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\dialog.ts'\n    at Error (native)");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\params.ts'\n    at Error (native)");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\commands\\settings.ts'\n    at Error (native)");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\contentBlock\\action-params.ts'\n    at Error (native)");

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ManipulateParams = /** @class */ (function () {
    function ManipulateParams() {
    }
    return ManipulateParams;
}());
exports.ManipulateParams = ManipulateParams;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WebApiParams = /** @class */ (function () {
    function WebApiParams() {
    }
    return WebApiParams;
}());
exports.WebApiParams = WebApiParams;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this will be something about the sxc - object, version, etc.
 */
var SxcContext = /** @class */ (function () {
    function SxcContext() {
    }
    return SxcContext;
}());
exports.SxcContext = SxcContext;


/***/ }),
/* 127 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\data-edit-context\\content-block.ts'\n    at Error (native)");

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContentGroup = /** @class */ (function () {
    function ContentGroup() {
    }
    return ContentGroup;
}());
exports.ContentGroup = ContentGroup;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataEditContext = /** @class */ (function () {
    function DataEditContext() {
    }
    return DataEditContext;
}());
exports.DataEditContext = DataEditContext;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment = /** @class */ (function () {
    function Environment() {
    }
    return Environment;
}());
exports.Environment = Environment;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Error = /** @class */ (function () {
    function Error() {
    }
    return Error;
}());
exports.Error = Error;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language() {
    }
    return Language;
}());
exports.Language = Language;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParametersEntity = /** @class */ (function () {
    function ParametersEntity() {
    }
    return ParametersEntity;
}());
exports.ParametersEntity = ParametersEntity;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
exports.User = User;


/***/ }),
/* 135 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\dnn-menu-helper\\dnn-inpage-edit.ts'\n    at Error (native)");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\dnn-workarounds\\dnn-08.00.04.ts'\n    at Error (native)");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\inpage.{}.ts'\n    at Error (native)");

/***/ }),
/* 138 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\interfaces\\Array.ts'\n    at Error (native)");

/***/ }),
/* 139 */
/***/ (function(module, exports) {



/***/ }),
/* 140 */
/***/ (function(module, exports) {

// ReSharper restore InconsistentNaming


/***/ }),
/* 141 */
/***/ (function(module, exports) {



/***/ }),
/* 142 */
/***/ (function(module, exports) {



/***/ }),
/* 143 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\lib-helpers\\2sxc._lib.extend.ts'\n    at Error (native)");

/***/ }),
/* 144 */
/***/ (function(module, exports) {



/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 146 */
/***/ (function(module, exports) {

// https://tc39.github.io/ecma262/#sec-array.prototype.find
// https://stackoverflow.com/questions/31455805/find-object-in-array-using-typescript
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        }
    });
}


/***/ }),
/* 147 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\cb-or-mod.ts'\n    at Error (native)");

/***/ }),
/* 148 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\conf.ts'\n    at Error (native)");

/***/ }),
/* 149 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\content-block.ts'\n    at Error (native)");

/***/ }),
/* 150 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\delete.ts'\n    at Error (native)");

/***/ }),
/* 151 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\dictionary.ts'\n    at Error (native)");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\module.ts'\n    at Error (native)");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\selectors.ts'\n    at Error (native)");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\quick-edit\\specs.ts'\n    at Error (native)");

/***/ }),
/* 155 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\button\\button-definition.ts'\n    at Error (native)");

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GroupConfig = /** @class */ (function () {
    function GroupConfig(buttons) {
        this.buttons = []; // array of buttons
        this.defaults = []; // v1
        // adds these to the items
        this.buttons = buttons;
    }
    GroupConfig.fromNameAndParams = function (name, params) {
        var groupConfig = new GroupConfig([]);
        // builds buttons from name and params, then adds
        return groupConfig;
    };
    return GroupConfig;
}());
exports.GroupConfig = GroupConfig;


/***/ }),
/* 157 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: EPERM: operation not permitted, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\item\\item-render.ts'\n    at Error (native)");

/***/ }),
/* 158 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\libs\\shake.ts'\n    at Error (native)");

/***/ }),
/* 159 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar-events.ts'\n    at Error (native)");

/***/ }),
/* 160 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar-shake.ts'\n    at Error (native)");

/***/ }),
/* 161 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open 'C:\\Projects\\2sxc-inpage\\src\\toolbar\\toolbar\\toolbar-config-template.ts'\n    at Error (native)");

/***/ })
/******/ ]);
//# sourceMappingURL=inpage.js.map
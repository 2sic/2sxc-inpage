import { ContextOfButton } from '../context/context-of-button';

const tagToolbarPadding = 4;
const tagToolbarAttr = "data-tagtoolbar"
const tagToolbarForAttr = "data-tagtoolbar-for"

/**
 * Returns the body offset if positioning is relative or absolute
 */
function getBodyOffset() {
  var body = $("body");
  const bodyPos = body.css('position');
  if (bodyPos == 'relative' || bodyPos == 'absolute') {
    return {
      top: body.offset().top,
      left: body.offset().left
    }
  }
  return {
    top: 0,
    left: 0
  }
}

/**
 * Number generator used for TagToolbars
 */
var _lastMenuId = 0;
function getMenuNumber() {
  return _lastMenuId++;
}

/**
 * Remove orphan tag-toolbars from DOM
 */
export function CleanupTagToolbars() {
  var tagToolbars = $(`[${tagToolbarForAttr}]`);
  tagToolbars.each((i, e) => {
    let id = $(e).attr(tagToolbarForAttr);
    if (!$(`[${tagToolbarAttr}=${id}]`).length) {
      $(e).remove();
    }
  });
}

export function AppendTagToolbar(tag: JQuery<HTMLElement>, cnt: ContextOfButton, toolbar: string) {

  var toolbarElement = <JQuery<HTMLElement>>null;
  var initialized = false;

  function initialize() {
    var toolbarId = `${cnt.instance.id}-${cnt.contentBlock.id}-${getMenuNumber()}`;

    // append tag to body
    toolbarElement = $(toolbar);

    toolbarElement.on('mouseleave', (e) => {
      // if we do not hover the tag now, hide it
      if (!$.contains(tag[0], e.relatedTarget) && tag[0] != e.relatedTarget)
        hideToolbar();
    });

    $("body").append(toolbarElement);

    toolbarElement.attr(tagToolbarForAttr, toolbarId);
    tag.attr(tagToolbarAttr, toolbarId);

    toolbarElement.css({ display: 'none', position: 'absolute' });

    initialized = true;
  }
  
  var updatePosition = function () {
    var position = {
      top: <any>'auto',
      left: <any>'auto',
      right: <any>'auto'
    };

    // If we scrolled down, the toolbar might not be visible - calculate offset
    var viewportOffset = tag[0].getBoundingClientRect();
    var scrollOffset = Math.min(viewportOffset.top - getBodyOffset().top - 55, 0);

    // Update coordinates (in case the hovering element has changed position)
    position.top = tag.offset().top + tagToolbarPadding + getBodyOffset().top - scrollOffset;

    if (toolbarElement.hasClass("sc-tb-hover-right"))
      position.right = window.outerWidth - tag.offset().left - tag.outerWidth() + tagToolbarPadding - getBodyOffset().left;
    else
      position.left = tag.offset().left + tagToolbarPadding + getBodyOffset().left;

    toolbarElement.css(position);
  }
  
  // Ensure toolbar gets visible when hovering
  tag.on('mouseenter', () => {
    if (!initialized)
      initialize();

    $(window).on('scroll', updatePosition);
    updatePosition();
    toolbarElement.css({ display: 'block' }); 
  });

  function hideToolbar() {
    $(window).off('scroll', updatePosition);
    toolbarElement.css({ display: 'none' });
  }

  tag.on('mouseleave', (e) => {
    // if we hover the menu itself now, don't hide it
    if (!$.contains(toolbarElement[0], e.relatedTarget) && toolbarElement[0] != e.relatedTarget)
      hideToolbar();
  });

}
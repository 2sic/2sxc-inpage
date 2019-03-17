import { ContextOfButton } from '../context/context-of-button';
import { renderToolbar } from './item/render-toolbar';

const tagToolbarPadding = 4;
const tagToolbarAttr = 'data-tagtoolbar';
const tagToolbarForAttr = 'data-tagtoolbar-for';

/**
 * Returns the body offset if positioning is relative or absolute
 */
function getBodyOffset() {
  const body = $('body');
  const bodyPos = body.css('position');
  if (bodyPos === 'relative' || bodyPos === 'absolute') {
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
  const tagToolbars = $(`[${tagToolbarForAttr}]`);
  tagToolbars.each((i, e) => {
    const id = $(e).attr(tagToolbarForAttr);
    if (!$(`[${tagToolbarAttr}=${id}]`).length) {
      $(e).remove();
    }
  });
}

const mousePosition = {
  x: 0,
  y: 0
}
$(window).on('mousemove', (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

class TagToolbar {
  toolbarElement = null as JQuery<HTMLElement>;
  initialized = false;
  //tag: JQuery<HTMLElement>;
  //cnt: ContextOfButton;

  constructor(private readonly tag: JQuery<HTMLElement>, private readonly cnt: ContextOfButton) {
    // Ensure toolbar gets visible when hovering
    tag.on('mouseenter', () => {
      this.initialize();
      this.showToolbar();
    });

    tag.on('mouseleave', (e) => {
      this.initialize();

      // if we hover the menu itself now, don't hide it
      if (!$.contains(this.toolbarElement[0], e.relatedTarget) && this.toolbarElement[0] !== e.relatedTarget)
        this.hideToolbar();
    });
  }

  initialize() {
    if (this.initialized)
      return;

    const toolbarId = `${this.cnt.instance.id}-${this.cnt.contentBlock.id}-${getMenuNumber()}`;

    // render toolbar and append tag to body
    this.toolbarElement = $(renderToolbar(this.cnt));

    this.toolbarElement.on('mouseleave', (e) => {
      // if we do not hover the tag now, hide it
      if (!$.contains(this.tag[0], e.relatedTarget) && this.tag[0] !== e.relatedTarget)
        this.hideToolbar();
    });

    $('body').append(this.toolbarElement);

    this.toolbarElement.attr(tagToolbarForAttr, toolbarId);
    this.tag.attr(tagToolbarAttr, toolbarId);

    this.toolbarElement.css({ display: 'none', position: 'absolute', transition: 'top 0.5s ease-out' });

    this.initialized = true;
  }

  updatePosition() {

    const position = {
      top: 'auto' as any,
      left: 'auto' as any,
      right: 'auto' as any
    };

    // If we scrolled down, the toolbar might not be visible - calculate offset
    console.log(this);
    const viewportOffset = this.tag[0].getBoundingClientRect();
    const scrollOffset = Math.min(viewportOffset.top - getBodyOffset().top, 0);

    // Update top coordinates
    if (scrollOffset === 0)
      position.top = this.tag.offset().top + tagToolbarPadding + getBodyOffset().top - scrollOffset;
    else
      position.top = mousePosition.y + window.scrollY;

    // Update left / right coordinates
    if (this.toolbarElement.hasClass('sc-tb-hover-right'))
      position.right = window.outerWidth - this.tag.offset().left - this.tag.outerWidth() + tagToolbarPadding - getBodyOffset().left;
    else
      position.left = this.tag.offset().left + tagToolbarPadding + getBodyOffset().left;

    this.toolbarElement.css(position);
  }
  
  hideToolbar() {
    $(window).off('scroll', () => this.updatePosition()); // important: use the () => syntax!
    this.toolbarElement.css({ display: 'none' });
  }



  showToolbar() {
    if (this.toolbarElement.is(':visible'))
      return;
    this.toolbarElement.css({ display: 'block' });
    $(window).on('scroll', () => this.updatePosition());  // important: use the () => syntax!
    this.updatePosition();
  }

}

export function AppendTagToolbar(tag: JQuery<HTMLElement>, cnt: ContextOfButton) {
  new TagToolbar(tag, cnt);
}
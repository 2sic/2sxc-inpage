// Polyfill for creating CustomEvents on IE9/10/11
// https://raw.githubusercontent.com/krambuhl/custom-event-polyfill/master/custom-event-polyfill.js

try {
  var ce = new (window as any).CustomEvent('test');
  ce.preventDefault();
  if (ce.defaultPrevented !== true) {
    // IE has problems with .preventDefault() on custom events
    // http://stackoverflow.com/questions/23349191
    throw new Error('Could not prevent default');
  }
} catch (e) {
  let CustomEvent = (event: string, params: any) => {

    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined as any
    };

    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    const origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: () => true
        });
      } catch (e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = (window as any).Event.prototype;
  (window as any).CustomEvent = CustomEvent; // expose definition to window
}

﻿// ReSharper disable once InconsistentNaming
declare let Shake: any;

// enable shake detection on all toolbars
$(() => {

  // this will add a css-class to auto-show all toolbars (or remove it again)
  function toggleAllToolbars() {
    $(document.body).toggleClass('sc-tb-show-all');
  }

  // start shake-event monitoring, which will then generate a window-event
  (new Shake({ callback: toggleAllToolbars })).start();
});

import { $quickE as quickE } from './$quickE.{}';
import { Conf } from './conf';
import { selectors } from './selectors-instance';

const configAttr: string = 'quick-edit-config';

/**
 * the initial configuration
 */
let conf = quickE.config = {
  enable: true,
  innerBlocks: {
    enable: null, // default: auto-detect
  },
  modules: {
    enable: null, // default: auto-detect
  }
};

export function _readPageConfig() {
  let configs: Conf[] = $(`[${configAttr}]`);
  let finalConfig: Conf = {} as Conf;
  let confJ: string;
  let confO: Conf;

  // any inner blocks found? will currently affect if modules can be inserted...
  let hasInnerCBs: boolean = ($(selectors.cb.listSelector).length > 0);

  if (configs.length > 0) {
    // go through reverse list, as the last is the most important...
    for (let c = configs.length; c >= 0; c--) {
      confJ = configs[0].getAttribute(configAttr);
      try {
        confO = JSON.parse(confJ) as Conf;
        $.extend(finalConfig, confO);
      } catch (e) {
        console.warn('had trouble with json', e);
      }
    }
    $.extend(conf, finalConfig);
  }

  // re-check "auto" or "null"
  // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
  if (conf.modules.enable === null || conf.modules.enable === 'auto') conf.modules.enable = !hasInnerCBs;

  // for now, ContentBlocks are only enabled if they exist on the page
  if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto') conf.innerBlocks.enable = hasInnerCBs;
}


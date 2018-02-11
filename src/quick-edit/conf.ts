// ReSharper disable InconsistentNaming

declare let $quickE: I$quickE;

interface IConf {
  enable: boolean;
  innerBlocks: {
    enable: boolean | string | null;
  };
  modules: {
    enable: boolean | string | null;
  };
  getAttribute?(configAttr: string): any;
  guid?: string;
}

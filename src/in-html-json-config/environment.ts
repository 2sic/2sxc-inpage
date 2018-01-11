import { checkArray, checkNumber, checkBoolean, checkString, checkNull, throwNull2NonNull, throwNotObject, throwIsArray, } from './ihj-helper';
import { ParametersEntity } from './parameters-entity';
import { IEnvironment } from './environment-interface';

/**
 * Environment class
 */
export class Environment implements IEnvironment {
  public WebsiteId: number;
  public WebsiteUrl: string;
  public PageId: number;
  public PageUrl: string;
  public parameters: ParametersEntity[] | null;
  public InstanceId: number;
  public SxcVersion: string;
  public SxcRootUrl: string;
  public IsEditable: boolean;
  
  constructor(data: any) {
    this.WebsiteId = data.WebsiteId;
    this.WebsiteUrl = data.WebsiteUrl;
    this.PageId = data.PageId;
    this.PageUrl = data.PageUrl;
    this.parameters = data.parameters;
    this.InstanceId = data.InstanceId;
    this.SxcVersion = data.SxcVersion;
    this.SxcRootUrl = data.SxcRootUrl;
    this.IsEditable = data.IsEditable;
  }
}
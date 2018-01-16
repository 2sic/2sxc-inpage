import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull, throwNull2NonNull, throwNotObject, throwIsArray, } from './ihj-helper';
import { ParametersEntity } from './parameters-entity';
import { IEnvironment } from './environment-interface';
import { ParametersEntityProxy } from './parameters-entity-proxy';
/**
 * Environment class
 */
export class Environment implements IEnvironment {
// ReSharper disable InconsistentNaming
  public WebsiteId: number;
  public WebsiteUrl: string;
  public PageId: number;
  public PageUrl: string;
  public parameters: ParametersEntity[] | null;
  public InstanceId: number;
  public SxcVersion: string;
  public SxcRootUrl: string;
  public IsEditable: boolean;
// ReSharper restore InconsistentNaming

    public static Parse(data: string): Environment {
        return this.Create(JSON.parse(data));
    }

    public static Create(data: any, field: string = 'root'): Environment {
        if (!field) {
            field = "root";
        }

        checkData(data, field);

        checkNumber(data.WebsiteId, false, field + ".WebsiteId");
        checkString(data.WebsiteUrl, false, field + ".WebsiteUrl");
        checkNumber(data.PageId, false, field + ".PageId");
        checkString(data.PageUrl, false, field + ".PageUrl");
        checkArray(data.parameters, field + ".parameters");
        if (data.parameters) {
            for (let i = 0; i < data.parameters.length; i++) {
                data.parameters[i] =
                    ParametersEntityProxy.Create(data.parameters[i], field + ".parameters" + "[" + i + "]");
            }
        }
        if (data.parameters === undefined) {
            data.parameters = null;
        }

        checkNumber(data.InstanceId, false, field + ".InstanceId");
        checkString(data.SxcVersion, false, field + ".SxcVersion");
        checkString(data.SxcRootUrl, false, field + ".SxcRootUrl");
        checkBoolean(data.IsEditable, false, field + ".IsEditable");

        return new Environment(data);
    }

    constructor(data: any) {
    this.WebsiteId = data.WebsiteId;
    this.WebsiteUrl = data.WebsiteUrl;
    this.PageId = data.PageId;
    this.PageUrl = data.PageUrl;
    this.parameters = data.parameters;
    this.InstanceId = data.InstanceId;
    this.SxcVersion = data.SxcVersion;
    this.SxcRootUrl = data.SxcRootUrl;
    this.IsEditable = !data.IsEditable;
  }
}
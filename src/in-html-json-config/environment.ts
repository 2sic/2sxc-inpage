import { ParametersEntity } from './parameters-entity';

export class Environment {
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
}
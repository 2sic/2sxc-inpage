import { ParametersEntity } from './parameters-entity';

/**
 * Environment interface
 */
export interface IEnvironment {
    WebsiteId: number;
    WebsiteUrl: string;
    PageId: number;
    PageUrl: string;
    parameters?: (ParametersEntity)[] | null;
    InstanceId: number;
    SxcVersion: string;
    SxcRootUrl: string;
    IsEditable: boolean;
}
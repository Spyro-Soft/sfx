import { CreateWorkspaceOptions } from 'create-nx-workspace';

//some options are not exported by create-nx-workspace, we will have to manually check them against their website with each version bump

export interface ICreateWorkspaceFrameworkBasicOptions {
  style: string;
}

export interface ICreateAngularWorkspace extends ICreateWorkspaceFrameworkBasicOptions {
  routing?: boolean;
  standaloneApi?: boolean;
}

export interface ICreateNextWorkspace extends ICreateWorkspaceFrameworkBasicOptions {
  nextAppDir?: boolean;
}

//there are no react-specific options right now, but this is more than likely to change in the future
export type TCreateReactWorkspace = ICreateWorkspaceFrameworkBasicOptions;

export type TCreateNxWorkspaceFrameworkOptions = ICreateAngularWorkspace | ICreateNextWorkspace | TCreateReactWorkspace;

export type TCreateNxWorkspaceOptions = CreateWorkspaceOptions &
  TCreateNxWorkspaceFrameworkOptions & {
    appName: string;
    bundler: string;
  };

export interface IBaseOptions {
  nxName: string;
  framework: string;
  appName: string;
}

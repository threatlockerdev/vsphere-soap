export enum PyPropFlags {
  link = 1,
  linkable = 2,
  optional = 4,
  secret = 8
}

export type PyProp = [
  name: string,
  type: string,
  version: string,
  flags: number,
  /** don't know what this is */
  more?: string
];

export type PyMethod = [
  name: string,
  officialName: string,
  version: string,
  parameters: PyProp[],
  results: [
    flags: number,
    type: string,
    officialType: string
  ],
  more?: string,
  faults?: string[]
];

export interface PyBaseType {
  vmodlName: string;
  wsdlName: string;
  version: string;
}

export interface PyDataType extends PyBaseType {
  parent: string;
  props?: PyProp[];
}

export interface PyEnumType extends PyBaseType {
  values: string[];
}

export interface PyManagedType extends PyBaseType {
  parent: string;
  props?: PyProp[];
  methods?: PyMethod[];
}

export interface PyDefinitions {
  breakingChanges: {
    branchName: string;
    vmodlNamespace: string;
    count: number;
  }[];
  dataTypes: PyDataType[];
  enumTypes: PyEnumType[];
  managedTypes: PyManagedType[];
  versions: {
    version: string;
    namespace: string;
    versionId: string;
    isLegacy: boolean;
    serviceNamespace: string;
    parents: string[];
    flags: {[flag: string]: true};
  }[];
}

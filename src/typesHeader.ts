/* eslint-disable */

import { Connection } from "./Connection";

const typeNames: {
  [key in "classes" | "enums" | "interfaces"]: Record<string, Record<string, string | typeof ManagedObject>>;
} = {
  classes: {},
  enums: {},
  interfaces: {}
};

const literalTypes = ["undefined", "string", "boolean", "number", "any", "unknown", "null"];

const constructHelperObjects = (connection: Connection, data: any, thisName: string, options?: { fromConstructor: boolean }): any => {
  const { fromConstructor = false } = options ?? {};
  if (!data) {
    return data;
  }
  if (thisName in typeNames.enums || literalTypes.includes(thisName) || thisName === undefined) {
    return (typeof data === "object" && !!data && "$value" in data) ? data.$value : data;
  }
  if (thisName === "Date") {
    return new Date(data);
  }
  if (thisName === "Buffer") {
    return Buffer.from(data, "base64");
  }
  if (data instanceof Array) {
    return data.map(item => constructHelperObjects(connection, item, thisName));
  }
  if (thisName.endsWith("[]")) {
    thisName = thisName.slice(0, -2);
  }
  const fieldMap = typeNames.classes[thisName] ?? typeNames.interfaces[thisName];
  if (connection.options.debug) {
    console.log("vsphere-soap.constructHelperObjects", { thisName, fieldMap, data });
  }
  if (fieldMap !== undefined && "_this" in fieldMap && typeof fieldMap._this === "function" && !fromConstructor) {
    return new fieldMap._this(connection, data);
  }
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    const itemConstructor = fieldMap[key];
    if (typeof itemConstructor !== "function") {
      return [key, constructHelperObjects(connection, value, itemConstructor)];
    }
    if (value instanceof Array) {
      return [key, value.map(v => new itemConstructor(connection, v))];
    }
    return [key, new itemConstructor(connection, value as Partial<ManagedObject>)];
  }));
}

export type ObjectReference = string | {
  attributes: {
    type: string;
  };
  $value?: string;
}

export interface DataObject {
  attributes?: {
    "xsi:type": string;
  }
}
typeNames.interfaces["DataObject"] = {};

export class ManagedObject {
  $value!: string;

  constructor(
    public connection: Connection,
    init?: Partial<ManagedObject>
  ) { Object.assign(this, init); }

  get id(): string {
    return this.$value;
  }
}
typeNames.classes["ManagedObject"] = {
  _this: ManagedObject,
  $value: "string"
};

export interface FaultCause {
  fault: MethodFault;
  localizedMessage?: string;
}
typeNames.interfaces["FaultCause"] = {
  fault: "MethodFault",
  localizedMessage: "string"
};

export interface FaultMessageArg {
  key: string;
  value: string;
}
typeNames.interfaces["FaultMessageArg"] = {
  key: "string",
  value: "string"
}

export interface FaultMessage {
  arg?: FaultMessageArg[];
  key: string;
  message: string;
}
typeNames.interfaces["FaultMessage"] = {
  arg: "FaultMessageArg",
  key: "string",
  message: "string"
};

export interface MethodFault {
  faultCause?: {
    fault: MethodFault;
    localizedMessage?: string;
  };
  faultMessage?: {
    arg?: {
      key: string;
      value: string;
    }[];
    key: string;
    message: string;
  }[];
}
typeNames.interfaces["MethodFault"] = {
  faultCause: "FaultCause",
  faultMessage: "FaultMessage"
};

export interface RuntimeFault extends MethodFault { }
typeNames.interfaces["RuntimeFault"] = typeNames.interfaces["MethodFault"];

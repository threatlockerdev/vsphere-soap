/* eslint-disable */

import { Connection } from "./Connection";

const constructHelperObjects = (connection: Connection, data: any, target: any, fieldClassMap: any): any => {
  for (const key of Object.keys(data)) {
    const itemConstructor = fieldClassMap[key];
    if (itemConstructor !== undefined) {
      const value = data[key];
      if (value instanceof Array) {
        target[key] = value.map(v => new itemConstructor(connection, v));
      } else {
        target[key] = new itemConstructor(connection, data[key]);
      }
    } else {
      target[key] = data[key]!;
    }
  }
  return target;
}

export type ObjectReference = string | {
  attributes: {
    type: string;
  };
  $value?: string;
}

export interface DataObject { }

export class ManagedObject {
  $value!: string;

  constructor(
    public connection: Connection,
    init?: Partial<ManagedObject>
  ) { }

  get id(): string {
    return this.$value;
  }
}

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
export interface RuntimeFault extends MethodFault { }

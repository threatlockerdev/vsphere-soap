/* eslint-disable no-bitwise */

import * as _ from "lodash";

import { PyDataType, PyDefinitions, PyEnumType, PyManagedType, PyMethod, PyProp, PyPropFlags } from "./PyDefinitions";

type TypeMapEntry = ({
  type: "enum";
} & PyEnumType) | ({
  type: "interface";
} & PyDataType) | ({
  type: "class";
} & PyManagedType);

export class TypeGenerator {
  private typeMap: Record<string, TypeMapEntry> = {};

  constructor(
    private readonly definitions: PyDefinitions
  ) { }

  generate(): string {
    this.populateTypeNames();

    return `
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
  $value: string;

  constructor(
    protected readonly connection: Connection,
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
${this.createDataTypes()}
${this.createEnums()}
${this.createManagedTypes()}
`.trim();
  }

  private createDataTypes(): string {
    return this.definitions.dataTypes.map(type => `
export interface ${type.wsdlName}${type.parent ? ` extends ${this.typeMap[type.parent].wsdlName}` : ""} {
  ${type.props ? `${this.createProps(type.props, ";\n  ")};` : ""}
}`.trim()).join("\n");
  }

  private createEnums(): string {
    return this.definitions.enumTypes.map(type => `
export enum ${type.wsdlName} {
${type.values.map(value =>
    `  ${_.camelCase(value)} = "${value}"`
  ).join(",\n")}
}
`.trim()).join("\n");
  }

  private createManagedTypes(): string {
    return this.definitions.managedTypes.map(type => `
export class ${type.wsdlName}${type.parent ? ` extends ${this.typeMap[type.parent].wsdlName}` : ""} {
  ${type.props ? `${this.createProps(type.props, ";\n  ", "!")};` : ""}
  ${this.createConstructor(type)}
  ${type.methods ? `${type.methods.map(m => this.createMethod(type.wsdlName, m)).join("\n  ")};` : ""}
}
`.trim()).join("\n");
  }

  private createProps(props: PyProp[], separator: string, requiredChar = ""): string {
    return props.map(([name, type, , flags]) =>
      `${name}${flags & PyPropFlags.optional ? "?" : requiredChar}: ${this.getTypescriptType(type)}`
    ).join(separator);
  }

  private createMethod(className: string, [name, soapName, , parameters, [resultFlags, resultType]]: PyMethod): string {
    const paramsType = parameters.length > 0 ? `{
  ${this.createProps(parameters, ";\n    ")}
}` : "unknown";
    const returnType = `${this.getTypescriptType(resultType)}${resultFlags & PyPropFlags.optional ? " | undefined" : ""}`;
    const returnDefinition = resultType in this.typeMap ? this.typeMap[resultType] : undefined;
    return `async ${name}(${parameters.length === 0 ? "" : `args: ${paramsType}`}): Promise<${returnType}> {
    const result = await this.connection.exec<${paramsType} & { _this: ObjectReference }, ${returnType}>(
      "${soapName}", { ${this.getThisArgument(className)}, ${parameters.length > 0 ? "...args" : ""} }
    ).then(r => r.result);
    return ${returnDefinition?.type === "class"
    ? `new ${returnDefinition.wsdlName.replace("[]", "")}(this.connection, result)`
    : returnDefinition?.type === "interface"
      ? `constructHelperObjects(this.connection, result, {}, ${this.createFieldClassMap(returnDefinition.props ?? [])})`
      : "result"};
  }`;
  }

  private createConstructor(type: PyManagedType): string {
    const classPropCount = type.props?.filter(p => this.isClassProp(p[1]))?.length ?? 0;
    return `constructor(
    protected readonly connection: Connection,
    init?: Partial<${type.wsdlName}>
  ) {
    ${type.parent ? "super(connection, init);" : ""}
    ${classPropCount > 0 && type.props ? `if (init) {
      constructHelperObjects(connection, init, this, ${this.createFieldClassMap(type.props)});
    }` : "Object.assign(this, init);"}
  }`;
  }

  private createFieldClassMap(props: PyProp[]): string {
    return `{ ${props.map(([name, propType]) => {
      const sanitizedType = propType.replace("[]", "");
      return `${name}: ${this.isClassProp(propType) ? this.getTypescriptType(sanitizedType) : "undefined"}`;
    }).join(",\n        ")} }`;
  }

  private getThisArgument(className: string): string {
    if (className === "ServiceInstance") {
      return `_this: "${className}"`;
    }
    return `_this: { attributes: { type: "${className}" }, $value: this.$value }`;
  }

  private isClassProp(type: string): boolean {
    const sanitizedType = type.replace("[]", "");
    return sanitizedType in this.typeMap && this.typeMap[sanitizedType].type === "class";
  }

  private getTypescriptType(pyType = "unknown"): string {
    if (pyType.endsWith("[]")) {
      return `${this.getTypescriptType(pyType.slice(0, -2))}[]`;
    }
    switch (pyType) {
      case "anyType":
        return "any";
      case "byte":
      case "double":
      case "float":
      case "int":
      case "long":
      case "short":
        return "number";
      case "boolean":
      case "string":
      case "void":
        return pyType;
      default:
        return pyType in this.typeMap ? this.typeMap[pyType].wsdlName : "unknown";
    }
  }

  private populateTypeNames(): void {
    this.typeMap = Object.fromEntries(
      [
        ["vmodl.DataObject", "DataObject"],
        ["vmodl.DynamicData", "DynamicData"],
        ["vmodl.MethodFault", "MethodFault"],
        ["vmodl.RuntimeFault", "RuntimeFault"],
        ["vmodl.ManagedObject", "ManagedObject"],
        ["vmodl.MethodName", "string"],
        ["vmodl.PropertyPath", "string"],
        ["vmodl.TypeName", "string"],
        ["vmodl.DateTime", "Date"],
        ["vmodl.Binary", "Buffer"]
      ].map<[string, TypeMapEntry]>(([key, name]) => [key, {
        wsdlName: name,
        vmodlName: key,
        type: "interface",
        parent: "",
        version: ""
      }])
        .concat(this.definitions.dataTypes.map(dt => [dt.vmodlName, {
          ...dt,
          type: "interface"
        }]))
        .concat(this.definitions.enumTypes.map(dt => [dt.vmodlName, {
          ...dt,
          type: "enum"
        }]))
        .concat(this.definitions.managedTypes.map(dt => [dt.vmodlName, {
          ...dt,
          type: "class"
        }]))
    ) as Record<string, TypeMapEntry>;
  }
}

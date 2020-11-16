/* eslint-disable no-bitwise */

import * as fs from "fs";
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
/*
 * THIS FILE IS AUTOMATICALLY GENERATED.
 * Manually editing it will only lead to sorrow.
 */

${fs.readFileSync(`${__dirname}/../../src/typesHeader.ts`, "utf8")}

${this.createDataTypes()}
${this.createEnums()}
${this.createManagedTypes()}
${this.createTypeNames()}
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
}`.trim()).join("\n");
  }

  private createManagedTypes(): string {
    return this.definitions.managedTypes.map(type => `
export class ${type.wsdlName}${type.parent ? ` extends ${this.typeMap[type.parent].wsdlName}` : ""} {
  ${type.props ? `${this.createProps(type.props, ";\n  ", "!")};` : ""}
  ${this.createConstructor(type)}
  ${type.methods ? `${type.methods.map(m => this.createMethod(type.wsdlName, m)).join("\n  ")};` : ""}
}`.trim()).join("\n");
  }

  private createTypeNames(): string {
    return this.definitions.enumTypes.map(type =>
      `typeNames.enums["${type.wsdlName}"] = {}`
    ).concat(this.definitions.dataTypes.map(type =>
      `typeNames.interfaces["${type.wsdlName}"] = ${this.createFieldClassMap(type.props ?? [])}`
    )).concat(this.definitions.managedTypes.map(type =>
      `typeNames.classes["${type.wsdlName}"] = ${this.createFieldClassMap(type.props?.concat([
        ["_this", type.vmodlName, "", 0]
      ]) ?? [])}`
    )).join(";\n");
  }

  private createProps(props: PyProp[], separator: string, requiredChar = ""): string {
    return props.map(([name, type, , flags]) => `${name}${flags & PyPropFlags.optional ? "?" : requiredChar}: ${this.getTypescriptType(type).name}`).join(separator);
  }

  private createMethod(className: string, [name, soapName, , parameters, [resultFlags, resultType]]: PyMethod): string {
    const paramsType = parameters.length > 0 ? `{
  ${this.createProps(parameters, ";\n    ")}
}` : "unknown";
    const rawReturnType = this.getTypescriptType(resultType).name;
    const returnType = `${rawReturnType}${resultFlags & PyPropFlags.optional ? " | undefined" : ""}`;
    const returnDefinition = resultType in this.typeMap ? this.typeMap[resultType] : undefined;
    return `async ${name}(${parameters.length === 0 ? "" : `args: ${paramsType}`}): Promise<${returnType}> {
    const result = await this.connection.exec<${paramsType} & { _this: ObjectReference }, ${returnType}>(
      "${soapName}", { ${this.getThisArgument(className)}, ${parameters.length > 0 ? "...args" : ""} }
    ).then(r => r.result);
    return constructHelperObjects(this.connection, result, "${returnDefinition?.wsdlName ?? rawReturnType}");
  }`;
  }

  private createConstructor(type: PyManagedType): string {
    return `constructor(
    public connection: Connection,
    init?: Partial<${type.wsdlName}>
  ) {
    ${type.parent ? "super(connection, init);" : ""}
    if (init) {
      Object.assign(this, constructHelperObjects(connection, init, this.constructor.name, { fromConstructor: true }));
    }
  }`;
  }

  private createFieldClassMap(props: PyProp[]): string {
    return `{\n${props.map(([name, propType]) => {
      const sanitizedType = propType.replace("[]", "");
      const tsType = this.getTypescriptType(sanitizedType);
      return `${name}: ${tsType.type === "class" ? tsType.name : `"${tsType.name}"`}`;
    }).join(",\n        ")}\n}`;
  }

  private getThisArgument(className: string): string {
    if (className === "ServiceInstance") {
      return `_this: "${className}"`;
    }
    return `_this: { attributes: { type: "${className}" }, $value: this.$value }`;
  }

  private getTypescriptType(pyType = "unknown"): {
    name: string;
    type: TypeMapEntry["type"] | "literal";
  } {
    if (pyType.endsWith("[]")) {
      const tsType = this.getTypescriptType(pyType.replace("[]", ""));
      return {
        name: `${tsType.name}[]`,
        type: tsType.type
      };
    }
    switch (pyType) {
      case "anyType":
        return { name: "any", type: "literal" };
      case "byte":
      case "double":
      case "float":
      case "int":
      case "long":
      case "short":
        return { name: "number", type: "literal" };
      case "boolean":
      case "string":
      case "void":
        return { name: pyType, type: "literal" };
      default:
        return pyType in this.typeMap ? {
          name: this.typeMap[pyType].wsdlName,
          type: this.typeMap[pyType].type,
        } : { name: "unknown", type: "literal" };
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

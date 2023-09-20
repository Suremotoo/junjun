import { Api } from "./Api";

// models/Parameter.ts
export class Parameter {
  id: number | null;
  apiId: number | null;
  name: string;
  cnName: string;
  paramType: string;
  description: string;
  isRequired: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  api: Api | null;

  constructor(
    id: number,
    apiId: number | null,
    name: string,
    cnName: string,
    paramType: string,
    description: string,
    isRequired: boolean | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    api: Api | null
  ) {
    this.id = id;
    this.apiId = apiId;
    this.name = name;
    this.cnName = cnName;
    this.paramType = paramType;
    this.description = description;
    this.isRequired = isRequired;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.api = api;
  }
  static fromObject(obj: any) {
    return new Parameter(
      obj.id,
      obj.apiId,
      obj.name,
      obj.cnName,
      obj.paramType,
      obj.description,
      obj.isRequired,
      obj.createdAt,
      obj.updatedAt,
      null
    );
  }
}

const emptyParameter: Partial<Parameter> = {
  id: null,
  apiId: null,
  name: "",
  cnName: "",
  paramType: "",
  description: "",
  isRequired: null,
  createdAt: null,
  updatedAt: null,
  api: null,
};

export const emptyParameterTyped: Parameter = emptyParameter as Parameter;

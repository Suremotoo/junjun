import { Project } from "./Project";

export class Api {
  id: number | null;
  projectId: number | null;
  name: string;
  description: string;
  endpointUrl: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  project: Project | null;

  constructor(
    id: number,
    projectId: number | null,
    name: string,
    description: string,
    endpointUrl: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    project: Project | null
  ) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.endpointUrl = endpointUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.project = project;
  }
  static fromObject(obj: any) {
    return new Api(
      obj.id,
      obj.projectId,
      obj.name,
      obj.description,
      obj.endpointUrl,
      obj.createdAt,
      obj.updatedAt,
      null
    );
  }
}

const emptyApi: Partial<Api> = {
  id: null,
  projectId: null,
  name: "",
  description: "",
  endpointUrl: "",
  createdAt: null,
  updatedAt: null,
  project: null,
};

export const emptyApiTyped: Api = emptyApi as Api;

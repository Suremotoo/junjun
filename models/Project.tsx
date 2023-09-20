export class Project {
  id: number | null;
  name: string;
  aliasName: string;
  description: string;
  createdAt: Date | null;
  updatedAt: Date | null;

  constructor(
    id: number,
    name: string,
    aliasName: string,
    description: string,
    createdAt: Date | null,
    updatedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.aliasName = aliasName;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      aliasName: this.aliasName,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  
  static fromObject(obj: any) {
    return new Project(
      obj.id,
      obj.name,
      obj.aliasName,
      obj.description,
      obj.createdAt,
      obj.updatedAt
    );
  }
}

const emptyProject: Partial<Project> = {
  id: null,
  name: "",
  aliasName: "",
  description: "",
  createdAt: null,
  updatedAt: null,
};

export const emptyProjectTyped: Project = emptyProject as Project;

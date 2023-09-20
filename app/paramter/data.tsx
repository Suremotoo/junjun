const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CNNAME", uid: "cnName", sortable: true },
  { name: "APINAME", uid: "apiName", sortable: true },
  { name: "PARAMTYPE", uid: "paramType" },
  { name: "ISREQUIRED", uid: "isRequired" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "ACTIONS", uid: "actions" },
];

enum ParamTypeEnum {
  String = "String",
  Integer = "Integer",
  Number = "Number",
  Boolean = "Boolean",
  Date = "Date",
  Other = "Other",
}
interface ParamTypeOption {
  color:
    | "success"
    | "warning"
    | "default"
    | "primary"
    | "secondary"
    | "danger"
    | undefined;
}
const paramTypeOptions = new Map<string, ParamTypeOption>();
paramTypeOptions.set(ParamTypeEnum.String, { color: "primary" });
paramTypeOptions.set(ParamTypeEnum.Integer, { color: "warning" });
paramTypeOptions.set(ParamTypeEnum.Number, { color: "success" });
paramTypeOptions.set(ParamTypeEnum.Boolean, { color: "secondary" });
paramTypeOptions.set(ParamTypeEnum.Date, { color: "danger" });
paramTypeOptions.set(ParamTypeEnum.Other, { color: "default" });

export { columns, ParamTypeEnum, paramTypeOptions };

export enum OperationType {
  Create = "CREATE",
  Delete = "DELETE",
  Update = "UPDATE",
  Retrieve = "RETRIEVE",
}

export interface FormComponentProps {
  refreshList: (isFreshList: boolean) => void;
  operationType: OperationType;
  primaryKey?: string;
  onCloseForm?: () => void;
  cacheList?: any[];
}


export interface SkeletonFormProps {
  isLoaded: boolean;
  numberOfControls: number;
  className?: string | undefined;
}
export interface IExcelPreviewProps {
  headerNames: string[];
  data: any[];
  downloadData?: any[];
  exportFileName?: string;
  isSimple?: boolean;
  isBeauty?: boolean;
  getDataSimple: (isSimple: boolean) => void;
  beautifyFun: (beauty: boolean) => void;
}

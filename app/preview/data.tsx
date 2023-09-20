
// const requiredParams: ParamBean[] = [
//   new ParamBean("id", "编号"),
//   new ParamBean("name", "姓名"),
//   new ParamBean("idCard", "身份证号"),
// ];

import { TestCaseMsg } from "@/components/excel/TestCaseMsg";

// const optionalParams: ParamBean[] = [
//   new ParamBean("hobby", "爱好"),
//   new ParamBean("skill", "特长"),
// ];

// const simple: boolean = false;
// const allTestCases: TestCase[] = generateTestCases(
//   requiredParams,
//   optionalParams,
//   simple,
//   "请求成功！"
// );

const headerNames = ["Case Id", "Case Steps", "Expected Results"];
const testCaseMsg = new TestCaseMsg(
  "必填且正确填写",
  "非必填且填写",
  "非必填且不填写",
  "不可为空"
);
export { headerNames, testCaseMsg };

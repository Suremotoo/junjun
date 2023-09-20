import { ParamBean } from "./ParamBean";
import { TestCase } from "./TestCase";
import { TestCaseMsg } from "./TestCaseMsg";

export function generateRequireTestCases(
  requiredParams: ParamBean[],
  simple: boolean
): ParamBean[][] {
  const maxSize = requiredParams.length;
  const subsets: ParamBean[][] = generateSubsets(requiredParams);
  let sorted = subsets.sort((o1, o2) => o2.length - o1.length);
  if (simple) {
    sorted = sorted.filter((sl) => sl.length >= maxSize - 1);
  }
  return sorted;
}

export function generateOptionalTestCases(
  optionalParams: ParamBean[]
): ParamBean[][] {
  const subsets = generateSubsets(optionalParams);
  return subsets.sort((o1, o2) => o2.length - o1.length);
}

function generateSubsets(nums: ParamBean[]): ParamBean[][] {
  const subsets: ParamBean[][] = [];
  generate(nums, 0, [], subsets);
  return subsets;
}

function generate(
  nums: ParamBean[],
  index: number,
  currentSubset: ParamBean[],
  subsets: ParamBean[][]
) {
  subsets.push([...currentSubset]);

  for (let i = index; i < nums.length; i++) {
    currentSubset.push(nums[i]);
    generate(nums, i + 1, currentSubset, subsets);
    currentSubset.pop();
  }
}

export function generateTestCases(
  requiredParams: ParamBean[],
  optionalParams: ParamBean[],
  simple: boolean,
  successMsg: string,
  testCaseMsg: TestCaseMsg
): TestCase[] {
  const list: TestCase[] = [];
  const requireTestCases: ParamBean[][] = generateRequireTestCases(
    requiredParams,
    simple
  );
  const optionalTestCases: ParamBean[][] =
    generateOptionalTestCases(optionalParams);
  let i: number = 1;

  if (requireTestCases.length > 0) {
    const allRequire: ParamBean[] = requireTestCases[0];

    optionalTestCases.forEach((subList) => {
      const missingParamBean: ParamBean[] = optionalParams.filter(
        (paramBean) => !subList.includes(paramBean)
      );
      const testCase: TestCase = new TestCase(
        (i++).toString(),
        successMsg,
        testCaseMsg,
        allRequire,
        subList,
        [],
        missingParamBean
      );
      list.push(testCase);
    });
  }

  if (requireTestCases.length > 1) {
    const optionalAll: ParamBean[] =
      optionalTestCases.length === 0 ? [] : optionalTestCases[0];
    requireTestCases.slice(1).forEach((subList) => {
      const missingParamBean: ParamBean[] = requiredParams.filter(
        (paramBean) => !subList.includes(paramBean)
      );
      const testCase: TestCase = new TestCase(
        (i++).toString(),
        "",
        testCaseMsg,
        subList,
        optionalAll,
        missingParamBean,
        []
      );
      list.push(testCase);
    });
  }

  return list;
}

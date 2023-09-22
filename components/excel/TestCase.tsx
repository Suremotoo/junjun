import { Chip } from "@nextui-org/react";
import { ParamBean } from "./ParamBean";
import { TestCaseMsg } from "./TestCaseMsg";
import { CheckIcon } from "../icons";

export class TestCase {
  private caseId: string;

  private caseSteps: string;

  private expectedResults: string;

  private showKey: boolean = false;

  private testCaseMsg: TestCaseMsg;

  private requireParamList: ParamBean[];

  private optionalParamList: ParamBean[];

  private missingParamList: ParamBean[];

  private missingOptionalParamList: ParamBean[];

  private caseStepsReactNode: JSX.Element[] = [];

  private expectedResultsReactNode: JSX.Element[] = [];

  constructor(
    caseId: string,
    expectedResults: string,
    testCaseMsg: TestCaseMsg,
    requireParamList: ParamBean[],
    optionalParamList: ParamBean[],
    missingParamList: ParamBean[],
    missingOptionalParamList: ParamBean[]
  ) {
    this.caseId = caseId;
    this.testCaseMsg = testCaseMsg;
    this.expectedResults = expectedResults;
    this.requireParamList = requireParamList;
    this.optionalParamList = optionalParamList;
    this.missingParamList = missingParamList;
    this.missingOptionalParamList = missingOptionalParamList;
    this.generateCaseSteps();
    this.generateExpectedResults();
  }

  private generateCaseSteps(): void {
    if (this.requireParamList != null && this.optionalParamList != null) {
      let builder: string[] = [];
      this.requireParamList.forEach((paramBean) => {
        if (this.showKey) {
          builder.push(paramBean.getId() + ":");
        }
        builder.push(paramBean.getName());
        // builder.push(", 必填且正确填写;");
        builder.push(",");
        builder.push(this.testCaseMsg.requiredAndValid);
        builder.push(";");
        builder.push("\n");

        // jsx
        this.caseStepsReactNode.push(
          <Chip
            startContent={<CheckIcon size={18} />}
            variant="flat"
            color="primary"
          >
            {paramBean.getName()}
          </Chip>
        );

        this.caseStepsReactNode.push(
          <Chip variant="bordered" color="success">
            {this.testCaseMsg.requiredAndValid}
          </Chip>
        );
        this.caseStepsReactNode.push(<br />);
      });

      this.optionalParamList.forEach((paramBean) => {
        if (this.showKey) {
          builder.push(paramBean.getId() + ":");
        }
        builder.push(paramBean.getName());
        // builder.push(", 非必填且填写;");
        builder.push(",");
        builder.push(this.testCaseMsg.optionalAndFilled);
        builder.push(";");
        builder.push("\n");

        this.caseStepsReactNode.push(
          <Chip
            startContent={<CheckIcon size={18} />}
            variant="faded"
            color="default"
          >
            {paramBean.getName()}
          </Chip>
        );

        this.caseStepsReactNode.push(
          <Chip variant="bordered" color="success">
            {this.testCaseMsg.optionalAndFilled}
          </Chip>
        );
        this.caseStepsReactNode.push(<br />);
      });
      builder.push("\n");
      this.missingOptionalParamList.forEach((paramBean) => {
        if (this.showKey) {
          builder.push(paramBean.getId() + ":");
        }
        builder.push(paramBean.getName());
        // builder.push(" ,非必填且不填写;");
        builder.push(",");
        builder.push(this.testCaseMsg.optionalAndEmpty);
        builder.push(";");
        builder.push("\n");
        this.caseStepsReactNode.push(
          <Chip
            startContent={<CheckIcon size={18} />}
            variant="faded"
            color="default"
          >
            {paramBean.getName()}
          </Chip>
        );

        this.caseStepsReactNode.push(
          <Chip variant="bordered" color="warning">
            {this.testCaseMsg.optionalAndEmpty}
          </Chip>
        );
        this.caseStepsReactNode.push(<br />);
      });
      this.caseSteps = builder.join("");
    }
    this.generateExpectedResults();
  }

  private generateExpectedResults(): void {
    if (this.missingParamList != null && this.missingParamList.length > 0) {
      let builder: string[] = [];
      let reactNodeBuilder: JSX.Element[] = [];
      this.missingParamList.forEach((paramBean) => {
        if (this.showKey) {
          builder.push(paramBean.getId() + ":");
        }
        // builder.push(paramBean.getName() + " 不可为空; ");
        builder.push(paramBean.getName() + " " + this.testCaseMsg.notNullable);
        builder.push(";");
        builder.push("\n");
        reactNodeBuilder.push(
          <Chip
            startContent={<CheckIcon size={18} />}
            variant="faded"
            color="primary"
          >
            {paramBean.getName()}
          </Chip>
        );
        reactNodeBuilder.push(
          <Chip
            startContent={<CheckIcon size={18} />}
            variant="faded"
            color="danger"
          >
            {this.testCaseMsg.notNullable}
          </Chip>
        );
        ;
        reactNodeBuilder.push(<br />);
        this.expectedResultsReactNode = reactNodeBuilder
      });
      this.expectedResults = builder.join("");
    }
  }

  setTestCaseMsg(testCaseMsg: TestCaseMsg): void {
    this.testCaseMsg = testCaseMsg;
  }

  getTestCaseMsg(): TestCaseMsg {
    return this.testCaseMsg;
  }

  getCaseId(): string {
    return this.caseId;
  }

  getCaseSteps(): string {
    return this.caseSteps;
  }

  getExpectedResults(): string {
    return this.expectedResults;
  }

  getCaseStepsReactNode(): JSX.Element[] {
    return this.caseStepsReactNode;
  }

  getExpectedResultsReactNode(): JSX.Element[] {
    if (this.expectedResultsReactNode.length <= 0) {
      this.expectedResultsReactNode.push(
        <Chip
          startContent={<CheckIcon size={18} />}
          variant="faded"
          color="success"
        >
          {this.expectedResults}
        </Chip>
      );
    }
    return this.expectedResultsReactNode;
  }
}

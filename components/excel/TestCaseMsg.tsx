export class TestCaseMsg {
  // 必填且正确填写
  requiredAndValid: string;

  // 非必填且填写
  optionalAndFilled: string;

  // 非必填且不填写
  optionalAndEmpty: string;

  // 不可为空
  notNullable: string;

  constructor(
    requiredAndValid: string,
    optionalAndFilled: string,
    optionalAndEmpty: string,
    notNullable: string
  ) {
    this.requiredAndValid = requiredAndValid;
    this.optionalAndFilled = optionalAndFilled;
    this.optionalAndEmpty = optionalAndEmpty;
    this.notNullable = notNullable;
  }
}

// const validForm = new TestCaseMsg("RequiredValue", "OptionalValue", undefined, "NotNullableValue");


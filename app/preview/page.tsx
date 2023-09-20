"use client";

import PreviewExcelPage from "@/components/excel/previewExcel";
import { useEffect, useState } from "react";
import { mockSleep } from "@/components/utils";
import { TestCase } from "@/components/excel/TestCase";
import Loading from "../loading";
import { useSearchParams } from "next/navigation";
import { getParamsByApiId } from "@/lib/api-paramter";
import { Parameter } from "@/models/Paramter";
import { ParamBean } from "@/components/excel/ParamBean";
import { generateTestCases } from "@/components/excel/ExcelAPI";
import { headerNames, testCaseMsg } from "./data";

export default function ExcelPreviewPage() {
  const searchParams = useSearchParams();
  const searchApiId = searchParams.get("apiId");

  const [excelData, setExcelData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [isSimple, setIsSimple] = useState(true);
  const [isBeauty, setIsBeauty] = useState(true);

  function changeSimple(simple: boolean) {
    setIsSimple(simple);
  }
  function changeBeauty(beauty: boolean) {
    setIsBeauty(beauty);
  }

  useEffect(() => {
    (async () => {
      setExcelData([]);
      // mock sleep
      // await mockSleep();
      console.log("searchApiId", searchApiId);
      if (searchApiId && searchApiId !== "") {
        const params = await getParamsByApiId(searchApiId);
        const allTestCase = fetchExcelJSONData(params);
        setDownloadData(downloadDataArray(allTestCase));
        setExcelData(showDataArray(allTestCase));
      }
    })();
  }, [isSimple, isBeauty]);

  useEffect(() => {
    console.log("isSimple changed", isSimple);
  }, [isSimple, isBeauty]);

  function showDataArray(allTestCases: TestCase[]) {
    const showData = allTestCases.map((testCase: TestCase) => ({
      caseId: testCase.getCaseId(),
      caseSteps: testCase.getCaseStepsReactNode(),
      expectedResults: testCase.getExpectedResultsReactNode(),
    }));
    return showData;
  }

  function downloadDataArray(allTestCases: TestCase[]) {
    const downData = allTestCases.map((testCase: TestCase) => ({
      caseId: testCase.getCaseId(),
      caseSteps: testCase.getCaseSteps(),
      expectedResults: testCase.getExpectedResults(),
    }));
    return downData;
  }

  function fetchExcelJSONData(params: Parameter[]) {
    const requiredParams: ParamBean[] = [];
    const optionalParams: ParamBean[] = [];
    params.forEach((param: Parameter) => {
      if (param.isRequired) {
        requiredParams.push(new ParamBean(param.id.toString(), param.name));
      } else {
        optionalParams.push(new ParamBean(param.id.toString(), param.name));
      }
    });

    const allTestCases = generateTestCases(
      requiredParams,
      optionalParams,
      isSimple,
      "请求成功！",
      testCaseMsg
    );
    return allTestCases;
  }

  return (
    <div className="wrapper">
      {searchApiId && searchApiId !== "" ? (
        excelData.length > 0 ? (
          <PreviewExcelPage
            headerNames={headerNames}
            data={isBeauty ? excelData : downloadData}
            downloadData={downloadData}
            exportFileName="Test Cases"
            getDataSimple={changeSimple}
            isSimple={isSimple}
            isBeauty={isBeauty}
            beautifyFun={changeBeauty}
          />
        ) : (
          <Loading />
        )
      ) : (
        <PreviewExcelPage
          headerNames={headerNames}
          data={[]}
          downloadData={[]}
          exportFileName="Test Cases"
          getDataSimple={changeSimple}
          isSimple={isSimple}
          isBeauty={false}
          beautifyFun={changeBeauty}
        />
      )}
    </div>
  );
}

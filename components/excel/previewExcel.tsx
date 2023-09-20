"use client";

import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { randomString } from "@/components/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Switch,
} from "@nextui-org/react";

import {
  DetailsLessIcon,
  DetailsMoreIcon,
  DownloadIcon,
  PanoramaHorizontalIcon,
  PanoramaVerticalIcon,
} from "../icons";

import { IExcelPreviewProps } from "./IntefaceExcel";

export default function PreviewExcelPage({
  headerNames,
  data,
  downloadData,
  exportFileName,
  getDataSimple,
  isSimple,
  isBeauty,
  beautifyFun,
}: IExcelPreviewProps) {
  const [isCompact, setIsCompact] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [downloadExcelData, setDownloadExcelData] = useState([]);
  const [isDownloaded, setIsDownloaded] = useState(true);

  useEffect(() => {
    setExcelData(data);
    setDownloadExcelData(downloadData);
  }, []);

  function compacChange(compact: boolean) {
    if (compact) {
      setExcelData(downloadData);
    } else {
      setExcelData(dataCache);
    }
    setIsCompact(compact);
  }

  const handleDownload = () => {
    setIsDownloaded(false);
    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(downloadExcelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet_1");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [headerNames]);

    XLSX.writeFile(
      workbook,
      exportFileName
        ? exportFileName + new Date().getTime() + ".xlsx"
        : randomString() + ".xlsx",
      {
        compression: true,
      }
    );
    setIsDownloaded(true);
  };

  const generateColumns = useCallback(
    (headerNames: Array<string>) => {
      const columnJSX = [];
      for (let i = 0; i < headerNames.length; i++) {
        columnJSX.push(
          <TableColumn key={randomString()}>{headerNames[i]}</TableColumn>
        );
      }
      return columnJSX;
    },
    [headerNames]
  );

  function generateCells(rowObj: object): Array<any> {
    const tableCellJSX: Array<JSX.Element> = [];
    console.log("render cell rowObj: ", rowObj);
    if (rowObj) {
      Object.keys(rowObj).forEach((key) => {
        tableCellJSX.push(
          <TableCell key={randomString()}>
            {/* {!isCompact && !isBeauty && stringContainsLinebreak(rowObj[key]) ? (
              <>{linbreakString(rowObj[key])}</>
            ) : (
              <div className="whitespace-break-spaces">{rowObj[key]}</div>
            )} */}
            <div className="whitespace-break-spaces">{rowObj[key]}</div>
          </TableCell>
        );
      });
    }

    return tableCellJSX;
  }

  const generateRows = useCallback(
    (datas: Array<object>) => {
      const tableRowJSX = [];
      for (let i = 0; i < datas.length; i++) {
        tableRowJSX.push(
          <TableRow key={"SkeletonTableRow_" + randomString()}>
            {generateCells(datas[i])}
          </TableRow>
        );
      }
      console.log("render row: ", tableRowJSX);
      return tableRowJSX;
    },
    [excelData, isCompact, isBeauty]
  );

  const stringContainsLinebreak = (str) => {
    return /\n|<br>/.test(str);
  };

  const linbreakString = (str) => {
    const strArr = str.replace(/^\n+|\n+$/g, "").split("\n");
    return strArr.map((item) => {
      return (
        <>
          {item}
          <br />
        </>
      );
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <Button
          onPress={handleDownload}
          // className="bg-foreground text-background"
          startContent={isDownloaded && <DownloadIcon />}
          size="md"
          variant="shadow"
          color="primary"
          spinner={
            !isDownloaded && (
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            )
          }
        >
          Download
        </Button>
        <Button
          onPress={() => {
            getDataSimple(!isSimple);
          }}
          // className="bg-foreground text-background"
          startContent={isSimple ? <DetailsMoreIcon /> : <DetailsLessIcon />}
          size="md"
          variant="shadow"
          color="primary"
        >
          {isSimple ? "Change to Full" : "Change to Simple"}
        </Button>

        {/* <Button
          onPress={() => compacChange(!isCompact)}
          // className="bg-foreground text-background"
          startContent={
            isCompact ? <PanoramaHorizontalIcon /> : <PanoramaVerticalIcon />
          }
          size="md"
          variant="shadow"
          color="primary"
        >
          {isCompact ? "Complex" : "Compact"}
        </Button> */}

        <Switch
          isSelected={isBeauty}
          onValueChange={(isSelected) => {
            beautifyFun(isSelected);
          }}
        >
          Beauty Table
        </Switch>
      </div>
      {/* <Divider className="my-4" /> */}
      {/* {excelData.length > 0 ? (
        <Table
          selectionMode="multiple"
          aria-label="excel collection table"
          classNames={{
            wrapper: "max-h-[682px]",
          }}
          shadow="md"
          isHeaderSticky
          color="primary"
        >
          <TableHeader columns={headerNames}>
            {generateColumns(headerNames)}
          </TableHeader>
          <TableBody items={excelData} emptyContent="No rows to display.">
            {generateRows(excelData)}
          </TableBody>
        </Table>
      ) : (
        <Loading />
      )} */}

      <Table
        selectionMode="multiple"
        aria-label="excel collection table"
        classNames={{
          wrapper: "max-h-[682px]",
        }}
        shadow="md"
        isHeaderSticky
        color="primary"
      >
        <TableHeader columns={headerNames}>
          {generateColumns(headerNames)}
        </TableHeader>
        <TableBody items={excelData} emptyContent="No rows to display.">
          {generateRows(excelData)}
        </TableBody>
      </Table>
    </>
  );
}

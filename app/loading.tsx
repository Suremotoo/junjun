"use client";

import { randomString } from "@/components/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@nextui-org/react";

export default function Loading() {
  function generateColumns(columnNums: number) {
    const columnJSX = [];
    for (let i = 0; i < columnNums; i++) {
      columnJSX.push(
        <TableColumn key={randomString()}>
          <Skeleton
            isLoaded={false}
            className="h-3 w-3/5 rounded-lg"
            key={"SkeletonTableHeader_" + randomString()}
          />
        </TableColumn>
      );
    }
    return columnJSX;
  }

  function generateCells(columnNums: number) {
    const tableCellJSX = [];
    for (let j = 0; j < columnNums; j++) {
      tableCellJSX.push(
        <TableCell key={randomString()}>
          <Skeleton
            isLoaded={false}
            className="h-3 w-3/5 rounded-lg"
            key={"SkeletonTableCell_" + randomString()}
          />
        </TableCell>
      );
    }
    return tableCellJSX;
  }

  function generateRows(rowNums: number, columnNums: number) {
    const tableRowJSX = [];
    for (let i = 0; i < rowNums; i++) {
      tableRowJSX.push(
        <TableRow key={"SkeletonTableRow_" + randomString()}>
          {generateCells(columnNums)}
        </TableRow>
      );
    }
    return tableRowJSX;
  }

  return (
    <>
      <Table aria-label="static collection table">
        <TableHeader>{generateColumns(4)}</TableHeader>
        <TableBody>{generateRows(5, 4)}</TableBody>
      </Table>
    </>
  );
}

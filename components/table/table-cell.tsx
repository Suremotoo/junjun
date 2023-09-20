"use client";

import { Dispatch, SetStateAction } from "react";



export interface SortDescriptor {
  column: string | React.Key;
  direction: "ascending" | "desc";
}

export interface TableProps {
  renderCell: React.ReactNode;
  headerColumns: (typeof Array<string>)[number];
  bottomContent: React.ReactNode;
  topContent: React.ReactNode;
  sortedItems: any,
  selectedKeys: (typeof Array<string>)[number];
  sortDescriptor: SortDescriptor;
  setSelectedKeys: Dispatch<SetStateAction<Set<never>>>;
  setSortDescriptor: Dispatch<SetStateAction<SortDescriptor>>;
}

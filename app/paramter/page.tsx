"use client";
import { useState, useMemo, useCallback, useEffect } from "react";

import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User as UserUIComponent,
  Pagination,
  Tooltip,
  CircularProgress,
} from "@nextui-org/react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { DeleteIcon } from "../../components/deleteIcon";
import { SearchIcon } from "../../components/searchIcon";
import { ChevronDownIcon } from "../../components/chevronDownIcon";
import { columns, paramTypeOptions } from "./data";
import {
  capitalize,
  getColorForElement,
  mockSleep,
} from "../../components/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import AddParamter from "./add-param";
import { OperationType } from "@/models/crud";
import { EditIcon } from "@/components/editIcon";

import { getApis } from "@/lib/api-api";
import { Api } from "@/models/Api";
import { getParams, deleteParam } from "@/lib/api-paramter";
import { Parameter } from "@/models/Paramter";
import { useSearchParams, useRouter } from "next/navigation";

const MySwal = withReactContent(Swal);

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "cnName",
  "apiName",
  "paramType",
  "isRequired",
  "actions",
];

export default function ParamterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchApiId = searchParams.get("apiId");
  console.log("searchApiId==>", Number(searchApiId));

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [apiList, setApiList] = useState([]);

  const [refreshNum, setRefreshNum] = useState(0);
  const apiMap = new Map();

  function updateList(isRefresh: boolean) {
    setRefreshNum(isRefresh ? refreshNum + 1 : refreshNum);
  }

  async function fetchedApiList() {
    const fetchedApiList = await getApis();
    const apiArray = fetchedApiList.map(Api.fromObject);
    console.log("api==>", apiArray);
    apiArray.forEach((api) => {
      apiMap.set(api.id, api);
    });
    setApiList(apiArray);
  }

  async function fetchData() {
    try {
      // await mockSleep();
      fetchedApiList();
      const fetchedData = await getParams();
      const list = fetchedData.map(Parameter.fromObject);
      console.log("paramter==>", list);
      list.forEach((param) => {
        const apiId = param.apiId;
        if (apiMap.has(apiId)) {
          param.api = apiMap.get(apiId);
        }
      });

      if (searchApiId && apiMap.has(Number(searchApiId))) {
        setFilterValue(apiMap.get(Number(searchApiId)).name);
        onSearchChange(apiMap.get(Number(searchApiId)).name);
      }

      setList(list);
      setPage(1);
      setLoading(false);
      return list;
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }
  useEffect(() => {
    fetchData();
    setPage(1);
  }, [refreshNum]);

  async function deleteInfo(id: string) {
    try {
      await deleteParam(id);
      setPage(1);
    } catch (error) {
      console.error("Error deleteParam project:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  const [showDetails, setShowDetails] = useState(null);

  // click EditIcon show add/edit form
  const handleShowDetails = (itemKey) => {
    setShowDetails(itemKey);
  };

  // close add/edit form
  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [apiFilter, setApiFilter] = useState("all");

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "paramType",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...list];

    if (hasSearchFilter) {
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          (item.api &&
            item.api.name.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }

    if (
      apiFilter !== "all" &&
      Array.from(apiFilter).length !== apiFilter.length
    ) {
      filteredData = filteredData.filter((item) =>
        Array.from(apiFilter).includes(item.apiId.toString())
      );
    }

    return filteredData;
  }, [list, filterValue, apiFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            aria-label="Search by name"
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => {
              onClear();
              router.replace("/paramter");
            }}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            {/* todo  */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  API
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Project Table Columns"
                closeOnSelect={false}
                selectedKeys={apiFilter}
                selectionMode="multiple"
                onSelectionChange={setApiFilter}
              >
                {apiList.map((api) => (
                  <DropdownItem key={api.id} className="capitalize">
                    {capitalize(api.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  aria-label="Table Columns Dropdown"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="column Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* add model */}
            <AddParamter
              refreshList={updateList}
              operationType={OperationType.Create}
              onCloseForm={() => {}}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-420 text-small" aria-label="total label">
            Total {list.length} datas
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              aria-label="page size"
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    apiFilter,
    visibleColumns,
    onRowsPerPageChange,
    list.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span
          className="w-[30%] text-small text-default-400"
          aria-label="selectedKeys-aria-label"
        >
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>

        {loading ? (
          // <CircularProgress label="Loading..." />
          <div className="hidden"></div>
        ) : (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        )}

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    loading,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  const renderCell = useCallback((item: Parameter, columnKey: string) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "nameBeautify":
        return (
          <UserUIComponent
            avatarProps={{
              radius: "lg",
              isBordered: true,
              getInitials: (name) => name.charAt(0),
              classNames: {
                // base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              },
              color: getColorForElement(),
            }}
            description={item.aliasName}
            name={cellValue}
          >
            {item.name}
          </UserUIComponent>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {cellValue ? cellValue : "🤷"}
            </p>
          </div>
        );
      case "cnName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {cellValue ? cellValue : "🤷"}
            </p>
          </div>
        );
      case "apiName":
        return (
          <Chip size="lg" variant="flat">
            {item.api && item.api.name}
          </Chip>
        );
      case "paramType":
        return (
          <Chip
            className="capitalize"
            size="lg"
            color={paramTypeOptions.get(item.paramType)?.color}
            variant="shadow"
          >
            {item.paramType}
          </Chip>
        );
      case "isRequired":
        return (
          <Chip
            className="capitalize"
            size="lg"
            // variant={item.isRequired ? "shadow" : "faded"}
            color={item.isRequired ? "danger" : "default"}
            variant="shadow"
          >
            {item.isRequired ? "true" : "false"}
          </Chip>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">
              {cellValue ? cellValue : "🤷"}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip> */}
            <Tooltip color="secondary" content="Edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                aria-label="editIcon-label"
              >
                <EditIcon
                  onClick={() => {
                    handleShowDetails(item.id);
                    console.log("handleShowDetails clicked", showDetails);
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                aria-label="deleteIcon-label"
              >
                <DeleteIcon
                  onClick={() => {
                    console.log("DeleteIcon", item.id);
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        console.log("DeleteIcon fire isConfirmed", item.id);
                        await deleteInfo(item.id);
                        MySwal.fire({
                          title: <p>Deleted!</p>,
                          icon: "success",
                          text: "Your file has been deleted.",
                          willClose: () => {
                            updateList(true);
                          },
                        });
                      }
                    });
                  }}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        aria-label="Projects Table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[482px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No data found"}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<CircularProgress aria-label="loadingContent" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={item.id + columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showDetails && (
        <AddParamter
          refreshList={updateList}
          operationType={OperationType.Update}
          primaryKey={showDetails}
          onCloseForm={handleCloseDetails}
        />
      )}
    </>
  );
}

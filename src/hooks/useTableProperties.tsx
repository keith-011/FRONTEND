import { useState, useMemo, useEffect } from "react";
import { maxTableRecord } from "../utils/Types";

type SortConfig<T> = {
  key: keyof T;
  direction: "asc" | "desc";
} | null;

const useTableProperties = <T extends { [key: string]: any }>(
  tableData: T[],
) => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(
    maxTableRecord[0],
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    setCurrentPage(tableData.length !== 0 ? 1 : 0);
  }, [tableData]);

  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);

  const totalPage = Math.ceil(tableData.length / entriesPerPage);

  const pageLastIndex = currentPage * entriesPerPage;
  const pageFirstIndex = pageLastIndex - entriesPerPage;

  const pagedData = tableData.slice(pageFirstIndex, pageLastIndex);

  const sortableTableData = useMemo(() => {
    let sortableData = [...pagedData];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] === null && b[sortConfig.key] === null) {
          return 0;
        }
        if (a[sortConfig.key] === null) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        if (b[sortConfig.key] === null) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [pagedData, sortConfig]);

  // Events
  const changePagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEntriesPerPage(Number(event.target.value));
  };

  const sortColumn = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return {
    sortableTableData,
    sortColumn,
    changePagination,
    setCurrentPage,
    totalPage,
    currentPage,
    recordPerPage: entriesPerPage,
  };
};

export default useTableProperties;

import SwapVertIcon from "@mui/icons-material/SwapVert";

interface Props {
  tableHeader: { id: string; headerName: string };
  onColumnClick: (key: any) => void;
}

const TableHeader: React.FC<Props> = ({
  onColumnClick: requestSort,
  tableHeader,
}) => {
  const isActionColumn = tableHeader.id === "action";
  return (
    <>
      <th
        // h-table-cell
        className={`px-6 py-4 text-left font-medium ${!isActionColumn && "hover:cursor-pointer"}`}
        onClick={
          !isActionColumn
            ? () => {
                requestSort(tableHeader.id);
              }
            : undefined
        }
      >
        <div
          className={`flex items-center gap-3 ${!isActionColumn ? "justify-between" : "justify-center"}`}
        >
          <span>{tableHeader.headerName}</span>
          {!isActionColumn && <SwapVertIcon />}
        </div>
      </th>
    </>
  );
};

export default TableHeader;

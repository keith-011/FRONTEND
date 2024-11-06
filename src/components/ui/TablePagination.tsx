import DoubleArrowIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

interface Props {
  currentPage: number;
  totalPage: number;
  tableData: { [key: string]: any }[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  recordPerPage: number;
}

const TablePagination: React.FC<Props> = ({
  currentPage,
  totalPage,
  tableData,
  setCurrentPage,
  recordPerPage,
}) => {
  const dataLength = tableData.length;
  const startIndex =
    currentPage !== 0 ? (currentPage - 1) * recordPerPage + 1 : 0;
  const endIndex = Math.min(currentPage * recordPerPage, dataLength);

  return (
    <>
      <div className="flex justify-center gap-3 max-md:flex-col max-md:self-center md:justify-between">
        <span>
          {`Showing ${startIndex} to
          ${endIndex}
          of ${dataLength} entries`}
        </span>
        <div className="flex justify-center">
          <div className="flex rounded bg-accent-50 outline outline-1 outline-accent-400">
            <button
              className="p-2"
              onClick={() => {
                1 < currentPage && setCurrentPage(currentPage - 1);
              }}
            >
              <DoubleArrowIcon className="text-forest-500" />
            </button>
            <span className="bg-forest-500 p-2 font-bold text-accent-50">
              {currentPage}
            </span>
            <button
              className="p-2"
              onClick={() => {
                totalPage > currentPage && setCurrentPage(currentPage + 1);
              }}
            >
              <DoubleArrowIcon className="rotate-180 text-forest-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePagination;

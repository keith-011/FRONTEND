interface Props {
  children: React.ReactNode;
}

const TableContainer: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="scrollable overflow-x-auto">{children}</div>
    </>
  );
};

export default TableContainer;

interface Props {
  children: React.ReactNode;
}

const Table: React.FC<Props> = ({ children }) => {
  return (
    <>
      {/* <div className="scrollable overflow-x-auto"> */}
      <table className="table min-w-full">{children}</table>
      {/* </div> */}
    </>
  );
};

export default Table;

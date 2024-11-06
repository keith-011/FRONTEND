interface Props {
  children: React.ReactNode;
}

const TableHead: React.FC<Props> = ({ children }) => {
  return (
    <>
      <thead>{children}</thead>
    </>
  );
};

export default TableHead;

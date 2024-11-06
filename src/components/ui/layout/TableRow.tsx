interface Props {
  colorIndex: number;
  children: React.ReactNode;
}

const TableRow: React.FC<Props> = ({ colorIndex, children }) => {
  return (
    <>
      <tr
        className={`${colorIndex % 2 == 0 ? "bg-accent-150" : "bg-accent-50"}`}
      >
        {children}
      </tr>
    </>
  );
};

export default TableRow;

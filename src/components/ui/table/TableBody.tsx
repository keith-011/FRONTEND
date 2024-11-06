interface Props {
  children: React.ReactNode;
}
const TableBody: React.FC<Props> = ({ children }) => {
  return <tbody className="table-body">{children}</tbody>;
};

export default TableBody;

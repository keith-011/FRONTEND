import { maxTableRecord } from "../../../utils/Types";

interface Props {
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TableRecordPerPage: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <label className="inline-block max-md:self-center">
        Show
        <select
          className="mx-1 px-1 outline outline-1 outline-accent-200"
          onChange={onChange}
        >
          {maxTableRecord.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        entries
      </label>
    </>
  );
};

export default TableRecordPerPage;

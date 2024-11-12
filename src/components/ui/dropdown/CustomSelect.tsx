import { UseFormRegisterReturn } from "react-hook-form";
import {
  DepartmentAndHeads,
  FormPlantillaList,
  SelectIdDescription,
} from "../../../utils/Types";

interface BaseProps {
  register: UseFormRegisterReturn;
  defaultNone?: boolean;
  typeOfData: "IdAndDescription" | "DepartmentsCategorized" | "Enum";
}

interface IdAndDescription extends BaseProps {
  typeOfData: "IdAndDescription";
  data: SelectIdDescription[] | FormPlantillaList[];
}

interface CategorizedDepartments extends BaseProps {
  typeOfData: "DepartmentsCategorized";
  data: DepartmentAndHeads[];
}

interface EnumElement extends BaseProps {
  typeOfData: "Enum";
  data: { description: string }[];
}

type FinalProps = IdAndDescription | CategorizedDepartments | EnumElement;

const CustomSelect: React.FC<FinalProps> = ({
  register,
  typeOfData,
  data,
  defaultNone = true,
}) => {
  return (
    <>
      <select
        {...register}
        className="text-ellipsis rounded border border-accent-200 bg-accent-50 px-3 py-4 outline-accent-200 focus:outline-accent-400"
      >
        {defaultNone && <option value="">None</option>}
        {typeOfData === "IdAndDescription" &&
          data.length > 0 &&
          data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.description}
            </option>
          ))}

        {typeOfData === "DepartmentsCategorized" &&
          data.length > 0 &&
          data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.department_head == null
                ? `${item.department} (No head)`
                : item.department}
            </option>
          ))}

        {typeOfData === "Enum" &&
          data.length > 0 &&
          data.map((item) => (
            <option key={item.description} value={item.description}>
              {item.description}
            </option>
          ))}
      </select>
    </>
  );
};
export default CustomSelect;

// interface Props {
//   register: UseFormRegisterReturn;
//   data: SelectIdDescription[];
// }
// const DefaultDropdown: React.FC<Props> = ({ register, data }) => {
//   return (
//     <>
//       {/* TO DO */}
//       <select
//         {...register}
//         className="text-ellipsis rounded border border-accent-200 bg-accent-50 px-3 py-4 outline-accent-200 focus:outline-accent-400"
//       >
//         <option value={"none"}>None</option>
//         {data.length > 0 &&
//           data.map((item) => (
//             <option key={item.id} value={item.id}>
//               {item.description}
//             </option>
//           ))}
//       </select>
//     </>
//   );
// };

// export default DefaultDropdown;

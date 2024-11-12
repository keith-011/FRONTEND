import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

interface WithImage {
  employeeNumberPCC: string;
  imagePath?: string;
  text: string;
}

type Props =
  | { defaultData: string | number; withImage?: never; isAction?: never }
  | { defaultData?: never; withImage: WithImage; isAction?: never }
  | { defaultData?: never; withImage?: never; isAction: boolean };

const TableData: React.FC<Props> = ({ defaultData, isAction, withImage }) => {
  return (
    <>
      <td className={`px-6 py-4 ${isAction ? "text-center" : ""}`}>
        {withImage && (
          <Link
            to={`/profile/${withImage.employeeNumberPCC}`}
            className="flex items-center gap-3"
          >
            {withImage.text != null && (
              <>
                <div className="max-h-8 min-h-8 min-w-8 max-w-8 shrink-0 overflow-hidden rounded-full">
                  <img
                    src={
                      withImage.imagePath
                        ? withImage.imagePath
                        : "/src/assets/images/Avatar.png"
                    }
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-forest-900">
                  {withImage.text}
                </span>
              </>
            )}
          </Link>
        )}
        {isAction && (
          <button>
            <MoreVertIcon />
          </button>
        )}
        {defaultData}
      </td>
    </>
  );
};

export default TableData;

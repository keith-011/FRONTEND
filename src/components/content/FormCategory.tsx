import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface Props {
  id: number;
  text: string;
  activeCategory: number | null;
  handleCategoryClick: (id: number) => void;
  children: React.ReactNode;
  isFieldError: boolean;
}

const FormCategory: React.FC<Props> = ({
  activeCategory,
  handleCategoryClick,
  id,
  text,
  children,
  isFieldError,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          key={id}
          type="button"
          className={`flex items-center justify-between text-accent-600 transition-colors ${!isFieldError && activeCategory === id && "text-forest-400"} ${isFieldError && "text-red-500"}`}
          onClick={() => handleCategoryClick(id)}
        >
          <div className="flex items-center gap-2">
            {!isFieldError ? (
              <HelpOutlineOutlinedIcon />
            ) : (
              <ErrorOutlineOutlinedIcon />
            )}
            <span className="text-left text-xl font-medium">{text}</span>
          </div>
          <div
            className={`transition-transform ${activeCategory === id && "rotate-90"}`}
          >
            <KeyboardArrowRightOutlinedIcon />
          </div>
        </button>
        <div
          className={`flex flex-col gap-4 ${activeCategory !== id ? "hidden" : ""}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default FormCategory;

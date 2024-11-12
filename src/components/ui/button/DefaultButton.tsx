import { SvgIconComponent } from "@mui/icons-material";
import { twMerge } from "tailwind-merge";

interface Props {
  text: string;
  Icon?: SvgIconComponent;
  className?: string;
  handleClick?: () => void;
  formId?: string;
  type?: "button" | "submit";
}

const DefaultButton: React.FC<Props> = ({
  text,
  className,
  Icon,
  handleClick: onClick,
  formId: id,
  type = "button",
}) => {
  return (
    <>
      <button
        type={type}
        form={id}
        className={twMerge(
          "flex grow justify-center gap-1 rounded px-3 py-2 font-medium text-accent-50 transition-colors",
          className,
        )}
        onClick={onClick}
      >
        {Icon && <Icon />}
        <span>{text}</span>
      </button>
    </>
  );
};

export default DefaultButton;

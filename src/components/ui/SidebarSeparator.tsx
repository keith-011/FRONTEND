import CircleIcon from "@mui/icons-material/Circle";

interface Props {
  text: string;
  isMobileScreen: boolean;
  isNavbarOpen: boolean;
}

const SidebarSeparator: React.FC<Props> = ({
  text,
  isMobileScreen,
  isNavbarOpen,
}) => {
  return (
    <>
      <li
        className={`my-2 flex items-center gap-2 pl-6 ${!isMobileScreen && !isNavbarOpen && "opacity-0 group-hover/separator:opacity-100"}`}
      >
        <CircleIcon className="text-forest-500" sx={{ fontSize: 5 }} />
        <span className="text-xs font-bold text-accent-100">{text}</span>
      </li>
    </>
  );
};

export default SidebarSeparator;

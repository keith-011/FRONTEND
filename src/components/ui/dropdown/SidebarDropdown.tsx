import { NavLink } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material";

import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

interface Props {
  Icon: SvgIconComponent;
  text: string;
  linkList: { link: string; text: string }[];
  height: string;
  id: number;
  updateActiveDropdown: (id: number | null) => void;
  activeId: number | null;
  isMobileScreen: boolean;
  isNavbarOpen: boolean;
}

const SidebarDropdown: React.FC<Props> = ({
  Icon,
  text,
  linkList,
  height,
  id,
  updateActiveDropdown,
  activeId,
  isMobileScreen,
  isNavbarOpen,
}) => {
  return (
    <>
      <li className="w-full px-4">
        <button
          className="flex w-full items-center justify-between py-3 text-accent-400 transition-colors hover:text-accent-150"
          onClick={() => {
            activeId === id
              ? updateActiveDropdown(null)
              : updateActiveDropdown(id);
          }}
        >
          <span className="flex items-center gap-4">
            <Icon fontSize="small" />
            <span className="text-nowrap text-sm font-medium">{text}</span>
          </span>

          <span
            className={`transition-transform ${activeId === id && "rotate-90"}`}
          >
            <KeyboardArrowRightOutlinedIcon />
          </span>
        </button>

        {/* Dropdown */}
        <div
          className={`transition-dropdown overflow-hidden rounded bg-accent-700 duration-500 ${!isMobileScreen && !isNavbarOpen && "hidden group-hover/separator:block"} ${activeId === id ? `${height} max-w-72 opacity-100` : "h-0 max-w-0 opacity-0"}`}
        >
          <ul className="flex flex-col gap-3 px-4 py-3">
            {linkList.map((item, index) => (
              <li key={index}>
                <NavLink
                  key={index}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium text-accent-400 ${isActive ? "text-forest-500" : "transition-colors hover:text-accent-150"}`
                  }
                >
                  <CircleIcon sx={{ fontSize: 6 }} />
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
};

export default SidebarDropdown;

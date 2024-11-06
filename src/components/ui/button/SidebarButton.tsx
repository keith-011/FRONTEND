import { NavLink } from "react-router-dom";

import { SvgIconComponent } from "@mui/icons-material";

interface Props {
  Icon: SvgIconComponent;
  text: string;
  link: string;
}

const SidebarButton: React.FC<Props> = ({ Icon, text, link }) => {
  return (
    <>
      <li className="w-full">
        <NavLink
          to={link}
          className={({ isActive }) =>
            `flex w-full items-center gap-4 px-4 py-3 transition-colors ${isActive ? "bg-accent-700 text-accent-150" : "text-accent-400 hover:text-accent-150"}`
          }
        >
          <Icon fontSize="small" />
          <span className="text-nowrap text-sm font-medium">{text}</span>
        </NavLink>
      </li>
    </>
  );
};

export default SidebarButton;

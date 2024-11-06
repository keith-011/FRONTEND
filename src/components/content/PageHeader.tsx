import { NavLink } from "react-router-dom";

import DefaultButton from "../../components/ui/button/DefaultButton";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";

interface BaseProps {
  header: string;
  breadcrumbs: { text: string; link: string }[];
  importFunction?: () => void;
  exportFunction?: () => void;
}

interface WithButton extends BaseProps {
  buttonText: string;
  buttonFunction: () => void;
}

interface WithoutButton extends BaseProps {
  buttonText?: never;
  buttonFunction?: never;
}

type Props = WithButton | WithoutButton;

const PageHeader: React.FC<Props> = ({
  header,
  breadcrumbs,
  importFunction,
  exportFunction,
  buttonText,
  buttonFunction,
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between max-md:gap-3 md:flex-row">
        <div>
          <h2 className="text-2xl font-medium">{header}</h2>
          <ul className="flex">
            {breadcrumbs.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "pointer-events-none" : ""
                  }
                >
                  {item.text}
                </NavLink>
                {index !== breadcrumbs.length - 1 && <span>&nbsp;/&nbsp;</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-start gap-3 md:flex-row md:items-center">
          <div className="flex gap-3">
            {/* Import Button */}
            {importFunction && (
              <DefaultButton
                text="Import"
                handleClick={importFunction}
                className="text-forest-800 outline outline-1 hover:bg-accent-50"
                Icon={FileDownloadIcon}
              />
            )}

            {/* Export Button */}
            {exportFunction && (
              <DefaultButton
                text="Export"
                handleClick={exportFunction}
                className="text-forest-900 outline outline-1 hover:bg-accent-50"
                Icon={FileUploadIcon}
              />
            )}
          </div>
          <div>
            {/* Functional Button */}
            {buttonText && (
              <DefaultButton
                text={buttonText}
                handleClick={buttonFunction}
                Icon={AddIcon}
                className="rounded-full bg-forest-800 text-accent-50 hover:bg-forest-900"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

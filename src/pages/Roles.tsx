import React, { useState } from "react";
import PageHeader from "../components/content/PageHeader";
import DefaultButton from "../components/ui/button/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import DraggableList from "../components/ui/Sorting/SortableRoles";
import SwitchButton from "../components/ui/button/SwitchButton"; // Import SwitchButton

const Roles: React.FC = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Roles & Permissions", link: "/roles" },
  ];

  const [roles, setRoles] = useState([
    "Super Administrator",
    "HR Staff",
    "Supervisor",
    "Registrar",
    "IT Support Staff",
    "Teaching Personnel",
    "Non-Teaching Personnel",
  ]);

  type ModuleKeys = "Employee" | "Profile" | "Documents" | "Departments" | "Roles & Permissions" | "Forms";

  const [moduleAccess, setModuleAccess] = useState<Record<ModuleKeys, boolean>>({
    Employee: false,
    Profile: false,
    Documents: false,
    Departments: false,
    "Roles & Permissions": false,
    Forms: false,
  });

  const handleSwitchChange = (module: ModuleKeys) => (checked: boolean) => {
    setModuleAccess((prevAccess) => ({
      ...prevAccess,
      [module]: checked,
    }));
  };

  return (
    <>
      <PageHeader header="Roles & Permissions" breadcrumbs={breadcrumbs} />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Roles Section */}
        <div className="flex flex-col basis-2/5 gap-4">
          {/* "Add Roles" Button */}
          <div className="flex-shrink-0">
            <DefaultButton
              text="Add Roles"
              Icon={AddIcon}
              className="rounded-md bg-forest-800 text-accent-50 hover:bg-forest-900 w-full"
            />
          </div>

          {/* Role List Container */}
          <div className="flex flex-col bg-accent-50 shadow max-h-[calc(100vh-200px)] overflow-auto">
            <DraggableList roles={roles} onRolesChange={setRoles} />
          </div>
        </div>

        {/* Right Column - Module Access & Permissions Section */}
        <div className="flex flex-col flex-grow md:basis-3/5 gap-4">
          <h1 className="text-accent-800 text-sm font-semibold">Module Access</h1>
          <div className="shadow">
            {Object.keys(moduleAccess).map((module) => (
              <div
                key={module}
                className="flex items-center border bg-accent-50 shadow justify-between flex-grow p-3"
              >
                <div className="text-accent-700 text-left font-semibold text-sm">{module}</div>
                <SwitchButton
                  checked={moduleAccess[module as ModuleKeys]} // Cast to ModuleKeys
                  onChange={handleSwitchChange(module as ModuleKeys)} // Cast to ModuleKeys
                />
              </div>
            ))}
          </div>
          <div className="shadow">
            {/* Header Row */}
            <div className="flex text-accent-800 bg-accent-50 text-left font-semibold text-sm p-3">
              <div className="flex-1 basis-1/4">Module Permission</div>
              <div className="flex-1 text-center">Create</div>
              <div className="flex-1 text-center">Edit</div>
              <div className="flex-1 text-center">Delete</div>
              <div className="flex-1 text-center">Import</div>
              <div className="flex-1 text-center">Export</div>
            </div>

            {/* Permissions */}
            <div className="text-sm">
              {["Employee", "Department", "Document", "Form"].map((module, index) => (
                <div
                  key={module}
                  className={`flex items-center justify-between p-3 border-b border-accent-200 ${
                    index % 2 === 0 ? "bg-accent-150" : "bg-accent-50"
                  }`}
                >
                  <div className="flex-1 basis-1/4 font-semibold text-accent-700">{module}</div>
                  {["Create", "Edit", "Delete", "Import", "Export"].map((permission) => (
                    <div key={permission} className="flex-1 text-center">
                      <input
                        type="checkbox"
                        className="accent-forest-500 text-accent-50"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roles;

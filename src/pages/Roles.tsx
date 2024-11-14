import PageHeader from "../components/content/PageHeader";
import DefaultButton from "../components/ui/button/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import SwitchButton from "../components/ui/button/SwitchButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Roles: React.FC = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Roles & Permissions", link: "/roles" },
  ];

  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "On" : "Off");
  };

  return (
    <>
      <PageHeader header="Roles & Permissions" breadcrumbs={breadcrumbs} />
      
      {/* Main Container */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Column - Roles Section */}
        <div className="flex flex-col flex-grow md:basis-2/5 gap-4">
          <DefaultButton
            text="Add Roles"
            Icon={AddIcon}
            className="rounded-md bg-forest-800 items-center text-accent-50 hover:bg-forest-900"
          />
          <div className="flex flex-col bg-accent-50 shadow">
            {[
              "Administrator",
              "CEO",
              "Manager",
              "Team Leader",
              "Accountant",
              "Web Developer",
              "Web Designer",
              "HR",
              "UI/UX",
              "SEO Analyst",
            ].map((role, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-left font-semibold p-3 transition-colors duration-200 border-l-4 hover:bg-accent-100 hover:border-forest-800 border-transparent group cursor-pointer"
              >
                <span
                  className={`flex-grow ${
                    index === 0 ? "text-forest-900" : "text-accent-700"
                  }`}
                >
                  {role}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="text-accent-500 hover:text-forest-800">
                    <EditIcon />
                  </button>
                  <button className="text-accent-500 hover:text-rose-600">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Module Access & Permissions Section */}
        <div className="flex flex-col flex-grow md:basis-3/5 gap-4">
          <h1 className="text-accent-800 text-sm font-semibold">Module Access</h1>
          <div className="shadow">
            {["Employee", "Holidays", "Leaves", "Events", "Chat", "Jobs"].map((module) => (
              <div key={module} className="flex items-center border bg-accent-50 shadow justify-between flex-grow p-3">
                <div className="text-accent-700 text-left font-semibold text-sm">
                  {module}
                </div>
                <SwitchButton onChange={handleSwitchChange} />
              </div>
            ))}
          </div>

          <div className="shadow">
            {/* Header Row */}
            <div className="flex text-accent-800 bg-accent-50 text-left font-semibold text-sm p-3">
              <div className="flex-1 basis-1/4">Module Permission</div>
              <div className="flex-1 text-center">Read</div>
              <div className="flex-1 text-center">Write</div>
              <div className="flex-1 text-center">Create</div>
              <div className="flex-1 text-center">Delete</div>
              <div className="flex-1 text-center">Import</div>
              <div className="flex-1 text-center">Export</div>
            </div>

            {/* Permissions */}
            <div className="text-sm">
              {["Employee", "Holidays", "Leaves", "Events"].map((module, index) => (
                <div
                  key={module}
                  className={`flex items-center justify-between p-3 border-b border-accent-200 ${
                    index % 2 === 0 ? "bg-accent-100" : "bg-accent-50"
                  }`}
                >
                  <div className="flex-1 basis-1/4 font-semibold text-accent-700">
                    {module}
                  </div>
                  {["Read", "Write", "Create", "Delete", "Import", "Export"].map((permission) => (
                    <div key={permission} className="flex-1 text-center">
                      <input type="checkbox" className="accent-forest-600 text-accent-50" />
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

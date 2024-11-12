import { EmployeeTable } from "../utils/Types";

import { useModalContext } from "../context/ModalContext";

import useTableProperties from "../hooks/useTableProperties";
import { useFetchData } from "../hooks/useFetchData";

import Table from "../components/ui/layout/Table";
import TableRow from "../components/ui/layout/TableRow";
import PageHeader from "../components/content/PageHeader";
import TableHeader from "../components/ui/table/TableHeader";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TablePagination from "../components/ui/TablePagination";
import TableData from "../components/ui/table/TableData";
import AddEmployee from "../components/modals/AddEmployee";
import TableHead from "../components/ui/table/TableHead";
import TableBody from "../components/ui/table/TableBody";
import TableContainer from "../components/ui/layout/TableContainer";

const Employee = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Employees", link: "/employees" },
  ];

  const tableHeader: {
    id: keyof EmployeeTable | "action";
    text: string;
  }[] = [
    { id: "employee_number_pcc", text: "Employee Number" },
    { id: "name", text: "Name" },
    { id: "email", text: "Email" },
    { id: "department", text: "Department" },
    { id: "designation", text: "Designation" },
    { id: "category", text: "Category" },
    { id: "status", text: "Status" },
    { id: "service_status", text: "Service Status" },
    { id: "joined_at", text: "Join Date" },
    { id: "action", text: "Action" },
  ];

  // const tableHeader = [
  //   { id: "employee_number", text: "Employee Number", width: "w-[10%]" },
  //   { id: "name", text: "Name", width: "w-[15%]" },
  //   { id: "email", text: "Email", width: "w-[10%]" },
  //   { id: "plantilla", text: "Designation (Plantilla)", width: "w-[20%]" },
  //   { id: "department", text: "Department", width: "w-[20%]" },
  //   { id: "designation", text: "Designation", width: "w-[20%]" },
  //   { id: "action", text: "Action", width: "w-[5%]" },
  // ];

  const { openModal, refreshParent } = useModalContext();

  const { tableData, isError, isLoading } = useFetchData<EmployeeTable>(
    "/v1/table/employees",
    refreshParent,
  );

  const {
    sortableTableData,
    sortColumn,
    changePagination,
    setCurrentPage,
    totalPage,
    currentPage,
    recordPerPage,
  } = useTableProperties(tableData);

  return (
    <>
      <PageHeader
        header="Employees"
        breadcrumbs={breadcrumbs}
        exportFunction={() => {
          // TO DO
        }}
        importFunction={() => {
          // TO DO
        }}
        buttonText="Add Employee"
        buttonFunction={() => {
          openModal({
            header: "Add Employee",
            subheading:
              "Add a new employee by entering the required information here",
            content: <AddEmployee />,
          });
        }}
      />

      {isError ? <p>An error ocurred.</p> : isLoading && <p>Loading...</p>}
      {!isLoading && !isError && (
        <>
          <div className="flex flex-col gap-3">
            <TableRecordPerPage onChange={changePagination} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow colorIndex={1}>
                    {tableHeader.map((item) => (
                      <TableHeader
                        key={item.id}
                        tableHeader={{
                          id: item.id,
                          headerName: item.text,
                        }}
                        onColumnClick={sortColumn}
                      />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortableTableData.map((item, index) => (
                    <TableRow key={index} colorIndex={index}>
                      <TableData defaultData={item.employee_number_pcc} />
                      <TableData
                        withImage={{
                          imagePath: item.image_path,
                          text: item.name,
                          employeeNumberPCC: item.employee_number_pcc,
                        }}
                      />
                      <TableData defaultData={item.email} />
                      <TableData defaultData={item.department} />
                      <TableData defaultData={item.designation} />
                      <TableData defaultData={item.category} />
                      <TableData defaultData={item.status} />
                      <TableData defaultData={item.service_status} />
                      <TableData
                        defaultData={
                          new Date(item.joined_at).toISOString().split("T")[0]
                        }
                      />
                      <TableData isAction={true} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              tableData={tableData}
              totalPage={totalPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              recordPerPage={recordPerPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Employee;

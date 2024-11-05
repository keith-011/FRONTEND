import { useModalContext } from "../context/ModalContext";
import { Link } from "react-router-dom";

import Table from "../../Shared/components/ui/layout/Table";
import TableRow from "../../Shared/components/ui/layout/TableRow";

import PageHeader from "../components/content/PageHeader";
import TableHeader from "../components/ui/table/TableHeader";
import TableRecordPerPage from "../components/ui/TableRecordPerPage";
import TablePagination from "../components/ui/TablePagination";
import TableData from "../components/ui/table/TableData";

import useTableProperties from "../../hooks/useTableProperties";

import AddEmployee from "../components/modals/AddEmployee";
import { useFetchData } from "../../hooks/useFetchData";
import { EmployeeTable } from "../../utils/Types";
import TableHead from "../components/ui/table/TableHead";
import TableBody from "../components/ui/table/TableBody";
import TableContainer from "../../Shared/components/ui/layout/TableContainer";

const Employee = () => {
  const breadcrumbs = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Employees", link: "/employees" },
  ];

  const tableHeader = [
    { id: "employee_number", text: "Employee Number", width: "w-[10%]" },
    { id: "name", text: "Name", width: "w-[15%]" },
    { id: "email", text: "Email", width: "w-[10%]" },
    { id: "plantilla", text: "Designation (Plantilla)", width: "w-[20%]" },
    { id: "department", text: "Department", width: "w-[20%]" },
    { id: "designation", text: "Designation", width: "w-[20%]" },
    { id: "action", text: "Action", width: "w-[5%]" },
  ];

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

      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>An error occurred.</p>}
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
                          width: item.width,
                        }}
                        onColumnClick={sortColumn}
                      />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortableTableData.map((item, index) => (
                    <TableRow key={index} colorIndex={index}>
                      <TableData defaultData={item.employee_number} />
                        <TableData
                          withImage={{
                            imagePath: item.image_path,
                            text: item.name,
                            employeeNumberPCC: item.employee_number
                          }}
                        />
                      <TableData defaultData={item.email} />
                      <TableData defaultData={item.plantilla} />
                      <TableData defaultData={item.department} />
                      <TableData defaultData={item.designation} />
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

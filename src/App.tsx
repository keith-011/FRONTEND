import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import DashboardLayout from "./HRIS/layouts/DashboardLayout";

import Login from "./HRIS/pages/Login";
import Forgot from "./HRIS/pages/Forgot";
import Dashboard from "./HRIS/pages/Dashboard";
import Employee from "./HRIS/pages/Employee";
import Department from "./HRIS/pages/Department";
import Division from "./HRIS/pages/Division";
import Profile from "./HRIS/pages/Profile";
import TestingTable from "./HRIS/pages/TestingTable";
import TestingVersion2 from "./HRIS/pages/TestingVersion2";

axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="forgot" element={<Forgot />} />

      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<TestingTable />} />
        <Route path="employees" element={<Employee />} />
        <Route path="departments" element={<Department />} />
        <Route path="divisions" element={<Division />} />

        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="testing" element={<TestingTable />} />
      <Route path="testingNext" element={<TestingVersion2 />} />
    </Route>,
  ),
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={1500}
        position="top-center"
        transition={Slide}
        limit={3}
        closeOnClick={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </>
  );
};

export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Department from "./pages/Department";
import ProfileLayout from "./layouts/ProfileLayout";
import TestingTable from "./pages/TestingTable";
import TestingVersion2 from "./pages/TestingVersion2";
import Profile from "./pages/Profile";
import ProfileDocuments from "./pages/ProfileDocuments";
import ProfileHistory from "./pages/ProfileHistory";

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

        <Route path="profile/:employeeNumberPCC" element={<ProfileLayout />}>
          <Route path="" element={<Profile />} />
          <Route path="documents" element={<ProfileDocuments />} />
          <Route path="history" element={<ProfileHistory />} />
        </Route>
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

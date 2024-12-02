import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PCCImage from "/PCC.jpg";
import PCCLogo from "/PCCLogo.png";

import { LoginSchema, LoginSchemaType } from "../schema/LoginSchema";

import { ToastHandleAxiosCatch } from "../utils/ToastFunctions";

import LoginTextbox from "../components/ui/textbox/LoginTextbox";
import DefaultButton from "../components/ui/button/DefaultButton";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { employeeNumber: "", password: "" },
  });

  const onFormSubmit = handleSubmit(async (data) => {
    try {
      const accessToken = await axios.post("/v1/auth/login", data, {
        withCredentials: true,
      });

      localStorage.setItem("token", accessToken.data);

      // setAccessToken(accessToken.data);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      ToastHandleAxiosCatch(error);
    }
  });

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] p-6">
        <div className="flex max-w-[686px] overflow-hidden rounded-lg bg-accent-50">
          <div className="w-1/2 max-lg:hidden">
            <img
              src={PCCImage}
              alt="pcc"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center p-6 lg:w-1/2">
            <img src={PCCLogo} alt="pcc_logo" className="w-[100px] pb-2" />

            <h2 className="pb-6 text-2xl font-medium">PCC - HRIS Module</h2>
            <form className="mb-3 flex flex-col gap-5" onSubmit={onFormSubmit}>
              <div className="flex flex-col gap-1">
                <LoginTextbox
                  type="text"
                  register={register("employeeNumber")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <LoginTextbox type="password" register={register("password")} />
                {(errors.employeeNumber?.message ||
                  errors.password?.message) && (
                  <p className="text-sm text-red-400">
                    {errors.employeeNumber?.message || errors.password?.message}
                  </p>
                )}
              </div>

              <NavLink
                to="forgot"
                className="self-start text-sm hover:underline"
              >
                Forgot Password?
              </NavLink>

              <DefaultButton
                text="Sign In"
                type="submit"
                className="bg-forest-800 hover:bg-forest-900"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

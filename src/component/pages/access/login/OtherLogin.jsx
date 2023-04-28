import { Form, Formik } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import { InputText } from "../../../helpers/FormInputs";
import { devApiUrl, devNavUrl } from "../../../helpers/functions-general";
import ModalError from "../../../partials/modals/ModalError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import FbsLogoLg from "../../../svg/FbsLogoLg";
import useOtherIsLogin from "../../../custom-hooks/useOtherIsLogin";
import ModalSuccess from "../../../partials/modals/ModalSuccess";

const OtherLogin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const { loginLoading } = useOtherIsLogin(navigate);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const initVal = {
    user_other_email: "",
    password: "",
  };

  const yupSchema = Yup.object({
    user_other_email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required"),
  });

  return (
    <>
      {loginLoading ? (
        <TableSpinner />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ transform: "translateY(clamp(5rem,12vw,15rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center">
              <FbsLogoLg />
            </div>
            <h3 className="my-2 text-lg font-bold text-center text-primary">
              ONLINE PAYROLL SYSTEM
            </h3>
            <p className="mt-8 mb-5 text-lg font-bold">LOGIN</p>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                localStorage.removeItem("fbsPayroll");
                fetchData(
                  setLoading,
                  `${devApiUrl}/v1/user-others/login`,
                  values, // form data values
                  null, // result set data
                  "", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  false, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  navigate, // navigate default value
                  "post"
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative mb-6">
                      <InputText
                        label="Email"
                        type="text"
                        name="user_other_email"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Password"
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        disabled={
                          loading || props.values.user_other_email === ""
                        }
                      />
                      {props.values.password && (
                        <span
                          className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer"
                          onClick={togglePassword}
                        >
                          {passwordShown ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading ? <ButtonSpinner /> : "Login"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <p className="mt-5">
              Did you forget your password?{" "}
              <a
                href={`${devNavUrl}/forgot-password`}
                className="w-full text-primary"
              >
                <u> Forgot password</u>
              </a>
            </p>
          </div>
        </div>
      )}

      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default OtherLogin;

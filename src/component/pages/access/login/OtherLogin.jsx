import { Form, Formik } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import { InputText } from "../../../helpers/FormInputs";
import { devNavUrl } from "../../../helpers/functions-general";
import ModalError from "../../../partials/modals/ModalError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import FbsLogoLg from "../../../svg/FbsLogoLg";
import useSystemIsLogin from "../../../custom-hooks/useSystemIsLogin";

const OtherLogin = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const { loginLoading } = useSystemIsLogin(navigate);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const initVal = {
    employee_email: "",
    password: "",
  };

  const yupSchema = Yup.object({
    employee_email: Yup.string().required("Required").email("Invalid email"),
    password: Yup.string().required("Required"),
  });

  return (
    <>
      {loginLoading ? (
        <TableSpinner />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ transform: "translateY(clamp(5rem,17vw,22rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center">
              <FbsLogoLg />
            </div>
            <h3 className="my-5 text-lg font-bold">LOGIN</h3>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                localStorage.removeItem("hrisv3token");
                fetchData(
                  setLoading,
                  `/v1/user-others/login`,
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
                        name="employee_email"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Password"
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        disabled={loading || props.values.employee_email === ""}
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
              <Link
                to={`${devNavUrl}/forgot-password`}
                className="w-full text-primary"
              >
                <u> Forgot password</u>
              </Link>
            </p>
          </div>
        </div>
      )}

      {store.error && <ModalError />}
    </>
  );
};

export default OtherLogin;

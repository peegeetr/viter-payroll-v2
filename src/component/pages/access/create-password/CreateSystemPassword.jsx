import { Form, Formik } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import {
  setCreatePassSuccess,
  setStartIndex,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadKey from "../../../custom-hooks/useLoadKey";
import { fetchData } from "../../../helpers/fetchData";
import { InputText } from "../../../helpers/FormInputs";
import { devApiUrl, getUrlParam } from "../../../helpers/functions-general";
import PageNotFound from "../../../partials/PageNotFound";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import ContentSpinner from "../../../partials/spinners/ContentSpinner";
import FbsLogoLg from "../../../svg/FbsLogoLg";
import ModalError from "../../../partials/modals/ModalError";

const CreateSystemPassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [newPasswordShown, setNewPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const paramKey = getUrlParam().get("key");

  const { key, keyLoading } = useLoadKey(
    `${devApiUrl}/v1/user-systems/key/${paramKey}`,
    "get"
  );
  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const initVal = {
    new_password: "",
    confirm_password: "",
    key: paramKey,
    redirect_link: "/create-password-success?redirect=/system/login",
  };

  const yupSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[a-z]/, "At least one lowercase letter.")
      .matches(/[A-Z]/, "At least one uppercase letter.")
      .matches("(?=.*[@$!%*#?&])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });

  React.useEffect(() => {
    dispatch(setCreatePassSuccess(true));
  }, []);

  return (
    <>
      {keyLoading ? (
        <div className="relative h-screen">
          <ContentSpinner />
        </div>
      ) : key.length === 0 || paramKey === null || paramKey === "" ? (
        <div className="relative h-screen">
          <PageNotFound />
        </div>
      ) : (
        <div
          className="relative"
          style={{ transform: "translateY(clamp(5rem,5vw,15rem))" }}
        >
          <div className="flex justify-center items-center ">
            <div className="w-96 p-6">
              <div className="flex justify-center">
                <FbsLogoLg />
              </div>
              <h3 className="my-2 text-lg font-bold text-center text-primary">
                ONLINE PAYROLL SYSTEM
              </h3>
              <p className="mt-8 mb-5 text-lg font-bold">
                DEVOPS CREATE PASSWORD
              </p>
              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  fetchData(
                    setLoading,
                    `${devApiUrl}/v1/user-systems/password`,
                    values, // form data values
                    null, // result set data
                    "", // success msg
                    "", // additional error msg if needed
                    dispatch, // context api action
                    store, // context api state
                    true, // boolean to show success modal
                    false, // boolean to show load more functionality button
                    navigate, // navigate default value
                    "put"
                  );
                  dispatch(setStartIndex(0));
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <div className="relative mb-7">
                        <InputText
                          label="New password"
                          type={newPasswordShown ? "text" : "password"}
                          name="new_password"
                          disabled={loading}
                        />
                        {props.values.new_password && (
                          <span
                            className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer"
                            onClick={toggleNewPassword}
                          >
                            {newPasswordShown ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        )}
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          label="Confirm password"
                          type={confirmPasswordShown ? "text" : "password"}
                          name="confirm_password"
                          disabled={loading || props.values.new_password === ""}
                        />
                        {props.values.confirm_password && (
                          <span
                            className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer
                    "
                            onClick={toggleConfirmPassword}
                          >
                            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 pt-3">
                        <button
                          type="submit"
                          disabled={
                            loading ||
                            props.values.new_password === "" ||
                            props.values.confirm_password === ""
                          }
                          className="btn-modal-submit relative"
                        >
                          {loading ? <ButtonSpinner /> : "Save"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <h3 className="mt-5">Password must contain:</h3>
              <ul className="list-disc ml-5">
                <li className="text-xs italic">At least 8 characters</li>
                <li className="text-xs italic">
                  At least one lowercase letter
                </li>
                <li className="text-xs italic">
                  At least one uppercase letter
                </li>
                <li className="text-xs italic">
                  At least one special character
                </li>
                <li className="text-xs italic">At least one number</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default CreateSystemPassword;

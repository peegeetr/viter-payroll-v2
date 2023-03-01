import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  setForgotPassSuccess,
  setStartIndex,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import { InputText } from "../../../helpers/FormInputs";
import ModalError from "../../../partials/modals/ModalError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import FbsLogoLg from "../../../svg/FbsLogoLg";

const ForgotPassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const initVal = {
    user_system_email: "",
  };

  const yupSchema = Yup.object({
    user_system_email: Yup.string().required("Required"),
  });

  // console.log(setForgotPassSuccess(true));

  React.useEffect(() => {
    dispatch(setForgotPassSuccess(true));
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,17vw,22rem))" }}
      >
        <div className="w-96 p-6">
          <div className="flex justify-center">
            <FbsLogoLg />
          </div>
          <h3 className="my-5 text-lg font-bold">FORGOT PASSWORD</h3>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // console.log(values.user_system_email);
              fetchData(
                setLoading,
                `/v1/user-systems/reset`,
                values, // form data values
                null, // result set data
                "Please check your email to continue resetting password.", // success msg
                "Invalid email. Please use a registered one.", // additional error msg if needed
                dispatch, // context api action
                store, // context api state
                true, // boolean to show success modal
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
                  <div className="relative mb-4">
                    <InputText
                      label="Email"
                      type="text"
                      name="user_system_email"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-3">
                    <button
                      type="submit"
                      disabled={loading || !props.dirty}
                      className="btn-modal-submit relative"
                    >
                      {loading ? <ButtonSpinner /> : "Submit"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p className="mt-2">
            Go back to{" "}
            <button
              type="button"
              onClick={() => {
                navigate(-1);
                dispatch(setStartIndex(0));
              }}
            >
              <u>Login</u>
            </button>
          </p>
        </div>
      </div>

      {store.error && <ModalError />}
    </>
  );
};

export default ForgotPassword;
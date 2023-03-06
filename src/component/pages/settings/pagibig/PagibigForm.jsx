import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { setStartIndex } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import { InputText } from "../../../helpers/FormInputs.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner.jsx";

const PagibigForm = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const initVal = {};

  const yupSchema = Yup.object({});
  return (
    <>
      <div className=" py-5 w-full max-w-[420px]">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log();
            fetchData(
              setLoading,
              itemEdit
                ? `${devApiUrl}/v1/departments`
                : `${devApiUrl}/v1/departments`,
              values, // form data values
              null, // result set data
              itemEdit ? "Succesfully updated." : "Succesfully added.", // success msg
              "", // additional error msg if needed
              dispatch, // context api action
              store, // context api state
              true, // boolean to show success modal
              false, // boolean to show load more functionality button
              null,
              itemEdit ? "put" : "post" // method
            );
            dispatch(setStartIndex(0));
          }}
        >
          {(props) => {
            return (
              <Form>
                <div className="relative mb-5">
                  <InputText
                    label="EE Amount"
                    type="text"
                    name="department_name"
                    disabled={loading}
                  />
                </div>

                <div className="relative mb-5">
                  <InputText
                    label="ER Amount"
                    type="text"
                    name="department_name"
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center gap-1 pt-5 w-2/5 mx-auto">
                  <button
                    type="submit"
                    disabled={loading || !props.dirty}
                    className="btn-modal-submit relative"
                  >
                    {loading && <ButtonSpinner />}
                    Apply
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default PagibigForm;

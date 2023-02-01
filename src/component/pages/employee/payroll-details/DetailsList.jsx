import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { setStartIndex } from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import { InputSelect, MyCheckbox } from "../../../helpers/FormInputs.jsx";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner.jsx";

const DetailsList = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const initVal = {
    department_aid: "",
    department_name: "",
  };

  const yupSchema = Yup.object({
    department_name: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="w-full max-w-[420px]">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log();
            fetchData(
              setLoading,
              itemEdit ? `/v1/departments ` : "/v1/departments",
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
                <div className="relative mb-5 placeholder" data-label="Select">
                  <InputSelect
                    name="department_name"
                    //  disabled={!loading}
                    onFocus={(e) =>
                      e.target.parentElement.classList.add("focused")
                    }
                  >
                    <optgroup label="Select">
                      <option value="" disabled hidden></option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Vacation Leave">Vacation Leave</option>
                    </optgroup>
                  </InputSelect>
                </div>
                <div className="relative mb-5 placeholder" data-label="Select">
                  <InputSelect
                    name="department_name"
                    //  disabled={!loading}
                    onFocus={(e) =>
                      e.target.parentElement.classList.add("focused")
                    }
                  >
                    <optgroup label="Select">
                      <option value="" disabled hidden></option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Vacation Leave">Vacation Leave</option>
                    </optgroup>
                  </InputSelect>
                </div>
                <div className="relative mb-5">
                  <MyCheckbox
                    label="I agree"
                    id="I agree"
                    name="department_name"
                    type="checkbox"
                  />
                </div>
                <div className="relative mb-5">
                  <MyCheckbox
                    label="I agree"
                    id="I agree"
                    name="department_name"
                    type="checkbox"
                  />
                </div>

                <div className="flex items-center gap-1 pt-5 w-2/5 mx-auto">
                  <button
                    type="submit"
                    disabled={!loading || !props.dirty}
                    className="btn-modal-submit relative"
                  >
                    {!loading && <ButtonSpinner />}
                    Save
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

export default DetailsList;

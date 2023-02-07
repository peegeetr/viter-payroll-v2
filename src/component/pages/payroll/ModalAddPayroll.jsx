import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { fetchData } from "../../helpers/fetchData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../helpers/FormInputs";
import { devApiUrl } from "../../helpers/functions-general";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";

const ModalAddPayroll = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    paytype_aid: item ? item.paytype_aid : "",
    paytype_category: item ? item.paytype_category : "",
    paytype_name: item ? item.paytype_name : "",
    paytype_description: item ? item.paytype_description : "",

    paytype_name_old: item ? item.paytype_name : "",
  };

  const yupSchema = Yup.object({
    paytype_category: Yup.string().required("Required"),
    paytype_name: Yup.string().required("Required"),
    paytype_description: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Payroll
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                fetchData(
                  setLoading,
                  item
                    ? `${devApiUrl}/v1/paytype/${item.paytype_aid}`
                    : `${devApiUrl}/v1/paytype`,
                  values, // form data values
                  null, // result set data
                  item ? "Succesfully updated." : "Succesfully added.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null, // navigate default value
                  item ? "put" : "post"
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputSelect
                        label="Category"
                        name="paytype_category"
                        disabled={loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Category">
                          <option value="" hidden></option>
                          <option value="earnings">Earnings</option>
                          <option value="deductions">Deductions</option>
                        </optgroup>
                      </InputSelect>
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Name"
                        type="text"
                        name="paytype_name"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputTextArea
                        label="Description"
                        type="text"
                        name="paytype_description"
                        disabled={loading}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading ? <ButtonSpinner /> : item ? "Save" : "Add"}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddPayroll;

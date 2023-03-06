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
  MyCheckbox,
} from "../../helpers/FormInputs";
import { devApiUrl } from "../../helpers/functions-general";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";

const ModalAddHolidays = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    holidays_aid: item ? item.holidays_aid : "",
    holidays_name: item ? item.holidays_name : "",
    holidays_date: item ? item.holidays_date : "",
    holidays_type: item ? item.holidays_type : "",
    holidays_rate: item ? item.holidays_rate : "",
    holidays_observed: item ? (item.holidays_observed ? true : false) : "",

    holidays_name_old: item ? item.holidays_name : "",
    holidays_date_old: item ? item.holidays_date : "",
  };

  const yupSchema = Yup.object({
    holidays_name: Yup.string().required("Required"),
    holidays_date: Yup.string().required("Required"),
    holidays_type: Yup.string().required("Required"),
    holidays_rate: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Holiday
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
                console.log(values);
                fetchData(
                  setLoading,
                  item
                    ? `${devApiUrl}/v1/holidays/${item.holidays_aid}`
                    : `${devApiUrl}/v1/holidays`,
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
                    <div className="relative mb-5 mt-5">
                      <InputText
                        label="Holiday"
                        type="text"
                        name="holidays_name"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="holidays_date"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        name="holidays_type"
                        label="Type"
                        disabled={loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Type">
                          <option value="" disabled hidden></option>
                          <option value="special">Special Holiday</option>
                          <option value="regular">Regular Holiday</option>
                        </optgroup>
                      </InputSelect>
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Rate"
                        type="text"
                        name="holidays_rate"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5 grid grid-cols-[1fr_8fr] items-center justify-center ">
                      <MyCheckbox
                        type="checkbox"
                        name="holidays_observed"
                        disabled={loading}
                      />
                      <p className="mb-0">Is this holiday observed?</p>
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

export default ModalAddHolidays;

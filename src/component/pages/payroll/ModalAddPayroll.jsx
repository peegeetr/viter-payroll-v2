import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useLoadAll from "../../custom-hooks/useLoadAll";
import useLoadLastPayrollId from "../../custom-hooks/useLoadLastPayrollId";
import { fetchData } from "../../helpers/fetchData";
import { InputSelect, InputText } from "../../helpers/FormInputs";
import {
  consoleLog,
  devApiUrl,
  hrisDevApiUrl,
} from "../../helpers/functions-general";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";

const ModalAddPayroll = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const { result } = useLoadAll(`${hrisDevApiUrl}/v1/employees`, "get");

  const { lastId } = useLoadLastPayrollId(`${devApiUrl}/v1/payroll`, "get");
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    payroll_id: "",
    payroll_start_date: item ? item.payroll_start_date : "",
    payroll_end_date: item ? item.payroll_end_date : "",
    payroll_pay_date: item ? item.payroll_pay_date : "",
    payroll_earning_type: item ? item.payroll_earning_type : "",
  };

  const yupSchema = Yup.object({
    payroll_start_date: Yup.string().required("Required"),
    payroll_end_date: Yup.string().required("Required"),
    payroll_pay_date: Yup.string().required("Required"),
    payroll_earning_type: Yup.string().required("Required"),
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
                consoleLog(values);
                fetchData(
                  setLoading,
                  item
                    ? `${devApiUrl}/v1/payroll/${item.payroll_aid}`
                    : `${devApiUrl}/v1/payroll`,
                  { ...values, employee: result }, // form data values
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
                props.values.payroll_id = lastId;
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputSelect
                        label="Earning Type"
                        name="payroll_earning_type"
                        disabled={loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Earning Type">
                          <option value="" hidden></option>
                          <option value="salary">Salary</option>
                          <option value="bonuses">Bonuses</option>
                          <option value="13th month">13th month</option>
                        </optgroup>
                      </InputSelect>
                    </div>
                    <p className="text-primary ml-3 mb-3">Pay period</p>
                    <div className="relative mb-5">
                      <InputText
                        label="From"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="payroll_start_date"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="To"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="payroll_end_date"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Pay Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="payroll_pay_date"
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

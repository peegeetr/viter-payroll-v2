import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setIsRestore,
  setStartIndex,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import {
  InputSelect,
  InputText,
  InputTextArea,
  MyCheckbox,
} from "../../../helpers/FormInputs";
import { hrisDevApiUrl } from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditPayroll = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsRestore(false));
  };

  const initVal = {
    employee_aid: itemEdit ? itemEdit.employee_aid : "",
    employee_job_sss_deduc:
      itemEdit.employee_job_sss_deduc === 1 ? true : false,
    employee_job_pag_ibig_deduc:
      itemEdit.employee_job_pag_ibig_deduc === 1 ? true : false,
    employee_job_phil_health_deduc:
      itemEdit.employee_job_phil_health_deduc === 1 ? true : false,
    employee_job_work_reg_hol:
      itemEdit.employee_job_work_reg_hol === 1 ? true : false,
    employee_job_nd_per_day:
      itemEdit.employee_job_nd_per_day !== ""
        ? itemEdit.employee_job_nd_per_day
        : 0,
    employee_job_salary:
      itemEdit.employee_job_salary !== "" ? itemEdit.employee_job_salary : 0,
    employee_job_pay_freq:
      itemEdit.employee_job_pay_freq !== ""
        ? itemEdit.employee_job_pay_freq
        : "sm",
    employee_job_account_number:
      itemEdit.employee_job_account_number !== ""
        ? itemEdit.employee_job_account_number
        : 0,
    employee_job_starting_pay:
      itemEdit.employee_job_starting_pay !== ""
        ? itemEdit.employee_job_starting_pay
        : 0,
  };

  const yupSchema = Yup.object({});

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Job Details</h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>

          <div className="bg-white rounded-b-2xl overflow-hidden">
            <div className="max-h-[28rem] overflow-y-scroll p-4">
              <Formik
                initialValues={initVal}
                validationSchema={yupSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  console.log(values);
                  fetchData(
                    setLoading,
                    `${hrisDevApiUrl}/v1/employees/payroll/${itemEdit.employee_aid}`,
                    values, // form data values
                    null, // result set data
                    "Succesfully updated.", // success msg
                    "", // additional error msg if needed
                    dispatch, // context api action
                    store, // context api state
                    true, // boolean to show success modal
                    false, // boolean to show load more functionality button
                    null,
                    "put" // method
                  );
                  dispatch(setStartIndex(0));
                }}
              >
                {(props) => {
                  return (
                    <Form>
                      <div className="relative mb-3 pt-5 flex items-center">
                        <p className="w-1/2 m-0">With SSS deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_sss_deduc"
                            disabled={loading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">With Pag-IBIG deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_pag_ibig_deduc"
                            disabled={loading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">With PhilHealth deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_phil_health_deduc"
                            disabled={loading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">Work on regular holiday?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_work_reg_hol"
                            disabled={loading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center gap-2">
                        <p className="w-full m-0">
                          Night differential hours per day
                        </p>
                        <InputText
                          type="text"
                          name="employee_job_nd_per_day"
                          disabled={loading}
                        />
                      </div>

                      <div className="relative mb-3 flex items-center gap-2">
                        <p className="w-full m-0">Salary</p>
                        <InputText
                          type="text"
                          name="employee_job_salary"
                          disabled={loading}
                        />
                      </div>

                      <div className="relative mb-3 flex items-center gap-2">
                        <p className="w-full m-0">Pay frequency</p>
                        <InputSelect
                          name="employee_job_pay_freq"
                          disabled={loading}
                        >
                          <optgroup label="Pay frequency">
                            <option value="" hidden></option>
                            <option value="m">Monthly</option>
                            <option value="sm">Semi-Monthly</option>
                          </optgroup>
                        </InputSelect>
                      </div>

                      <div className="relative mb-3 flex items-center gap-2">
                        <p className="w-full m-0">Account number</p>
                        <InputText
                          type="text"
                          name="employee_job_account_number"
                          disabled={loading}
                        />
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Starting pay</p>
                        <InputText
                          type="text"
                          name="employee_job_starting_pay"
                          disabled={loading}
                        />
                      </div>

                      <div className="flex items-center gap-1 pt-5">
                        <button
                          type="submit"
                          disabled={loading || !props.dirty}
                          className="btn-modal-submit relative"
                        >
                          {loading ? <ButtonSpinner /> : "Save"}
                        </button>
                        <button
                          type="reset"
                          className="btn-modal-cancel"
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
      </div>
    </>
  );
};

export default ModalEditPayroll;

import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadAll from "../../../custom-hooks/useLoadAll";
import fetchApi from "../../../helpers/fetchApi";
import { fetchData } from "../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { devApiUrl, handleNumOnly } from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { validatePayPeriod } from "../../earnings/manage-list/function-manage-list";

const ModalAddManageDeduction = ({ payType, employee, payrollDraft }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [isAmount, setIsAmount] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");
  const [isInstallment, setIsInstallment] = React.useState("");
  const [numberInsti, setNumberInsti] = React.useState("");
  const [isStartDate, setIsStartDate] = React.useState("");
  const [isEndDate, setIsEndDate] = React.useState("");
  let payroll_start_date = payrollDraft[0].payroll_start_date;
  let payroll_end_date = payrollDraft[0].payroll_end_date;

  const { result, setResult } = useLoadAll(
    `${devApiUrl}/v1/paytype/${0}`,
    "get"
  );

  const handlePayType = async (e, props) => {
    let paytypeid = e.target.value;
    setLoading(true);
    const results = await fetchApi(`${devApiUrl}/v1/paytype/${paytypeid}`);
    if (results.data) {
      setLoading(false);
      setResult(results.data);
    }
  };

  const handleEmployee = async (e) => {
    // get employee id
    setEmployeeId(e.target.options[e.target.selectedIndex].id);
  };

  const handleIsInstallment = async (e) => {
    let categoryIsInstallment = e.target.value;
    // get employee id
    setIsInstallment(categoryIsInstallment);
    if (categoryIsInstallment === "0") {
      setNumberInsti("n/a");
      setIsStartDate("n/a");
      setIsEndDate("n/a");
    }
    if (categoryIsInstallment === "1") {
      setNumberInsti("1");
      setIsStartDate(payroll_start_date);
      setIsEndDate(payroll_end_date);
    }
    if (categoryIsInstallment === "2") {
      setNumberInsti("");
      setIsStartDate("");
      setIsEndDate("");
    }
  };

  const handleAmount = () => {
    setIsAmount(false);
  };

  const handleInstallment = () => {
    setIsAmount(true);
  };

  const handleClose = () => {
    // dispatch(setIsFinish(false));
    dispatch(setIsAdd(false));
  };

  const initVal = {
    payroll_employee: "",
    deduction_paytype_id: "",
    deduction_payitem_id: "",
    deduction_payroll_id: "",
    deduction_employee_id: "",
    deduction_frequency: "",
    deduction_amount: "",
    deduction_number_of_installment: "",
    deduction_start_pay_date: "",
    deduction_end_pay_date: "",
    is_installment: "",

    // if installment this will work
    amount: "",
    startDate: "",
    endDate: "",
    number_of_installment: "",
  };

  const yupSchema = Yup.object({
    payroll_employee: Yup.string().required("Required"),
    deduction_paytype_id: Yup.string().required("Required"),
    deduction_payitem_id: Yup.string().required("Required"),
    deduction_frequency: Yup.string().required("Required"),
    number_of_installment:
      isInstallment === "2" && Yup.string().required("Required"),
    startDate: isInstallment === "2" && Yup.string().required("Required"),
    endDate: isInstallment === "2" && Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    is_installment: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              Add Deducction :{payrollDraft[0].payroll_id}
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>

          <div className="bg-white rounded-b-2xl overflow-hidden">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log(values, payrollDraft[0].payroll_start_date);
                // payroll date validation
                if (validatePayPeriod(values, payrollDraft, dispatch)) {
                  return;
                }
                fetchData(
                  setLoading,
                  `${devApiUrl}/v1/deduction`,
                  { ...values, employee, payLeave }, // form data values
                  null, // result set data
                  "Succesfully added.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null, // navigate default value
                  "post"
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                props.values.deduction_employee_id = employeeId;
                props.values.deduction_amount = (
                  Number(props.values.amount) /
                  (props.values.deduction_number_of_installment === "n/a" ||
                  props.values.deduction_number_of_installment === ""
                    ? "1"
                    : Number(props.values.deduction_number_of_installment))
                ).toFixed(2);
                props.values.deduction_payroll_id =
                  payrollDraft.length && payrollDraft[0].payroll_id;
                props.values.deduction_number_of_installment =
                  numberInsti || props.values.number_of_installment;
                props.values.deduction_start_pay_date =
                  isStartDate || props.values.startDate;
                props.values.deduction_end_pay_date =
                  isEndDate || props.values.endDate;

                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-scroll p-4">
                      <div className="relative mb-5 mt-5">
                        <InputSelect
                          label="Employee"
                          name="payroll_employee"
                          disabled={loading}
                          onChange={handleEmployee}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Employee">
                            <option value="" hidden></option>
                            {employee.length > 0 ? (
                              <>
                                <option value="all" id="0">
                                  All
                                </option>
                                ;
                                {employee.map((employee, key) => {
                                  return (
                                    <option
                                      key={key}
                                      value={`${employee.employee_lname} ${employee.employee_fname}`}
                                      id={employee.employee_aid}
                                    >
                                      {`${employee.employee_lname}, ${employee.employee_fname}`}
                                    </option>
                                  );
                                })}
                              </>
                            ) : (
                              <option value="" hidden></option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5 ">
                        <InputSelect
                          name="deduction_paytype_id"
                          label="Pay Type"
                          disabled={loading}
                          onChange={handlePayType}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Pay Type">
                            <option value="" hidden></option>
                            {payType.length > 0 ? (
                              payType.map((paytype, key) => {
                                return (
                                  paytype.paytype_category === "deductions" && (
                                    <option
                                      key={key}
                                      value={paytype.paytype_aid}
                                    >
                                      {paytype.paytype_name}
                                    </option>
                                  )
                                );
                              })
                            ) : (
                              <option value="" hidden></option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5 ">
                        <InputSelect
                          label="Pay Item"
                          name="deduction_payitem_id"
                          disabled={loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Pay Item">
                            <option value="" hidden></option>
                            {result.length > 0 ? (
                              result.map((payitem, key) => {
                                return (
                                  <option key={key} value={payitem.payitem_aid}>
                                    {payitem.payitem_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="" hidden></option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5">
                        <InputSelect
                          name="deduction_frequency"
                          label="Frequency"
                          //  disabled={!loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Frequency">
                            <option value="" hidden></option>
                            <option value="sm">Semi-monthly</option>
                            <option value="m">Monthly</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          label="Amount"
                          type="text"
                          onKeyPress={handleNumOnly}
                          onFocus={(e) => handleAmount(e)}
                          onBlur={(e) => handleInstallment(e)}
                          name={!isAmount ? "amount" : "deduction_amount"}
                          disabled={loading}
                        />
                      </div>

                      <div className="relative mb-5 ">
                        <InputSelect
                          label={"Will be given"}
                          onChange={handleIsInstallment}
                          name="deduction_is_installment"
                          disabled={loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Will be given">
                            <option value="" hidden></option>
                            <option value="0">Every payroll</option>
                            <option value="1">One-time</option>
                            <option value="2">Installment</option>
                          </optgroup>
                        </InputSelect>
                      </div>

                      {isInstallment === "2" && (
                        <>
                          <div className="relative mb-5">
                            <InputText
                              label="No. of installment"
                              type="number"
                              onBlur={(e) => handleInstallment(e)}
                              min="2"
                              name="number_of_installment"
                              disabled={loading}
                            />
                          </div>
                          <div className="relative mb-5">
                            <InputText
                              label="Start Date"
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "date")}
                              name="startDate"
                              disabled={loading}
                            />
                          </div>
                          <div className="relative mb-5">
                            <InputText
                              label="End Date"
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "date")}
                              name="endDate"
                              disabled={loading}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 p-4 ">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading && <ButtonSpinner />}
                        Add
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

export default ModalAddManageDeduction;

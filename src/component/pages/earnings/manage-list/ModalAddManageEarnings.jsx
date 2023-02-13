import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setStartIndex,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadAll from "../../../custom-hooks/useLoadAll";
import useLoadPayLeave from "../../../custom-hooks/useLoadPayLeave";
import fetchApi from "../../../helpers/fetchApi";
import { fetchData } from "../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  consoleLog,
  devApiUrl,
  handleNumOnly,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  validateDataIsNotEmpty,
  validatePayPeriod,
} from "./function-manage-list";

const ModalAddManageEarnings = ({ payType, employee, payrollDraft }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [isAmount, setIsAmount] = React.useState(false);
  const [isHris, setIsHri] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [payItem, setPayItem] = React.useState("");
  const [isInstallment, setIsInstallment] = React.useState("");
  const [numberInsti, setNumberInsti] = React.useState("");
  const [isStartDate, setIsStartDate] = React.useState("");
  const [isEndDate, setIsEndDate] = React.useState("");
  let payroll_start_date = payrollDraft[0].payroll_start_date;
  let payroll_end_date = payrollDraft[0].payroll_end_date;
  let payroll_id = payrollDraft[0].payroll_id;

  const { payLeave } = useLoadPayLeave(
    `${hrisDevApiUrl}/v1/leaves/period/approved/${payroll_start_date}/${payroll_end_date}`,
    "get"
  );

  console.log(payLeave);

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

  const handlePayItem = async (e, props) => {
    let payitemid = e.target.value;
    setIsHri(e.target.options[e.target.selectedIndex].id);
    setLoading(true);

    const results = await fetchApi(`${devApiUrl}/v1/payitem/${payitemid}`);
    if (results.data) {
      setLoading(false);
      setPayItem(results.data);
      // if Data in HRIS is empty
      if (
        validateDataIsNotEmpty(results.data[0].payitem_aid, payLeave, dispatch)
      ) {
        return;
      }

      if (results.data[0].payitem_is_hris === 1) {
        setIsInstallment("3");
        setNumberInsti("1");
        setIsStartDate(payroll_start_date);
        setIsEndDate(payroll_end_date);
      }
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
    earnings_paytype_id: "",
    earnings_payitem_id: "",
    earnings_payroll_id: "",
    earnings_employee_id: "",
    earnings_frequency: "",
    earnings_amount: "",
    earnings_number_of_installment: "",
    earnings_start_pay_date: "",
    earnings_end_pay_date: "",
    is_installment: "",
    payitem_is_hris: "",

    // if installment this will work
    amount: "",
    startDate: "",
    endDate: "",
    number_of_installment: "",
  };

  const yupSchema = Yup.object({
    payroll_employee: Yup.string().required("Required"),
    earnings_paytype_id: Yup.string().required("Required"),
    earnings_payitem_id: Yup.string().required("Required"),
    earnings_frequency: Yup.string().required("Required"),
    number_of_installment:
      isInstallment === "2" && Yup.string().required("Required"),
    startDate: isInstallment === "2" && Yup.string().required("Required"),
    endDate: isInstallment === "2" && Yup.string().required("Required"),
    amount:
      payItem.length > 0 &&
      payItem[0].payitem_is_hris === 0 &&
      Yup.string().required("Required"),
    is_installment:
      payItem.length > 0 &&
      payItem[0].payitem_is_hris === 0 &&
      Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Add Earnings :{payroll_id}</h3>
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
                  `${devApiUrl}/v1/earnings`,
                  {
                    ...values,
                    employee: employee.length > 0 ? employee : 0,
                    payLeave: payLeave.length > 0 ? payLeave : 0,
                  }, // form data values
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
                props.values.payitem_is_hris = isHris;
                props.values.is_installment = isInstallment;
                props.values.earnings_employee_id = employeeId;
                props.values.earnings_amount = (
                  Number(props.values.amount) /
                  (props.values.earnings_number_of_installment === "n/a" ||
                  props.values.earnings_number_of_installment === ""
                    ? "1"
                    : Number(props.values.earnings_number_of_installment))
                ).toFixed(2);
                props.values.earnings_payroll_id =
                  payrollDraft.length && payrollDraft[0].payroll_id;
                props.values.earnings_number_of_installment =
                  numberInsti || props.values.number_of_installment;
                props.values.earnings_start_pay_date =
                  isStartDate || props.values.startDate;
                props.values.earnings_end_pay_date =
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
                          name="earnings_paytype_id"
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
                                  paytype.paytype_category === "earnings" && (
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
                          name="earnings_payitem_id"
                          onChange={handlePayItem}
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
                                  <option
                                    key={key}
                                    value={payitem.payitem_aid}
                                    id={payitem.payitem_is_hris}
                                  >
                                    {payitem.payitem_name}{" "}
                                    {payitem.payitem_is_hris === 1 && "(HRIS)"}
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
                          name="earnings_frequency"
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
                      {payItem.length > 0 &&
                      payItem[0].payitem_is_hris === 1 ? (
                        <p className="text-primary text-center">
                          Data will be imported from HRIS.
                        </p>
                      ) : (
                        <>
                          <div className="relative mb-5">
                            <InputText
                              label="Amount"
                              type="text"
                              onKeyPress={handleNumOnly}
                              onFocus={(e) => handleAmount(e)}
                              onBlur={(e) => handleInstallment(e)}
                              name={!isAmount ? "amount" : "earnings_amount"}
                              disabled={loading}
                            />
                          </div>

                          <div className="relative mb-5 ">
                            <InputSelect
                              label={"Will be given"}
                              onChange={handleIsInstallment}
                              name="is_installment"
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

export default ModalAddManageEarnings;

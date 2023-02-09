import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setStartIndex,
  setError,
  setMessage,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadAll from "../../../custom-hooks/useLoadAll";
import fetchApi from "../../../helpers/fetchApi";
import { fetchData } from "../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  consoleLog,
  devApiUrl,
  handleNumOnly,
} from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getDateLength } from "./function-manage-list";

const ModalAddManageEarnings = ({ item, payType, employee, draft }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [isAmount, setIsAmount] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");
  const [payItem, setPayItem] = React.useState("");
  const [isInstallmet, setIsInstallmet] = React.useState("");
  const [numberInsti, setNumberInsti] = React.useState("");
  const [isStartDate, setIsStartDate] = React.useState("");
  const [isEndDate, setIsEndDate] = React.useState("");
  let payid = item ? `/${item.earnings_paytype_id}` : `/${0}`;

  const { result, setResult } = useLoadAll(
    `${devApiUrl}/v1/paytype${payid}`,
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
    setLoading(true);
    const results = await fetchApi(`${devApiUrl}/v1/payitem/${payitemid}`);
    if (results.data) {
      setLoading(false);
      setPayItem(results.data);
    }
  };

  const handleEmployee = async (e) => {
    // get employee id
    setEmployeeId(e.target.options[e.target.selectedIndex].id);
  };

  const handleIsInstallment = async (e) => {
    let categoryIsInstallmet = e.target.value;
    // get employee id
    setIsInstallmet(categoryIsInstallmet);
    if (categoryIsInstallmet === "0") {
      setNumberInsti("n/a");
      setIsStartDate("n/a");
      setIsEndDate("n/a");
    }
    if (categoryIsInstallmet === "1") {
      setNumberInsti("1");
      setIsStartDate(draft.length && draft[0].payroll_start_date);
      setIsEndDate(draft.length && draft[0].payroll_end_date);
    }
    if (categoryIsInstallmet === "2") {
      setNumberInsti("");
      setIsStartDate("");
      setIsEndDate("");
    }
  };

  const handleAmount = () => {
    setIsAmount(true);
  };

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const initVal = {
    earnings_employee: item ? item.earnings_employee : "",
    earnings_paytype_id: item ? item.earnings_paytype_id : "",
    earnings_payitem_id: item ? item.earnings_payitem_id : "",
    earnings_payroll_id: "",
    earnings_employee_id: "",
    earnings_frequency: item ? item.earnings_frequency : "",
    earnings_amount: item ? item.earnings_amount : "",
    earnings_number_of_installment: item
      ? item.earnings_number_of_installment
      : "",
    earnings_start_pay_date: item ? item.earnings_start_pay_date : "",
    earnings_end_pay_date: item ? item.earnings_end_pay_date : "",
    earnings_is_installment: item ? item.earnings_is_installment : "",

    amount: item ? item.earnings_amount : "",
    startDate: item ? item.earnings_start_pay_date : "",
    endDate: item ? item.earnings_end_pay_date : "",
    number_of_installment: item ? item.earnings_number_of_installment : "",
  };

  const yupSchema = Yup.object({
    earnings_employee: Yup.string().required("Required"),
    earnings_paytype_id: Yup.string().required("Required"),
    earnings_payitem_id: Yup.string().required("Required"),
    earnings_frequency: Yup.string().required("Required"),
    number_of_installment:
      numberInsti === "2" && Yup.string().required("Required"),
    startDate: numberInsti === "2" && Yup.string().required("Required"),
    endDate: numberInsti === "2" && Yup.string().required("Required"),
    amount:
      ((payItem.length > 0 && payItem[0].payitem_is_hris === 0) ||
        (item && item.payitem_is_hris === 0)) &&
      Yup.string().required("Required"),
    earnings_is_installment:
      ((payItem.length > 0 && payItem[0].payitem_is_hris === 0) ||
        (item && item.payitem_is_hris === 0)) &&
      Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Earnings :
              {draft.length && draft[0].payroll_id}
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
                consoleLog(values, employee);
                if (
                  getDateLength(
                    values.earnings_start_pay_date,
                    values.earnings_end_pay_date,
                    draft[0].payroll_start_date,
                    draft[0].payroll_end_date
                  ) === false
                ) {
                  dispatch(setError(true));
                  dispatch(
                    setMessage(
                      "Start date and end date is not avilable for pay date."
                    )
                  );
                  return;
                }
                // get data from HRIS
                // if (
                //   getDateLength(
                //     values.earnings_start_pay_date,
                //     values.earnings_end_pay_date
                //   )
                // ) {
                //   // fetch data
                //   // filter data based on payroll period
                //   // set data filterd data to state and pass to server
                // }
                fetchData(
                  setLoading,
                  item
                    ? `${devApiUrl}/v1/earnings/${item.earnings_aid}`
                    : `${devApiUrl}/v1/earnings`,
                  { ...values, employee }, // form data values
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
                props.values.earnings_employee_id = employeeId;
                props.values.earnings_amount =
                  Number(props.values.amount) /
                  (props.values.earnings_number_of_installment === "n/a"
                    ? "1"
                    : Number(props.values.earnings_number_of_installment));
                props.values.earnings_payroll_id =
                  draft.length && draft[0].payroll_id;
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
                        {item ? (
                          <p>
                            <span className="text-primary">Employee: </span>
                            {item.earnings_employee}
                          </p>
                        ) : (
                          <InputSelect
                            label="Employee"
                            name="earnings_employee"
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
                        )}
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
                          onChange={handlePayItem}
                          name="earnings_payitem_id"
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
                      {(payItem.length > 0 &&
                        payItem[0].payitem_is_hris === 1) ||
                      (item && item.payitem_is_hris === 1) ? (
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
                              name={
                                isAmount === false
                                  ? "amount"
                                  : "earnings_amount"
                              }
                              disabled={loading}
                            />
                          </div>

                          <div className="relative mb-5 ">
                            <InputSelect
                              label={"Will be given"}
                              onChange={handleIsInstallment}
                              name="earnings_is_installment"
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

                          {isInstallmet === "2" && (
                            <>
                              <div className="relative mb-5">
                                <InputText
                                  label="No. of installment"
                                  type="number"
                                  onBlur={(e) => handleAmount(e)}
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
                        {item ? "Save" : "Add"}
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

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
import { consoleLog, devApiUrl } from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalAddManageEarnings = ({ item, payType, employee }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState("");
  const [payItem, setPayItem] = React.useState("");
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
      setPayItem([]);
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
  consoleLog(payItem, result);

  const handleEmployee = async (e) => {
    // get employee id
    setEmployeeId(e.target.options[e.target.selectedIndex].id);
  };

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const initVal = {
    earnings_employee: item ? item.earnings_employee : "",
    earnings_employee_id: "",
    earnings_paytype_id: item ? item.earnings_paytype_id : "",
    earnings_payitem_id: item ? item.earnings_payitem_id : "",
    earnings_amount: item ? item.earnings_amount : "",
    earnings_frequency: item ? item.earnings_frequency : "",
    earnings_number_of_installment: item
      ? item.earnings_number_of_installment
      : "",
    earnings_start_pay_date: item ? item.earnings_start_pay_date : "",
    earnings_end_pay_date: item ? item.earnings_end_pay_date : "",
  };

  const yupSchema = Yup.object({
    earnings_employee: Yup.string().required("Required"),
    earnings_paytype_id: Yup.string().required("Required"),
    earnings_payitem_id: Yup.string().required("Required"),
    earnings_amount: Yup.string().required("Required"),
    earnings_frequency: Yup.string().required("Required"),
    earnings_number_of_installment: Yup.string().required("Required"),
    earnings_start_pay_date: Yup.string().required("Required"),
    earnings_end_pay_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Earnings
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
                // fetchData(
                //   setLoading,
                //   item
                //     ? `${devApiUrl}/v1/earnings/${item.earnings_aid}`
                //     : `${devApiUrl}/v1/earnings`,
                //   { ...values, employee }, // form data values
                //   null, // result set data
                //   item ? "Succesfully updated." : "Succesfully added.", // success msg
                //   "", // additional error msg if needed
                //   dispatch, // context api action
                //   store, // context api state
                //   true, // boolean to show success modal
                //   false, // boolean to show load more functionality button
                //   null, // navigate default value
                //   item ? "put" : "post"
                // );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                props.values.earnings_employee_id = employeeId;
                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-scroll p-4">
                      <div className="relative mb-5 mt-2">
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

                      {(payItem.length > 0 &&
                        payItem[0].payitem_is_hris === 1) ||
                      (item && item.payitem_is_hris === 1) ? (
                        <p className="text-primary font-bold">
                          This will be import data from HRIS.
                        </p>
                      ) : (
                        <>
                          <div className="relative mb-5">
                            <InputText
                              label="Amount"
                              type="text"
                              name="earnings_amount"
                              disabled={loading}
                            />
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
                                <option value="SM">Semi-monthly</option>
                                <option value="M">Monthly</option>
                              </optgroup>
                            </InputSelect>
                          </div>
                          <div className="relative mb-5">
                            <InputText
                              label="No. of installment"
                              type="text"
                              name="earnings_number_of_installment"
                              disabled={loading}
                            />
                          </div>
                          <div className="relative mb-5">
                            <InputText
                              label="Start Date"
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "date")}
                              name="earnings_start_pay_date"
                              disabled={loading}
                            />
                          </div>
                          <div className="relative mb-5">
                            <InputText
                              label="End Date"
                              type="text"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => (e.target.type = "date")}
                              name="earnings_end_pay_date"
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

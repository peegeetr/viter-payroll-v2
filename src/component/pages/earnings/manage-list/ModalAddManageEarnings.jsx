import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../helpers/FormInputs";
import {
  everyPayrollNumber,
  installmentNumber,
  isHrisNumber,
  isMonthly,
  isSemiMonthly,
  onetimeNumber,
} from "../../../helpers/functions-earning-refference";
import {
  devApiUrl,
  handleNumOnly,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import {
  absencesId,
  deMinimisEarningsId,
  empContributionEarningsId,
  holidayId,
  leaveId,
  nightDiffId,
  overtimeId,
  undertimeId,
} from "../../../helpers/functions-payitemId";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  computeLeave,
  computeOvertime,
  computeUndertime,
  validateDataIsNotEmpty,
  validatePayPeriod,
} from "./function-manage-list";
import { payrollCategoryBonusId } from "../../../helpers/functions-payroll-category-id";

const ModalAddManageEarnings = ({
  payType,
  employee,
  payrollDraft,
  holidays,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loadingSel, setSelLoading] = React.useState(false);
  const [isAmount, setIsAmount] = React.useState(false);
  const [isHris, setIsHri] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [employeeName, setEmployeeName] = React.useState("");
  const [deatils, setDeatils] = React.useState("");
  const [payItem, setPayItem] = React.useState([]);
  const [isPayItem, setIsPayItem] = React.useState([]);
  const [isInstallment, setIsInstallment] = React.useState("");
  const [numberInsti, setNumberInsti] = React.useState("");
  const [isStartDate, setIsStartDate] = React.useState("");
  const [isEndDate, setIsEndDate] = React.useState("");
  let payroll_start_date = payrollDraft?.data[0].payroll_start_date;
  let payroll_end_date = payrollDraft?.data[0].payroll_end_date;
  let payroll_id = payrollDraft?.data[0].payroll_id;
  let payroll_type_id = payrollDraft?.data[0].payroll_category_type;
  // payrollCategoryBonusId
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${devApiUrl}/v1/earnings`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
      console.log(data);
      // show success box
      if (data.success) {
        const msg = `Successfuly added.`;
        // const msg =
        // data.added > 0
        //   ? `Successfuly added (${data.added}).`
        //   : "Records already added.";
        dispatch(setSuccess(true));
        dispatch(setMessage(msg));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  // use if not loadmore button undertime
  const { data: undertime } = useQueryData(
    `${hrisDevApiUrl}/v1/undertime/payroll/undertime/${payroll_start_date}/${payroll_end_date}`, // endpoint
    "get", // method
    "undertime", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button payLeave
  const { data: payLeave } = useQueryData(
    `${hrisDevApiUrl}/v1/leaves/payroll/leave/approved/${payroll_start_date}/${payroll_end_date}`, // endpoint
    "get", // method
    "payLeave", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button absences
  const { data: absences } = useQueryData(
    `${hrisDevApiUrl}/v1/leaves/payroll/absences/approved/${payroll_start_date}/${payroll_end_date}`, // endpoint
    "get", // method
    "absences", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button overtime
  const { data: overtime } = useQueryData(
    `${hrisDevApiUrl}/v1/tasks/payroll/overtime/approved/${payroll_start_date}/${payroll_end_date}`, // endpoint
    "get", // method
    "overtime", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  console.log(overtime);

  const handlePayType = async (e, props) => {
    let paytypeid = e.target.value;
    setSelLoading(true);
    const results = await queryData(`${devApiUrl}/v1/paytype/${paytypeid}`);
    if (results.data) {
      setSelLoading(false);
      setIsPayItem(results.data);
    }
  };
  const handlePayItem = async (e, props) => {
    let payitemid = e.target.value;
    setIsHri(e.target.options[e.target.selectedIndex].id);
    setSelLoading(true);

    const results = await queryData(`${devApiUrl}/v1/payitem/${payitemid}`);
    if (results.data) {
      setSelLoading(false);
      setPayItem(results.data);
      if (results.data[0].payitem_is_hris === 1) {
        setIsInstallment(isHrisNumber); // hris is installment value is 3
        setNumberInsti(onetimeNumber); // installment value is 1
        setEmployeeName("all");
        setEmployeeId("0");
        setDeatils("details");
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
      setNumberInsti(everyPayrollNumber); // installment value is 0 everypayroll
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
    earnings_payroll_type_id: payroll_type_id,
    earnings_employee_id: "",
    earnings_frequency: "",
    earnings_amount: "",
    earnings_number_of_installment: "",
    earnings_start_pay_date: "",
    earnings_end_pay_date: "",
    earnings_details: "",
    deatils: "",
    is_installment: "",
    payitem_is_hris: "",

    // if installment this will work
    amount: "",
    startDate: "",
    endDate: "",
    number_of_installment: "",
  };

  const yupSchema = Yup.object({
    payroll_employee:
      isInstallment !== isHrisNumber && Yup.string().required("Required"),
    earnings_paytype_id: Yup.string().required("Required"),
    earnings_payitem_id: Yup.string().required("Required"),
    earnings_frequency: Yup.string().required("Required"),
    deatils:
      isInstallment !== isHrisNumber && Yup.string().required("Required"),
    number_of_installment:
      isInstallment === installmentNumber && Yup.string().required("Required"),
    startDate:
      isInstallment === installmentNumber && Yup.string().required("Required"),
    endDate:
      isInstallment === installmentNumber && Yup.string().required("Required"),
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
                console.log(values);
                let computedLeav = [];
                let computedUndertime = [];
                let computedUnpaid = [];
                let computedOT = [];
                // payroll date validation if installment
                if (validatePayPeriod(values, payrollDraft, dispatch)) {
                  return;
                }
                // if Data in HRIS is empty
                if (
                  validateDataIsNotEmpty(
                    payItem[0].payitem_aid,
                    payLeave,
                    absences,
                    overtime,
                    undertime,
                    dispatch
                  )
                ) {
                  return;
                }

                if (values.earnings_payitem_id === leaveId) {
                  // get computed leave amount
                  computedLeav = computeLeave(payLeave, employee, payrollDraft);
                }

                if (values.earnings_payitem_id === undertimeId) {
                  // get computed leave amount
                  computedUndertime = computeUndertime(
                    undertime,
                    employee,
                    payrollDraft
                  );
                }

                if (values.earnings_payitem_id === absencesId) {
                  // get computed leave amount
                  computedUnpaid = computeLeave(
                    absences,
                    employee,
                    payrollDraft
                  );
                }

                if (values.earnings_payitem_id === overtimeId) {
                  // get computed leave amount
                  computedOT = computeOvertime(
                    overtime,
                    employee,
                    payrollDraft,
                    holidays
                  );
                }

                // console.log("123", computedUnpaid, employee.data);
                mutation.mutate({
                  ...values,
                  employee: employee.data,
                  payLeave: computedLeav.length > 0 ? computedLeav : [],
                  unPaidLeave: computedUnpaid.length > 0 ? computedUnpaid : [],
                  overtimeLeave: computedOT.length > 0 ? computedOT : [],
                  undertime:
                    computedUndertime.length > 0 ? computedUndertime : [],
                  // payitemID
                  leaveId: leaveId,
                  absencesId: absencesId,
                  overtimeId: overtimeId,
                  undertimeId: undertimeId,
                });
              }}
            >
              {(props) => {
                props.values.earnings_employee =
                  employeeName || props.values.payroll_employee;
                props.values.payitem_is_hris = isHris;
                props.values.earnings_details = deatils || props.values.deatils;
                props.values.is_installment = isInstallment;
                props.values.earnings_employee_id = employeeId;
                props.values.earnings_amount =
                  Number(props.values.amount.replace(/[,]/g, "")) /
                  (props.values.earnings_number_of_installment === "0" ||
                  props.values.earnings_number_of_installment === ""
                    ? "1"
                    : Number(props.values.earnings_number_of_installment));
                // props.values.earnings_amount = (
                //   Number(props.values.amount.replace(/[,]/g, "").slice(2)) /
                //   (props.values.earnings_number_of_installment === "0" ||
                //   props.values.earnings_number_of_installment === ""
                //     ? "1"
                //     : Number(props.values.earnings_number_of_installment))
                // ).toFixed(2);
                props.values.earnings_payroll_id =
                  payrollDraft?.data[0].payroll_id;
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
                          name="earnings_paytype_id"
                          label="Pay Type"
                          disabled={mutation.isLoading}
                          onChange={handlePayType}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Pay Type">
                            <option value="" hidden></option>
                            {payType?.data.map((paytype, key) => {
                              return (
                                paytype.paytype_category === "earnings" &&
                                paytype.paytype_aid !==
                                  empContributionEarningsId &&
                                paytype.paytype_aid !== deMinimisEarningsId && (
                                  <option key={key} value={paytype.paytype_aid}>
                                    {paytype.paytype_name}
                                  </option>
                                )
                              );
                            })}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5 ">
                        <InputSelect
                          label="Pay Item"
                          name="earnings_payitem_id"
                          onChange={handlePayItem}
                          disabled={mutation.isLoading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Pay Item">
                            {loadingSel && <option value="">Loading...</option>}
                            <option value="" hidden></option>
                            {isPayItem?.map((payitem, key) => {
                              return (
                                payitem.payitem_aid !== Number(holidayId) &&
                                payitem.payitem_aid !== Number(nightDiffId) &&
                                payitem.payitem_is_active !== 0 && (
                                  <option
                                    key={key}
                                    value={payitem.payitem_aid}
                                    id={payitem.payitem_is_hris}
                                  >
                                    {payitem.payitem_name}{" "}
                                    {payitem.payitem_is_hris === 1 && "(HRIS)"}
                                  </option>
                                )
                              );
                            })}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5">
                        <InputSelect
                          name="earnings_frequency"
                          label="Frequency"
                          disabled={mutation.isLoading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Frequency">
                            <option value="" hidden></option>
                            <option value={isSemiMonthly}>Semi-monthly</option>
                            <option value={isMonthly}>Monthly</option>
                          </optgroup>
                        </InputSelect>
                      </div>

                      {payItem.length > 0 &&
                      payItem[0].payitem_is_hris === 1 ? (
                        <p className="text-primary text-center">
                          {`All Employee that have ${payItem[0].payitem_name} will be imported from HRIS.`}
                        </p>
                      ) : (
                        <>
                          <div className="relative mb-5 mt-5">
                            <InputSelect
                              label="Employee"
                              name="payroll_employee"
                              disabled={mutation.isLoading}
                              onChange={handleEmployee}
                              onFocus={(e) =>
                                e.target.parentElement.classList.add("focused")
                              }
                            >
                              <optgroup label="Employee">
                                <option value="" hidden></option>
                                <option value="all" id="0">
                                  All
                                </option>
                                {employee?.data.map((employee, key) => {
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
                              </optgroup>
                            </InputSelect>
                          </div>
                          {/* show amount text */}
                          <div className="relative mb-5">
                            <InputText
                              num="num"
                              label="Amount"
                              type="text"
                              onKeyPress={handleNumOnly}
                              onFocus={(e) => handleAmount(e)}
                              onBlur={(e) => handleInstallment(e)}
                              name={!isAmount ? "amount" : "earnings_amount"}
                              disabled={mutation.isLoading}
                            />
                          </div>
                          {/* show will be given select tag */}
                          <div className="relative mb-5 ">
                            <InputSelect
                              label={"Will be given"}
                              onChange={handleIsInstallment}
                              name="is_installment"
                              disabled={mutation.isLoading}
                              onFocus={(e) =>
                                e.target.parentElement.classList.add("focused")
                              }
                            >
                              <optgroup label="Will be given">
                                <option value="" hidden></option>
                                {/* <option value="0">Every payroll</option> */}
                                <option value="1">One-time</option>
                                {Number(payroll_type_id) !==
                                  payrollCategoryBonusId && (
                                  <option value="2">Installment</option>
                                )}
                              </optgroup>
                            </InputSelect>
                          </div>
                          <div className="relative mb-5 ">
                            <InputTextArea
                              label="Details"
                              name="deatils"
                              disabled={mutation.isLoading}
                            />
                          </div>

                          {/* show installment select tag */}
                          {isInstallment === "2" && (
                            <>
                              <div className="relative mb-5">
                                <InputText
                                  label="No. of installment"
                                  type="number"
                                  onBlur={(e) => handleInstallment(e)}
                                  min="2"
                                  name="number_of_installment"
                                  disabled={mutation.isLoading}
                                />
                              </div>
                              <div className="relative mb-5">
                                <InputText
                                  label="Start Date"
                                  type="text"
                                  onFocus={(e) => (e.target.type = "date")}
                                  onBlur={(e) => (e.target.type = "date")}
                                  name="startDate"
                                  disabled={mutation.isLoading}
                                />
                              </div>
                              <div className="relative mb-5">
                                <InputText
                                  label="End Date"
                                  type="text"
                                  onFocus={(e) => (e.target.type = "date")}
                                  onBlur={(e) => (e.target.type = "date")}
                                  name="endDate"
                                  disabled={mutation.isLoading}
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
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        Add
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
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

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
import { InputSelect } from "../../../helpers/FormInputs";
import {
  devApiUrl,
  formatDate,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import HolidayIsObserved from "./HolidayIsObserved";
import { getEmployeeDetails, getRateDate } from "./functions-exemptions";

const ModalAddHolidays = ({ item, isPayrollEmpty, employeeName }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isRate, setRate] = React.useState("");
  const [holidayId, setHolidayId] = React.useState(
    item ? item.holiday_exemption_holiday_id : ""
  );
  const [isObserved, setIsObserved] = React.useState(
    item ? item.holiday_exemption_is_observe : ""
  );
  const [isWorkOnHoliday, setIsWorkOnHoliday] = React.useState(
    item ? getEmployeeDetails(item, employeeName).isWorkOnHoliday : ""
  );
  let startDate = isPayrollEmpty?.data[0].payroll_start_date;
  let endDate = isPayrollEmpty?.data[0].payroll_end_date;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/holiday-exemptions/${item.holiday_exemption_aid}`
          : `${devApiUrl}/v1/holiday-exemptions`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["holiday-exemptions"] });
      // show success box
      if (data.success) {
        item && dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${item ? "updated." : "added."}`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  // use if not loadmore button undertime
  const { data: employeeId, isLoading: loadingEmployee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employeeId", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  // use if not loadmore button undertime
  const { data: holidayDate, isLoading } = useQueryData(
    `${devApiUrl}/v1/holidays/this-year/${startDate}/${endDate}`, // endpoint
    "get", // method
    "holidayDate" // key
  );
  const handleEmployee = async (e) => {
    // // get jobId id
    let workOnHoliday = e.target.options[e.target.selectedIndex].id;
    setIsWorkOnHoliday(workOnHoliday);
    if (workOnHoliday === "0" && (isRate === "130" || isRate === "260")) {
      setIsObserved("0");
    }
    if (
      workOnHoliday === "0" &&
      (isRate === "200" || isRate === "400" || isRate === "330")
    ) {
      setIsObserved("1");
    }
    if (
      item &&
      workOnHoliday === "0" &&
      (getRateDate(null, holidayDate, date) === "200" ||
        getRateDate(null, holidayDate, date) === "400" ||
        getRateDate(null, holidayDate, date) === "330")
    ) {
      setIsObserved("1");
    }
    if (workOnHoliday === "1" && isObserved !== "") {
      setIsObserved("0");
    }
  };

  const handleRateHoliday = async (e) => {
    // get employee id
    let date = e.target.value;
    let holidayAid = e.target.options[e.target.selectedIndex].id;
    setHolidayId(holidayAid);
    setRate(getRateDate(null, holidayDate, date));
    if (
      isWorkOnHoliday === "0" &&
      (getRateDate(null, holidayDate, date) === "130" ||
        getRateDate(null, holidayDate, date) === "260")
    ) {
      setIsObserved("0");
    }
    if (
      isWorkOnHoliday === "0" &&
      (getRateDate(null, holidayDate, date) === "200" ||
        getRateDate(null, holidayDate, date) === "400" ||
        getRateDate(null, holidayDate, date) === "330")
    ) {
      setIsObserved("1");
    }
    if (isWorkOnHoliday === "1") {
      setIsObserved("0");
    }
  };
  const initVal = {
    holiday_exemption_eid: item ? item.holiday_exemption_eid : "",
    holiday_exemption_pr_id: "",
    holiday_exemption_is_observe: item ? item.holiday_exemption_is_observe : "",
    holiday_exemption_holiday_date: item
      ? item.holiday_exemption_holiday_date
      : "",

    holiday_exemption_holiday_date_old: item
      ? item.holiday_exemption_holiday_date
      : "",
  };

  const yupSchema = Yup.object({
    holiday_exemption_eid: Yup.string().required("Required"),
    holiday_exemption_holiday_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl ">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Holiday Exemption
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
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.holiday_exemption_is_observe = isObserved;
                props.values.holiday_exemption_holiday_id = holidayId;
                props.values.holiday_exemption_pr_id =
                  isPayrollEmpty?.data[0].payroll_id;
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputSelect
                        label="Employee"
                        name="holiday_exemption_eid"
                        type="name"
                        onChange={handleEmployee}
                        disabled={loadingEmployee || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loadingEmployee && "Loading..."}
                        </option>

                        {employeeId?.data.map((eItem, key) => {
                          return (
                            <option
                              key={key}
                              value={eItem.employee_aid}
                              id={eItem.employee_job_work_reg_hol}
                            >
                              {`${eItem.employee_lname}, ${eItem.employee_fname}`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative mb-10">
                      <InputSelect
                        label="Holiday Date"
                        name="holiday_exemption_holiday_date"
                        type="name"
                        onChange={handleRateHoliday}
                        disabled={isLoading || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading && "Loading..."}
                        </option>

                        {holidayDate?.data.map((hdItem, key) => {
                          return (
                            <option
                              key={key}
                              value={hdItem.holidays_date}
                              id={hdItem.holidays_aid}
                            >
                              {`${hdItem.holidays_name} ${
                                hdItem.holidays_rate
                              }% (${formatDate(hdItem.holidays_date)})`}
                            </option>
                          );
                        })}
                      </InputSelect>
                      <HolidayIsObserved
                        item={item}
                        isWorkOnHoliday={isWorkOnHoliday}
                        isObserved={isObserved}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : item ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
                        disabled={mutation.isLoading}
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

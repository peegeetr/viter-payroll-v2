import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { queryData } from "../../../helpers/queryData";
import {
  devApiUrl,
  formatDate,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import {
  InputSelect,
  InputText,
  MyCheckbox,
} from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import useQueryData from "../../../custom-hooks/useQueryData";

const ModalAddHolidays = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

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
        dispatch(setIsAdd(false));
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
    `${devApiUrl}/v1/holidays`, // endpoint
    "get", // method
    "holidayDate" // key
  );

  const initVal = {
    holiday_exemption_eid: item ? item.holiday_exemption_eid : "",
    holiday_exemption_holiday_date: item
      ? item.holiday_exemption_holiday_date
      : "",
    holiday_exemption_is_observe: item
      ? item.holiday_exemption_is_observe
        ? true
        : false
      : true,

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
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputSelect
                        label="Employee"
                        name="holiday_exemption_eid"
                        type="name"
                        disabled={loadingEmployee || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loadingEmployee && "Loading..."}
                        </option>

                        {employeeId?.data.map((eItem, key) => {
                          return (
                            <option key={key} value={eItem.employee_aid}>
                              {`${eItem.employee_lname}, ${eItem.employee_fname}`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        label="Holiday Date"
                        name="holiday_exemption_holiday_date"
                        type="name"
                        disabled={isLoading || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading && "Loading..."}
                        </option>

                        {holidayDate?.data.map((hdItem, key) => {
                          return (
                            <option key={key} value={hdItem.holidays_date}>
                              {`${hdItem.holidays_name} ${
                                hdItem.holidays_rate
                              }% (${formatDate(hdItem.holidays_date)})`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>

                    <div className="relative mb-5 grid grid-cols-[1fr_8fr] items-center justify-center ">
                      <MyCheckbox
                        type="checkbox"
                        name="holiday_exemption_is_observe"
                        disabled={mutation.isLoading}
                      />
                      <p className="mb-0">Is this holiday observed?</p>
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

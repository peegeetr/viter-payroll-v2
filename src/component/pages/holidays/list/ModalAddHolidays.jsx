import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { devApiUrl } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalAddHolidays = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isObserved, setIsObserved] = React.useState(
    item ? item.holidays_observed : ""
  );

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/holidays/${item.holidays_aid}`
          : `${devApiUrl}/v1/holidays`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["holiday"] });
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
  const handleRateHoliday = async (e) => {
    let isSpecialHolidayRate = e.target.value;
    // get employee id
    if (isSpecialHolidayRate === "special") {
      setIsObserved("1");
    }
    if (isSpecialHolidayRate === "regular") {
      setIsObserved("0");
    }
  };

  const initVal = {
    holidays_name: item ? item.holidays_name : "",
    holidays_date: item ? item.holidays_date : "",
    holidays_type: item ? item.holidays_type : "",
    holidays_rate: item ? item.holidays_rate : "",
    holidays_observed: item ? (item.holidays_observed ? true : false) : true,

    holidays_name_old: item ? item.holidays_name : "",
    holidays_date_old: item ? item.holidays_date : "",
  };

  const yupSchema = Yup.object({
    holidays_name: Yup.string().required("Required"),
    holidays_date: Yup.string().required("Required"),
    holidays_type: Yup.string().required("Required"),
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
                // const holidays_rate = removeComma(values.holidays_rate);
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.holidays_rate =
                  props.values.holidays_type === "special" ? "130" : "200";
                return (
                  <Form>
                    <div className="relative mb-5 mt-5">
                      <InputText
                        label="Holiday"
                        type="text"
                        name="holidays_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="holidays_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-10">
                      <InputSelect
                        name="holidays_type"
                        label="Type"
                        onChange={handleRateHoliday}
                        disabled={mutation.isLoading}
                      >
                        <option value="" disabled hidden></option>
                        <option value="special">Special Holiday (130%)</option>
                        <option value="regular">Regular Holiday (200%)</option>
                      </InputSelect>

                      {isObserved === "1" || isObserved === 1 ? (
                        <div className="flex items-center absolute right-[100px] mt-4 text-primary">
                          <FaCheck className="text-green-800" />
                          <p className=" mb-0 ml-2">Will Observed</p>
                        </div>
                      ) : isObserved === "0" || isObserved === 0 ? (
                        <div className="flex items-center absolute right-[86px] mt-4 text-primary">
                          <ImCross />
                          <p className=" mb-0 ml-2">Will Not Observed</p>
                        </div>
                      ) : (
                        ""
                      )}
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

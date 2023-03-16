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
} from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import { InputText } from "../../../../helpers/FormInputs.jsx";
import {
  devApiUrl,
  handleNumOnly,
  removeComma,
} from "../../../../helpers/functions-general.jsx";
import { queryData } from "../../../../helpers/queryData.jsx";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner.jsx";

const ModalAddTaxMonthly = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${devApiUrl}/v1/tax/monthly/${itemEdit.tax_monthly_aid}`
          : `${devApiUrl}/v1/tax/monthly`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["monthly"] });
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${itemEdit ? "updated." : "added."}`));
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

  const initVal = {
    tax_monthly_range_from: itemEdit ? itemEdit.tax_monthly_range_from : "",
    tax_monthly_range_to: itemEdit ? itemEdit.tax_monthly_range_to : "",
    tax_monthly_less_amount: itemEdit ? itemEdit.tax_monthly_less_amount : "",
    tax_monthly_rate: itemEdit ? itemEdit.tax_monthly_rate : "",
    tax_monthly_range_from_old: itemEdit ? itemEdit.tax_monthly_range_from : "",
    tax_monthly_range_to_old: itemEdit ? itemEdit.tax_monthly_range_to : "",
    tax_monthly_additional_amount: itemEdit
      ? itemEdit.tax_monthly_additional_amount
      : "",
  };

  const yupSchema = Yup.object({
    tax_monthly_range_from: Yup.string().required("Required"),
    tax_monthly_range_to: Yup.string().required("Required"),
    tax_monthly_less_amount: Yup.string().required("Required"),
    tax_monthly_rate: Yup.string().required("Required"),
    tax_monthly_additional_amount: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} Monthly
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
                const tax_monthly_range_from = removeComma(
                  `${values.tax_monthly_range_from}`
                );
                const tax_monthly_range_to = removeComma(
                  `${values.tax_monthly_range_to}`
                );
                const tax_monthly_less_amount = removeComma(
                  `${values.tax_monthly_less_amount}`
                );
                const tax_monthly_rate = removeComma(
                  `${values.tax_monthly_rate}`
                );
                const tax_monthly_additional_amount = removeComma(
                  `${values.tax_monthly_additional_amount}`
                );
                mutation.mutate({
                  ...values,
                  tax_monthly_range_from,
                  tax_monthly_range_to,
                  tax_monthly_less_amount,
                  tax_monthly_rate,
                  tax_monthly_additional_amount,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        num="num"
                        label="Range From"
                        type="text"
                        name="tax_monthly_range_from"
                        disabled={mutation.isLoading}
                        onKeyPress={(e) => handleNumOnly(e)}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        num="num"
                        label="Range To"
                        type="text"
                        name="tax_monthly_range_to"
                        disabled={mutation.isLoading}
                        onKeyPress={(e) => handleNumOnly(e)}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        num="num"
                        label="Less Amount"
                        type="text"
                        name="tax_monthly_less_amount"
                        disabled={mutation.isLoading}
                        onKeyPress={(e) => handleNumOnly(e)}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        num="num"
                        label="Rate %"
                        type="text"
                        name="tax_monthly_rate"
                        disabled={mutation.isLoading}
                        onKeyPress={(e) => handleNumOnly(e)}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        num="num"
                        label="Addt'l Amount"
                        type="text"
                        name="tax_monthly_additional_amount"
                        disabled={mutation.isLoading}
                        onKeyPress={(e) => handleNumOnly(e)}
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
                        ) : itemEdit ? (
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

export default ModalAddTaxMonthly;

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
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { devApiUrl } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditRates = ({ itemEdit, payType }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [payItem, setPayItem] = React.useState(
    itemEdit ? itemEdit.rates_payitems_id : ""
  );
  const [payItemId, setPayItemId] = React.useState(
    Number(itemEdit ? itemEdit.rates_paytype_id : 0)
  );

  // use if not loadmore button and handle change
  const { data: result } = useQueryData(
    `${devApiUrl}/v1/paytype/${payItemId}`, // endpoint
    "get", // method
    "result", // key
    {}, // fd
    payItemId // id
  );

  const handlePayType = async (e, props) => {
    let paytypeid = e.target.value;
    setPayItemId(paytypeid);
    setPayItem("");
  };

  const handlePayItem = async (e, props) => {
    let payitemid = e.target.value;
    setPayItem(payitemid);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${devApiUrl}/v1/rates/${itemEdit.rates_aid}`
          : `${devApiUrl}/v1/rates`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["rate"] });
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
    rates_aid: itemEdit ? itemEdit.rates_aid : "",
    rates_name: itemEdit ? itemEdit.rates_name : "",
    rates_percent: itemEdit ? itemEdit.rates_percent : "",
    rates_paytype_id: itemEdit ? itemEdit.rates_paytype_id : "",
    rates_payitems_id: "",
  };

  const yupSchema = Yup.object({
    rates_name: Yup.string().required("Required"),
    rates_percent: Yup.string().required("Required"),
    rates_paytype_id: Yup.string().required("Required"),
    rates_payitems_id: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} Rates
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
                const rate = values.rates_percent.replace(/[,]/g, "");
                // console.log(rate);
                mutation.mutate({ ...values, rate });
              }}
            >
              {(props) => {
                props.values.rates_payitems_id = payItem;

                return (
                  <Form>
                    <div className="max-h-[28rem]  p-4">
                      <div className="relative my-5 ">
                        <InputText
                          label="Name"
                          type="text"
                          name="rates_name"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="relative my-5 ">
                        <InputText
                          num="num"
                          label="Percent"
                          type="text"
                          name="rates_percent"
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5 ">
                        <InputSelect
                          name="rates_paytype_id"
                          label="Pay Type"
                          disabled={mutation.isLoading}
                          onChange={handlePayType}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Pay Type">
                            <option value="" hidden></option>
                            {payType?.data.length > 0 ? (
                              payType.data.map((paytype, key) => {
                                return (
                                  <option key={key} value={paytype.paytype_aid}>
                                    {paytype.paytype_name}
                                  </option>
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
                          name="rates_payitems_id"
                          onChange={handlePayItem}
                          disabled={mutation.isLoading}
                        >
                          <optgroup label="Pay Item">
                            <option value="" hidden></option>
                            {result?.data.length > 0 ? (
                              result.data.map((payitem, key) => {
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
                    </div>
                    <div className="flex items-center gap-1 p-4 ">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        {itemEdit ? "Save" : "Add"}
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

export default ModalEditRates;

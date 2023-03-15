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
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import { InputText } from "../../../helpers/FormInputs.jsx";
import {
  devApiUrl,
  handleNumOnly,
  removeComma,
} from "../../../helpers/functions-general.jsx";
import { queryData } from "../../../helpers/queryData.jsx";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner.jsx";

const ModalSssBracket = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${devApiUrl}/v1/sss-bracket/${itemEdit.sss_bracket_aid}`
          : `${devApiUrl}/v1/sss-bracket`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sssBracket"] });
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
    sss_bracket_aid: itemEdit ? itemEdit.sss_bracket_aid : "",
    sss_bracket_range_from: itemEdit ? itemEdit.sss_bracket_range_from : "",
    sss_bracket_range_to: itemEdit ? itemEdit.sss_bracket_range_to : "",
    sss_bracket_er: itemEdit ? itemEdit.sss_bracket_er : "",
    sss_bracket_ee: itemEdit ? itemEdit.sss_bracket_ee : "",
    sss_bracket_total: itemEdit ? itemEdit.sss_bracket_total : "",

    sss_bracket_range_from_old: itemEdit ? itemEdit.sss_bracket_range_from : "",
    sss_bracket_range_to_old: itemEdit ? itemEdit.sss_bracket_range_to : "",
  };

  const yupSchema = Yup.object({
    sss_bracket_range_from: Yup.string().required("Required"),
    sss_bracket_range_to: Yup.string().required("Required"),
    sss_bracket_er: Yup.string().required("Required"),
    sss_bracket_ee: Yup.string().required("Required"),
    sss_bracket_total: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} SSS Bracket
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
                const sss_bracket_range_from = removeComma(
                  `${values.sss_bracket_range_from}`
                );
                const sss_bracket_range_to = removeComma(
                  `${values.sss_bracket_range_to}`
                );
                const sss_bracket_er = removeComma(`${values.sss_bracket_er}`);
                const sss_bracket_ee = removeComma(`${values.sss_bracket_ee}`);
                const sss_bracket_total = removeComma(
                  `${values.sss_bracket_total}`
                );
                mutation.mutate({
                  ...values,
                  sss_bracket_range_from,
                  sss_bracket_range_to,
                  sss_bracket_er,
                  sss_bracket_ee,
                  sss_bracket_total,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    {/* <div className="relative my-5">
                      <p className="w-1/2 m-0">
                        Item #: {itemEdit ? itemNum : itemEdit + 1}
                      </p>
                    </div> */}
                    <div className="relative my-5">
                      <InputText
                        label="Range From"
                        type="text"
                        name="sss_bracket_range_from"
                        disabled={mutation.isLoading}
                        num="num"
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Range To"
                        type="text"
                        name="sss_bracket_range_to"
                        disabled={mutation.isLoading}
                        num="num"
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="ER"
                        type="text"
                        name="sss_bracket_er"
                        disabled={mutation.isLoading}
                        num="num"
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="EE"
                        type="text"
                        name="sss_bracket_ee"
                        disabled={mutation.isLoading}
                        num="num"
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Total"
                        type="text"
                        name="sss_bracket_total"
                        disabled={mutation.isLoading}
                        num="num"
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

export default ModalSssBracket;

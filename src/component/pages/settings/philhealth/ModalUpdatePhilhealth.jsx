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
import { InputText } from "../../../helpers/FormInputs";
import { devApiUrl, handleNumOnly } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalUpdatePhilhealth = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item !== 0
          ? `${devApiUrl}/v1/philhealth/${item.philhealth_aid}`
          : `${devApiUrl}/v1/philhealth`,
        item !== 0 ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["philhealth"] });
      dispatch(setIsAdd(false));
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfuly ${item !== 0 ? "updated." : "added."}`)
        );
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const initVal = {
    philhealth_percentage: item !== 0 ? item.philhealth_percentage : "0",
    philhealth_min: item !== 0 ? item.philhealth_min : "0",
    philhealth_max: item !== 0 ? item.philhealth_max : "0",
  };

  const yupSchema = Yup.object({
    philhealth_percentage: Yup.string().required("Required"),
    philhealth_min: Yup.string().required("Required"),
    philhealth_max: Yup.string().required("Required"),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Philhealth</h3>
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

                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="max-h-[28rem] p-4">
                      <div className="relative mb-5 mt-5">
                        <InputText
                          label="Percentage"
                          type="text"
                          name="philhealth_percentage"
                          onKeyPress={handleNumOnly}
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5">
                        <InputText
                          label="Minimum"
                          type="text"
                          name="philhealth_min"
                          onKeyPress={handleNumOnly}
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5">
                        <InputText
                          label="Maximum"
                          type="text"
                          name="philhealth_max"
                          onKeyPress={handleNumOnly}
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="flex items-center gap-1 ">
                        <button
                          type="submit"
                          disabled={mutation.isLoading || !props.dirty}
                          className="btn-modal-submit relative"
                        >
                          {mutation.isLoading && <ButtonSpinner />}
                          Save
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

export default ModalUpdatePhilhealth;

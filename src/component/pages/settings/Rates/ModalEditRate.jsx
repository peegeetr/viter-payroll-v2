import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../store/StoreAction.jsx";

import { StoreContext } from "../../../../store/StoreContext.jsx";
import { fetchData } from "../../../helpers/fetchData.jsx";
import { InputText } from "../../../helpers/FormInputs.jsx";
import { devApiUrl } from "../../../helpers/functions-general.jsx";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner.jsx";

const ModalEditRates = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  console.log(item.rates_night_differential);

  const initVal = {
    rates_night_differential: item.rates_night_differential,
    rates_overtime: item.rates_overtime,
    rates_special_holiday: item.rates_special_holiday,
    rates_regular_holiday: item.rates_regular_holiday,
    rates_rest_day: item.rates_rest_day,
  };

  const yupSchema = Yup.object({
    rates_night_differential: Yup.string().required("Required"),
    rates_overtime: Yup.string().required("Required"),
    rates_special_holiday: Yup.string().required("Required"),
    rates_regular_holiday: Yup.string().required("Required"),
    rates_rest_day: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Rates</h3>
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
                fetchData(
                  setLoading,
                  `${devApiUrl}/v1/rates/${item.rates_aid}`,
                  values, // form data values
                  null, // result set data
                  "Succesfully updated.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null, // navigate default value
                  "put"
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Night differential"
                        type="text"
                        name="rates_night_differential"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Overtime"
                        type="text"
                        name="rates_overtime"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Special Holiday"
                        type="text"
                        name="rates_special_holiday"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Regular Holiday"
                        type="text"
                        name="rates_regular_holiday"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Rest Day"
                        type="text"
                        name="rates_rest_day"
                        disabled={loading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading && <ButtonSpinner />} Save
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
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

export default ModalEditRates;

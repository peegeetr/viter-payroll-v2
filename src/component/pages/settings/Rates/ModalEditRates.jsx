import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useLoadAll from "../../../custom-hooks/useLoadAll";
import fetchApi from "../../../helpers/fetchApi";
import { fetchData } from "../../../helpers/fetchData";
import {
  InputSelect,
  InputText,
  MyCheckbox,
} from "../../../helpers/FormInputs";
import {
  consoleLog,
  devApiUrl,
  handleNumOnly,
} from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditRates = ({ itemEdit, payType }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const [payItem, setPayItem] = React.useState(
    itemEdit ? itemEdit.rates_payitems_id : ""
  );

  let payid = itemEdit ? `/${itemEdit.rates_paytype_id}` : `/${0}`;

  const { result, setResult } = useLoadAll(
    `${devApiUrl}/v1/paytype/${payid}`,
    "get"
  );

  const handlePayType = async (e, props) => {
    let paytypeid = e.target.value;
    setLoading(true);
    const results = await fetchApi(`${devApiUrl}/v1/paytype/${paytypeid}`);
    console.log(results);

    if (results.data) {
      setLoading(false);
      setResult(results.data);
    }
  };

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const initVal = {
    rates_aid: itemEdit ? itemEdit.rates_aid : "",
    rates_name: itemEdit ? itemEdit.rates_name : "",
    rates_paytype_id: itemEdit ? itemEdit.rates_paytype_id : "",
    rates_payitems_id: "",
  };

  const yupSchema = Yup.object({
    rates_name: Yup.string().required("Required"),
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
                consoleLog(values);
                // get data from HRIS
                // if (payItem[0].payitem_is_hris === 1) {
                // fetch data
                // filter data based on payroll period
                // set data filterd data to state and pass to server
                //    }
                fetchData(
                  setLoading,
                  itemEdit
                    ? `${devApiUrl}/v1/rates/${itemEdit.rates_aid}`
                    : `${devApiUrl}/v1/rates`,
                  { ...values }, // form data values
                  null, // result set data
                  itemEdit ? "Succesfully updated." : "Succesfully added.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null, // navigate default value
                  itemEdit ? "put" : "post"
                );
                dispatch(setStartIndex(0));
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
                          disabled={loading}
                        />
                      </div>

                      <div className="relative mb-5 ">
                        <InputSelect
                          name="rates_paytype_id"
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
                    </div>
                    <div className="flex items-center gap-1 p-4 ">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading && <ButtonSpinner />}
                        {itemEdit ? "Save" : "Add"}
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

export default ModalEditRates;

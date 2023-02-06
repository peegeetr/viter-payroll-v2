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

const ModalSssBracket = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  console.log(itemEdit);

  const initVal = {
    sss_bracket_aid: itemEdit ? itemEdit.sss_bracket_aid : "",
    sss_bracket_range_from: itemEdit ? itemEdit.sss_bracket_range_from : "",
    sss_bracket_range_to: itemEdit ? itemEdit.sss_bracket_range_to : "",
    sss_bracket_er: itemEdit ? itemEdit.sss_bracket_er : "",
    sss_bracket_ee: itemEdit ? itemEdit.sss_bracket_ee : "",
    sss_bracket_total: itemEdit ? itemEdit.sss_bracket_total : "",
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
                fetchData(
                  setLoading,
                  itemEdit
                    ? `${devApiUrl}/v1/sss-bracket/${itemEdit.sss_bracket_aid}`
                    : `${devApiUrl}/v1/sss-bracket`,
                  values, // form data values
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
                return (
                  <Form>
                    <div className="relative mb-5">
                      <InputText
                        label="Range From"
                        type="text"
                        name="sss_bracket_range_from"
                        disabled={loading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Range To"
                        type="text"
                        name="sss_bracket_range_to"
                        disabled={loading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="ER"
                        type="text"
                        name="sss_bracket_er"
                        disabled={loading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="EE"
                        type="text"
                        name="sss_bracket_ee"
                        disabled={loading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Total"
                        type="text"
                        name="sss_bracket_total"
                        disabled={loading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading ? (
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

export default ModalSssBracket;

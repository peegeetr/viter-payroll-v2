import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { fetchData } from "../../../../helpers/fetchData";
import { InputText } from "../../../../helpers/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddRole = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    department_aid: itemEdit ? itemEdit.department_aid : "",
    department_name: itemEdit ? itemEdit.department_name : "",
    department_name_old: itemEdit ? itemEdit.department_name : "",
  };

  const yupSchema = Yup.object({
    department_name: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} department
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
                console.log();
                fetchData(
                  setLoading,
                  itemEdit
                    ? `/v1/departments/${itemEdit.department_aid}`
                    : "/v1/departments",
                  values, // form data values
                  null, // result set data
                  itemEdit ? "Succesfully updated." : "Succesfully added.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null,
                  itemEdit ? "put" : "post" // method
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative mb-5">
                      <InputText
                        placeholder="Name"
                        type="text"
                        name="department_name"
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

export default ModalAddRole;

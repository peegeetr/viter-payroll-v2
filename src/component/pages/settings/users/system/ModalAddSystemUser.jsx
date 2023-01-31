import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { fetchData } from "../../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { consoleLog } from "../../../../helpers/functions-general";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddSystemUser = ({ itemEdit, role }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    user_system_aid: itemEdit ? itemEdit.user_system_aid : "",
    user_system_fname: itemEdit ? itemEdit.user_system_fname : "",
    user_system_lname: itemEdit ? itemEdit.user_system_lname : "",
    user_system_email: itemEdit ? itemEdit.user_system_email : "",
    user_system_role_id: itemEdit ? itemEdit.user_system_role_id : "",
    user_system_email_old: itemEdit ? itemEdit.user_system_email : "",
  };

  const yupSchema = Yup.object({
    user_system_fname: Yup.string().required("Required"),
    user_system_lname: Yup.string().required("Required"),
    user_system_email: Yup.string().required("Required").email("Invalid email"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} user
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
                    ? `/v1/user-systems/${itemEdit.user_system_aid}`
                    : "/v1/user-systems",
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
                role.length > 0 &&
                  role.map((item) => {
                    if (item.role_is_developer === 1) {
                      props.values.user_system_role_id = item.role_aid;
                    }
                  });
                return (
                  <Form>
                    <div className="relative mb-6">
                      <InputText
                        placeholder="First name"
                        type="text"
                        name="user_system_fname"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        placeholder="Last name"
                        type="text"
                        name="user_system_lname"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        placeholder="Email"
                        type="text"
                        name="user_system_email"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        placeholder="Role"
                        name="user_system_role_id"
                        disabled={loading}
                      >
                        <>
                          {role.length > 0 ? (
                            role.map((item, key) => {
                              return (
                                item.role_is_developer === 1 && (
                                  <option key={key} value={item.role_aid}>
                                    {item.role_name}
                                  </option>
                                )
                              );
                            })
                          ) : (
                            <option value="">No Data</option>
                          )}
                        </>
                      </InputSelect>
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

export default ModalAddSystemUser;

import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import fetchApi from "../../helpers/fetchApi";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../helpers/FormInputs";
import { devApiUrl } from "../../helpers/functions-general";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";

const ModalAddDeduction = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isSearch, setIsSearch] = React.useState(false);
  const [addsearch, setaddSearch] = React.useState("");
  const search = React.useRef(null);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleSearchChange = async (e) => {
    if (e.target.value.trim() === "") {
      setaddSearch("");
      setIsSearch(false);
      return;
    }
    // setLoading(true);
    setIsSearch(true);
    setaddSearch(e.target.value);
    const data = await fetchApi(
      devApiUrl + "/v1/departments/search/",
      { search: e.target.value },
      dispatch
    );
    if (typeof data === "undefined") {
      return;
    }
    if (!data.status) {
      setData([]);
      setIsSearch(false);
      return;
    }
    if (data.status) {
      setData(data.data);
    }
  };

  const initVal = {
    user_other_aid: itemEdit ? itemEdit.user_other_aid : "",
    user_other_emp_id: itemEdit ? itemEdit.user_other_emp_id : "",
    user_other_role_id: itemEdit ? itemEdit.user_other_role_id : "",
    user_other_emp_id_old: itemEdit ? itemEdit.user_other_emp_id : "",
  };

  const yupSchema = Yup.object({
    sample: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} Deductions
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
                    ? `/v1/user-others/${itemEdit.user_other_aid}`
                    : "/v1/user-others",
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
                    <div
                      className="relative mb-5 placeholder"
                      data-label="Employee"
                    >
                      <InputSelect
                        name="sample"
                        //  disabled={!loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Employee">
                          <option value=""> -- </option>
                          <option value="all">All</option>
                          <option value="sample">Lumabas, Cyrene M.</option>
                        </optgroup>
                      </InputSelect>
                    </div>

                    <div
                      className="relative mb-5 placeholder"
                      data-label="Pay Type"
                    >
                      <InputSelect
                        name="sample"
                        //  disabled={!loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Pay Type">
                          <option value=""> -- </option>
                          <option value="sample">Wages</option>
                          <option value="sample">de minimis</option>
                        </optgroup>
                      </InputSelect>
                    </div>

                    <div
                      className="relative mb-5 placeholder"
                      data-label="Pay Item"
                    >
                      <InputSelect
                        name="sample"
                        //  disabled={!loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Pay Item">
                          <option value=""> -- </option>
                          <option value="sample">Adjustment</option>
                          <option value="sample">de minimis</option>
                        </optgroup>
                      </InputSelect>
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        placeholder="Amount"
                        type="text"
                        name="sample"
                        disabled={loading}
                        onChange={handleSearchChange}
                        value={addsearch}
                      />
                    </div>

                    <div
                      className="relative mb-5 placeholder"
                      data-label="Frequency"
                    >
                      <InputSelect
                        name="sample"
                        //  disabled={!loading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Frequency">
                          <option value=""> -- </option>
                          <option value="1">Semi-monthly</option>
                          <option value="0">Monthly</option>
                        </optgroup>
                      </InputSelect>
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        placeholder="No. of installment"
                        type="text"
                        name="sample"
                        disabled={loading}
                        onChange={handleSearchChange}
                        value={addsearch}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        placeholder="Start Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="sample"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        placeholder="End Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="sample"
                        disabled={loading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        placeholder="Note"
                        type="text"
                        name="sample"
                        disabled={loading}
                        onChange={handleSearchChange}
                        value={addsearch}
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

export default ModalAddDeduction;

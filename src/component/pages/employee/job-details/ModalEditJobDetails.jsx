import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setIsAdd, setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../helpers/FormInputs";
import { hrisDevApiUrl } from "../../../helpers/functions-general";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditJobDetails = ({ itemEdit, jobTitle, department }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    employee_aid: itemEdit ? itemEdit.employee_aid : "",
    employee_job_hired_date: itemEdit ? itemEdit.employee_job_hired_date : "",
    employee_job_number: itemEdit ? itemEdit.employee_job_number : "",
    employee_job_tin: itemEdit ? itemEdit.employee_job_tin : "",
    employee_job_status: itemEdit ? itemEdit.employee_job_status : "",
    employee_job_department_id: itemEdit
      ? itemEdit.employee_job_department_id
      : "",
    employee_job_title_id: itemEdit ? itemEdit.employee_job_title_id : "",
    employee_job_supervisor_id: itemEdit
      ? itemEdit.employee_job_supervisor_id
      : "",
    employee_email: itemEdit ? itemEdit.employee_email : "",
    employee_job_drive_link: itemEdit ? itemEdit.employee_job_drive_link : "",
    employee_job_comments: itemEdit ? itemEdit.employee_job_comments : "",
  };

  const yupSchema = Yup.object({
    employee_job_hired_date: Yup.string().required("Required"),
    employee_job_number: Yup.string().required("Required"),
    employee_job_tin: Yup.string().required("Required"),
    employee_job_status: Yup.string().required("Required"),
    employee_job_department_id: Yup.string().required("Required"),
    employee_job_title_id: Yup.string().required("Required"),
    employee_job_supervisor_id: Yup.string().required("Required"),
    employee_email: Yup.string().required("Required").email("Invalid email"),
    employee_job_drive_link: Yup.string().required("Required"),
    employee_job_comments: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px]  rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Job Details</h3>
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
                console.log();
                fetchData(
                  setLoading,
                  `${hrisDevApiUrl}/v1/employees/employment/${itemEdit.employee_aid}`,
                  values, // form data values
                  null, // result set data
                  "Succesfully updated.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null,
                  "put" // method
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-scroll p-4">
                      <div className="relative mb-5 ">
                        <InputText
                          placeholder="Date Employed"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          name="employee_job_hired_date"
                          disabled={loading}
                        />
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          placeholder="TIN"
                          type="text"
                          name="employee_job_tin"
                          disabled={loading}
                        />
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          placeholder="Status"
                          type="text"
                          name="employee_job_status"
                          disabled={loading}
                        />
                      </div>

                      <div
                        className={
                          itemEdit
                            ? "relative mb-5"
                            : "relative mb-5 placeholder"
                        }
                        data-label="Department"
                      >
                        <InputSelect
                          name="employee_job_department_id"
                          disabled={loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Department">
                            <option value="" hidden></option>
                            {department.length > 0 ? (
                              department.map((item, key) => {
                                return (
                                  <option key={key} value={item.department_aid}>
                                    {item.department_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>

                      <div
                        className={
                          itemEdit
                            ? "relative mb-5"
                            : "relative mb-5 placeholder"
                        }
                        data-label="Job Title"
                      >
                        <InputSelect
                          name="employee_job_title_id"
                          disabled={loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Job Title">
                            <option value="" hidden></option>
                            {jobTitle.length > 0 ? (
                              jobTitle.map((item, key) => {
                                return (
                                  <option key={key} value={item.job_title_aid}>
                                    {item.job_title_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div
                        className={
                          itemEdit
                            ? "relative mb-5"
                            : "relative mb-5 placeholder"
                        }
                        data-label="Supervisor"
                      >
                        <InputSelect
                          name="employee_job_supervisor_id"
                          disabled={loading}
                          onFocus={(e) =>
                            e.target.parentElement.classList.add("focused")
                          }
                        >
                          <optgroup label="Supervisor">
                            <option value="" hidden></option>
                            <option value="vivo">Project Manager</option>
                            <option value="vivo">Full Stack Developer</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          placeholder="Work Email"
                          type="text"
                          name="employee_email"
                          disabled={loading}
                        />
                      </div>
                      <div className="relative mb-5">
                        <InputTextArea
                          placeholder="Drive Link"
                          type="text"
                          name="employee_job_drive_link"
                          disabled={loading}
                        />
                      </div>
                      <div className="relative ">
                        <InputTextArea
                          placeholder="Comment"
                          type="text"
                          name="employee_job_comments"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 p-4">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading ? <ButtonSpinner /> : "Save"}
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

export default ModalEditJobDetails;

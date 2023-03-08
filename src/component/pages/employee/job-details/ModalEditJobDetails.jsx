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

const ModalEditJobDetails = ({
  itemEdit,
  jobTitle,
  department,
  supervisor,
  leave,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    employee_aid: itemEdit ? itemEdit.employee_aid : "",
    employee_job_hired_date: itemEdit ? itemEdit.employee_job_hired_date : "",
    employee_job_regularized: itemEdit
      ? itemEdit.employee_job_regularized
      : "na",
    employee_job_separated: itemEdit ? itemEdit.employee_job_separated : "na",
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
    employee_job_supervisor_name: itemEdit
      ? itemEdit.employee_job_supervisor_name
      : "",
    employee_email: itemEdit ? itemEdit.employee_email : "",
    employee_job_drive_link: itemEdit ? itemEdit.employee_job_drive_link : "",
    employee_job_start_time: itemEdit ? itemEdit.employee_job_start_time : "",
    employee_job_leave_type_id: itemEdit
      ? itemEdit.employee_job_leave_type_id
      : "",
    employee_job_comments: itemEdit ? itemEdit.employee_job_comments : "",
  };

  const yupSchema = Yup.object({
    employee_job_hired_date: Yup.string().required("Required"),
    employee_job_tin: Yup.string().required("Required"),
    employee_job_status: Yup.string().required("Required"),
    employee_job_department_id: Yup.string().required("Required"),
    employee_job_title_id: Yup.string().required("Required"),
    employee_email: Yup.string().required("Required").email("Invalid email"),
    employee_job_drive_link: Yup.string().required("Required"),
    employee_job_start_time: Yup.string().required("Required"),
    employee_job_leave_type_id: Yup.string().required("Required"),
    employee_job_supervisor_name: Yup.string().required("Required"),
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
                      {/* department */}
                      <div className="relative my-5">
                        <InputSelect
                          name="employee_job_department_id"
                          label="Department"
                          disabled={loading}
                        >
                          <optgroup label="Department">
                            <option value="" hidden></option>
                            {department.length > 0 ? (
                              department.map((item, key) => {
                                return (
                                  item.department_active === 1 && (
                                    <option
                                      key={key}
                                      value={item.department_aid}
                                    >
                                      {item.department_name}
                                    </option>
                                  )
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* job title */}
                      <div className="relative mb-5">
                        <InputSelect
                          name="employee_job_title_id"
                          label="Job Title"
                        >
                          <optgroup label="Job Title">
                            <option value="" hidden></option>
                            {jobTitle.length > 0 ? (
                              jobTitle.map((item, key) => {
                                return (
                                  item.job_title_is_active === 1 && (
                                    <option
                                      key={key}
                                      value={item.job_title_aid}
                                    >
                                      {item.job_title_name}
                                    </option>
                                  )
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* status */}
                      <div className="relative mb-5">
                        <InputSelect name="employee_job_status" label="Status">
                          <optgroup label="Status">
                            <option value="" hidden></option>
                            <option value="contructual">Contructual</option>
                            <option value="probationary">Probationary</option>
                            <option value="regular">Regular</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* leave type */}
                      <div className="relative mb-5">
                        <InputSelect
                          name="employee_job_leave_type_id"
                          label="Leave type"
                        >
                          <optgroup label="Leave type">
                            <option value="" hidden></option>
                            {leave.length > 0 ? (
                              leave.map((item, key) => {
                                return (
                                  item.leavetype_active === 1 && (
                                    <option
                                      key={key}
                                      value={item.leavetype_aid}
                                    >
                                      {/* {item.leavetype_name} (
                                      {item.leavetype_days} days) */}
                                      {item.leavetype_name}
                                    </option>
                                  )
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* supervisor */}
                      <div className="relative mb-5">
                        <InputSelect
                          label="Supervisor"
                          name="employee_job_supervisor_name"
                          disabled={loading}
                          onChange={(e) => handleGetSupervisorId(e)}
                        >
                          <optgroup label="Supervisor">
                            <option value="" hidden></option>
                            {supervisor.length > 0 ? (
                              supervisor.map((item, key) => {
                                return (
                                  item.supervisor_is_active === 1 &&
                                  itemEdit.employee_aid !==
                                    item.employee_aid && (
                                    <option
                                      id={item.employee_aid}
                                      value={`${item.employee_lname}, ${item.employee_fname}`}
                                      key={key}
                                    >
                                      {item.employee_lname},{" "}
                                      {item.employee_fname}
                                    </option>
                                  )
                                );
                              })
                            ) : (
                              <option value="">No data</option>
                            )}
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* work start time */}
                      <div
                        className={
                          itemEdit ? "relative mb-5 " : "relative mb-5 label"
                        }
                      >
                        <InputSelect
                          name="employee_job_start_time"
                          disabled={loading}
                          label="Work start time"
                        >
                          <optgroup label="Work start time">
                            <option value="" hidden></option>
                            <option value="7">7 AM</option>
                            <option value="9">9 AM</option>
                            <option value="0">12 AM</option>
                            <option value="1">1 AM</option>
                            <option value="ft">Flexible</option>
                          </optgroup>
                        </InputSelect>
                      </div>
                      {/* work email */}
                      <div className="relative mb-5">
                        <InputText
                          label="Work Email"
                          type="text"
                          name="employee_email"
                          disabled={loading}
                        />
                      </div>
                      {/* date employed */}
                      <div className="relative mb-6 mt-5">
                        <InputText
                          label="Date Employed"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          name="employee_job_hired_date"
                          disabled={loading}
                        />
                      </div>
                      {/* regularized on */}
                      <div className="relative mb-6">
                        <InputText
                          label="Regularized on"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          name="employee_job_regularized"
                          disabled={loading}
                        />
                      </div>
                      {/* date separated */}
                      <div className="relative mb-6">
                        <InputText
                          label="Date separated"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          name="employee_job_separated"
                          disabled={loading}
                        />
                      </div>
                      {/* TIN */}
                      <div className="relative mb-5">
                        <InputText
                          label="TIN"
                          type="text"
                          name="employee_job_tin"
                          disabled={loading}
                        />
                      </div>
                      {/* Drive link */}
                      <div className="relative mb-5">
                        <InputTextArea
                          label="Drive Link"
                          type="text"
                          name="employee_job_drive_link"
                          disabled={loading}
                        />
                      </div>
                      {/* Comments */}
                      <div className="relative mb-5">
                        <InputTextArea
                          label="Comment"
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

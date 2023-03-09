import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import { devApiUrl } from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import { MdFilterAlt } from "react-icons/md";
import ServerError from "../../../partials/ServerError";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";
import { queryData } from "../../../helpers/queryData";

const FilterEarningsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const initVal = {
    // sample: "",
    // sample: "",
    // sample: "",
    // sample: "",
  };

  const yupSchema = Yup.object({
    sample: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // console.log(values);
          setLoading(true);
          const result = await queryData(
            values == "all" //admin location = empty
              ? devApiUrl +
                  "/admin/admin-attendance/admin-attendance-members/read-attendance-members-by-civil-id.php" // admin specific civil status
              : devApiUrl +
                  "/admin/admin-attendance/admin-attendance-members/read-attendance-members-by-all-civil-id.php", // admin all civil status

            {
              token: "",
              ...values,
            }
          );

          // consoleLog(result);

          if (typeof result === "undefined") {
            consoleLog("undefined");
            setLoading(false);
            dispatch(setError(true));
            dispatch(setMessage("API / Network Error"));
            return;
          }
          if (!result.status) {
            consoleLog("no data");
            setLoading(false);
            return;
          }
          if (result.status) {
            setResult(result.data);
            // setResult([]);
            setLoading(false);
          }
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid sm:grid-cols-[1fr_1fr_1fr_150px] gap-3 mb-5">
                <div className="relative label">
                  <InputSelect
                    label="Pay Item"
                    name="sample"
                    // disabled={loading}
                    onFocus={(e) =>
                      e.target.parentElement.classList.add("focused")
                    }
                  >
                    <optgroup label="Pay Item">
                      <option value="" hidden></option>
                      <option value="all">All</option>
                      <option value="sample">Lumabas, Cyrene M.</option>
                    </optgroup>
                  </InputSelect>
                </div>
                <div className="relative">
                  <InputText
                    label="Start Date"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="sample"
                    // disabled={loading}
                  />
                </div>
                <div className="relative">
                  <InputText
                    label="End Date"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    name="sample"
                    // disabled={loading}
                  />
                </div>

                <button className="btn-primary">
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[12rem]">Employeee</th>
              <th className="min-w-[7rem]">Pay Type</th>
              <th className="min-w-[7rem]">Pay Item</th>
              <th className="min-w-[7rem]">Amount</th>
              <th className="min-w-[7rem]">Frequency</th>
              <th className="min-w-[10rem]">No. of Installment</th>
              <th className="min-w-[10rem]">Start Date</th>
              <th className="min-w-[10rem]">End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1.</td>
              <td>Lumabas, Cyrene M.</td>
              <td>Wages</td>
              <td>Overtime Pay</td>
              <td>00.00</td>
              <td>monthly</td>
              <td>1</td>
              <td>Mon Jan 30, 2023</td>
              <td>Mon Jan 30, 2023</td>
              <td>{1 === 1 ? <StatusActive /> : <StatusInactive />}</td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <ServerError />
              </td>
            </tr>
            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                {/*{loading && <TableSpinner />}*/}
                <NoData />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FilterEarningsList;

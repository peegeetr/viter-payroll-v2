import React from "react";
import { Form, Formik } from "formik";
import { MdFilterAlt } from "react-icons/md";
import * as Yup from "yup";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUserType,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import { InputText } from "../../../../helpers/FormInputs";

const SummaryDeductionsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);

  const initVal = {
    payStart_date: "",
    payEnd_date: "",
  };

  const yupSchema = Yup.object({
    payStart_date: Yup.string().required("Required"),
    payEnd_date: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={initVal}
        validationSchema={yupSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          consoleLog(values);
          setLoading(true);
          const result = await fetchApi(
            devApiUrl +
              `/v1/leaves/filter/${values.employee_id}/${values.leave_id}/${values.start_date}/${values.return_date}/${leaveName}/${values.role_is_contributor}`
          );
          consoleLog("result", result);
          if (typeof result === "undefined") {
            consoleLog("undefined");
            setLoading(false);
            dispatch(setError(true));
            dispatch(setMessage("API / Network Error"));
            return;
          }
          if (!result.data) {
            consoleLog("No Data");
            dispatch(setError(true));
            dispatch(setMessage("No Data"));
            setLoading(false);
            return;
          }
          if (result.data) {
            consoleLog("result", result.data);
            setResult(result.data);
            setLoading(false);
          }
        }}
      >
        {(props) => {
          return (
            <Form>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-[1fr_1fr_150px] py-10 items-center">
                <div className="relative">
                  <InputText
                    label="Start Pay Date"
                    name="payStart_date"
                    type="text"
                    disabled={loading}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <div className="relative">
                  <InputText
                    label="End Pay Date"
                    name="payEnd_date"
                    type="text"
                    disabled={loading}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "date")}
                  />
                </div>

                <button
                  className="btn-modal-submit relative"
                  type="submit "
                  disabled={loading || !props.dirty}
                >
                  {loading && <ButtonSpinner />}
                  <MdFilterAlt className="text-lg" />
                  <span>Filter</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="relative text-center">
        <div className=" overflow-x-auto z-0">
          <table>
            <thead>
              <tr className="border-none text-center">
                <th className="text-center" rowSpan="2">
                  #
                </th>
                <th className="min-w-[18rem]" rowSpan="2">
                  Name
                </th>
                <th className="table-border min-w-[12rem]" rowSpan="2">
                  Department
                </th>
                <th className="table-border-center min-w-[8rem]" colSpan="2">
                  SSS
                </th>
                <th className="table-border-center min-w-[8rem]" colSpan="2">
                  Phil. Health
                </th>
                <th className="table-border-center min-w-[5rem]" colSpan="2">
                  Pag-ibig
                </th>
                <th className="table-border-center min-w-[5rem]" colSpan="2">
                  Loans
                </th>
                <th className="table-border min-w-[10rem]" rowSpan="2">
                  With Holding TAX
                </th>
                <th className="table-border min-w-[6rem]" rowSpan="2">
                  PGBG MP2
                </th>
                <th className="table-border min-w-[10rem]" rowSpan="2">
                  Other Deductions
                </th>
                <th
                  className="text-center table-border border-b-[1px] min-w-[5rem]"
                  rowSpan="2"
                >
                  Total EE
                </th>
                <th className=" table-border min-w-[10rem]" rowSpan="2">
                  Total Deductions
                </th>
                <th className="min-w-[5rem] table-border" rowSpan="2">
                  Net Pay
                </th>
              </tr>
              <tr className="text-center">
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">ER</th>
                <th className="table-border">EE</th>
                <th className="table-border">SSS</th>
                <th className="table-border">PGBG</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-right">
                <td className="text-center">1.</td>

                <td className="text-left">Lumabas, Cyrene Mercado</td>
                <td className="text-left">Information Technology</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(10253.53)}</td>
                <td className="px-6">{numberWithCommas(102530.53)}</td>
              </tr>
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <NoData />
                </td>
              </tr>
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SummaryDeductionsList;

import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType, hrisDevApiUrl } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import BankTemplateList from "./BankTemplateList";
import { FaFileDownload } from "react-icons/fa";
import {
  getBankTemplateList,
  handleExportLeave,
} from "./functions-bank-template";
import useQueryData from "../../../custom-hooks/useQueryData";

const BankTemplate = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isShow, setShow] = React.useState(false);
  const [dataExport, setDataExport] = React.useState([]);
  const [exportDate, setExportDate] = React.useState({});
  // use if not loadmore button undertime
  const { data: employee, isLoading: loadingEmployee } = useQueryData(
    // `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    `${hrisDevApiUrl}/v1/employees`, // endpoint
    "get", // method
    "employees", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />
          {isShow && getBankTemplateList(employee, dataExport)?.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  handleExportLeave(
                    getBankTemplateList(employee, dataExport),
                    exportDate
                  )
                }
              >
                <FaFileDownload />
                <span>Export</span>
              </button>
            </div>
          )}
        </div>
        <hr className="print:hidden" />

        <div className="w-full pt-5 pb-20 print:pt-0">
          <BankTemplateList
            employee={employee}
            loadingEmployee={loadingEmployee}
            setShow={setShow}
            setDataExport={setDataExport}
            setExportDate={setExportDate}
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BankTemplate;

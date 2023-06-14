import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import BreadCrumbs from "../../../partials/BreadCrumbs";
import Footer from "../../../partials/Footer";
import Header from "../../../partials/Header";
import Navigation from "../../../partials/Navigation";
import BankTemplateList from "./BankTemplateList";
import { handleExportLeave } from "./functions-bank-template";

const BankTemplate = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [isShow, setShow] = React.useState(false);
  const [dataExport, setDataExport] = React.useState([]);
  const [exportDate, setExportDate] = React.useState({});

  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />
          {isShow && dataExport?.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleExportLeave(dataExport, exportDate)}
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

import { AiFillPrinter } from "react-icons/ai";
import BreadCrumbs from "../../../../partials/BreadCrumbs";
import Footer from "../../../../partials/Footer";
import Header from "../../../../partials/Header";
import Navigation from "../../../../partials/Navigation";
import WTaxSummaryList from "./WTaxSummaryList";

const WTaxSummary = () => {
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper print:pt-0">
        <div className="flex items-center mb-1 justify-between whitespace-nowrap overflow-auto gap-2 print:hidden">
          <BreadCrumbs />
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.print()}
            >
              <AiFillPrinter />
              <span>Print</span>
            </button>
          </div>
        </div>
        <hr className="print:hidden" />

        <div className="w-full pt-5 pb-20 print:pt-0">
          <WTaxSummaryList />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WTaxSummary;

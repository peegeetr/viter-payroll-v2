import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import EmployeeSalaryHistoryLink from "./employee-salary-history/EmployeeSalaryHistoryLink";
import PayBenefitsLink from "./paybenefits/PayBenefitsLink.jsx";
import PayrollSummaryLink from "./payroll-summary/PayrollSummaryLink.jsx";
import PayrunSummaryLink from "./payrun-summary/PayrunSummaryLink";
import SummaryTypeLink from "./paytype/SummaryTypeLink.jsx";
import WTaxLink from "./w-tax/WTaxLink.jsx";

const ReportsLink = () => {
  return (
    <>
      <Header />
      <Navigation menu="reports" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Reports</h4>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <PayrollSummaryLink />
          </li>
          <li className="py-2">
            <WTaxLink />
          </li>
          <li className="py-2">
            <PayrunSummaryLink />
          </li>
          <li className="py-2">
            <SummaryTypeLink />
          </li>
          <li className="py-2">
            <PayBenefitsLink />
          </li>
          <li className="py-2">
            <EmployeeSalaryHistoryLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default ReportsLink;

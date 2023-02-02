import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import FilterDeductionsLink from "./filter/FilterEarningsLink.jsx";
import ManageDeductionLink from "./manage-list/ManageDeductionLink.jsx";

const DeductionsPage = () => {
  return (
    <>
      <Header />
      <Navigation menu="deductions" />
      <div className="wrapper">
        <h4 className="text-xl">Deductions</h4>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <ManageDeductionLink />
          </li>
          <li className="py-2">
            <FilterDeductionsLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default DeductionsPage;

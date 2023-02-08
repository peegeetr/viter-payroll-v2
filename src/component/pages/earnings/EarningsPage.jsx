import Footer from "../../partials/Footer.jsx";
import Header from "../../partials/Header.jsx";
import Navigation from "../../partials/Navigation.jsx";
import FilterEarningsLink from "./filter/FilterEarningsLink.jsx";
import ManageEarningsLink from "./manage-list/ManageEarningsLink.jsx";

const EarningsPage = () => {
  return (
    <>
      <Header />
      <Navigation menu="earnings" />
      <div className="wrapper">
        <h4 className="text-xl mb-3">Earnings</h4>
        <hr />
        <ul className="pt-5 pb-20 relative">
          <li className="py-2">
            <ManageEarningsLink />
          </li>
          <li className="py-2">
            <FilterEarningsLink />
          </li>
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default EarningsPage;

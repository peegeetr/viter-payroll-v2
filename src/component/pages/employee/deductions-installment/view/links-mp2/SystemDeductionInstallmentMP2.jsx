import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import DeductionInstallmentMP2 from "../DeductionInstallmentMP2";

const SystemDeductionInstallmentMP2 = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (
    fbsPayroll.isDev === false ||
    store.credentials.data.role_is_developer !== 1
  ) {
    return <PageNotFound />;
  }
  return (
    <>
      <DeductionInstallmentMP2 />
    </>
  );
};

export default SystemDeductionInstallmentMP2;

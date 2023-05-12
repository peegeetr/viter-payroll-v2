import React from "react";
import { StoreContext } from "../../../../../../store/StoreContext";
import PageNotFound from "../../../../../partials/PageNotFound";
import DeductionInstallmentMP2 from "../DeductionInstallmentMP2";

const OtherUserDeductionInstallmentMP2 = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const fbsPayroll = JSON.parse(localStorage.getItem("fbsPayroll"));

  if (fbsPayroll.isDev === true || store.credentials.data.role_is_admin !== 1) {
    return <PageNotFound />;
  }
  return (
    <>
      <DeductionInstallmentMP2 />
    </>
  );
};

export default OtherUserDeductionInstallmentMP2;

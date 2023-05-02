import React from "react";
import { FaCheck } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  consoleLog,
  devApiUrl,
  devNavUrl,
  getUrlParam,
} from "../../../helpers/functions-general";
import PageNotFound from "../../../partials/PageNotFound";
import ModalError from "../../../partials/modals/ModalError";
import ContentSpinner from "../../../partials/spinners/ContentSpinner";
import FbsLogoLg from "../../../svg/FbsLogoLg";

const ConfirmChangeEmailOtherUser = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const paramKey = getUrlParam().get("key");
  // use if not loadmore button undertime
  const { data: changeEmail, isLoading } = useQueryData(
    `${devApiUrl}/v1/user-others/change-email/${paramKey}`,
    "get", // method
    "changeEmail" // key
  );
  consoleLog(changeEmail);
  return (
    <>
      {isLoading ? (
        <div className="relative h-screen">
          <ContentSpinner />
        </div>
      ) : changeEmail?.added === 1 ? (
        <div
          className="flex justify-center items-center"
          style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
        >
          <div className="max-w-[25rem] w-full text-center p-6">
            <div className="flex justify-center ">
              <FbsLogoLg />
            </div>
            <FaCheck className="mx-auto text-6xl my-2 fill-green-600" />
            <h1 className="text-2xl uppercase mb-2">All Set</h1>

            <p className="mb-6">
              Your email has been successfully set! You can now login using your
              new email
            </p>
            <a href={`${devNavUrl}/login`} className="btn-primary">
              Proceed to Login
            </a>
          </div>
        </div>
      ) : changeEmail?.count === 0 || paramKey === null || paramKey === "" ? (
        <div className="relative h-screen">
          <PageNotFound />
        </div>
      ) : (
        <div className="relative h-screen">
          <PageNotFound />
        </div>
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default ConfirmChangeEmailOtherUser;
import FbsLogoSm from "../svg/FbsLogoSm";

const HeaderPrint = () => {
  return (
    <>
      <div className=" bg-white h-22 border-solid border-b-2 border-primary hidden print:block print:pt-8">
        <span className="flex justify-center pb-2">
          <FbsLogoSm />
        </span>
        <small className="flex justify-center text-center pb-2">
          Frontline Business Solutions, Inc., Baloc Road, Brgy. San Ignacio
          <br />
          San Pablo City, 4000, Laguna, Philippines
        </small>
      </div>
    </>
  );
};

export default HeaderPrint;

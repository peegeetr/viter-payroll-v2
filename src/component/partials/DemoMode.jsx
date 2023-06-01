import { FaInfoCircle } from "react-icons/fa";
const DemoMode = () => {
  return (
    <>
      <div className="absolute left-0 right-0 top-16">
        <div className=" w-[12rem] mx-auto border-2 border-t-0 bg-lightWarning border-[#f09a02] flex items-center px-2 xs:px-[20px] xs:py-[5px] rounded-b-lg">
          <FaInfoCircle className="text-[#f09a02] text-lg" />
          <p className="text-lg m-0 ml-2">Demo mode</p>
        </div>
      </div>
    </>
  );
};

export default DemoMode;

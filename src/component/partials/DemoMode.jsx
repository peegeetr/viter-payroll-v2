import { FaInfoCircle } from "react-icons/fa";
const DemoMode = () => {
  return (
    <>
      <div className="absolute left-0 right-0 top-16">
        <div className=" w-[10rem] mx-auto border-2 border-t-0 bg-lightWarning border-[#f09a02] flex justify-center items-center py-[2px] rounded-b-lg">
          <FaInfoCircle className="text-[#f09a02] text-base" />
          <p className="text-base m-0 ml-2">Demo mode</p>
        </div>
      </div>
    </>
  );
};

export default DemoMode;

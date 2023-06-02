import { FaInfoCircle } from "react-icons/fa";
const DemoMode = () => {
  return (
    <>
      <div className="fixed  left-0 md:right-0 top-16 md:top-8 md:z-30">
        <div className=" w-[9rem] md:w-[10rem] mx-auto border-2 border-t-0 md:border-t-2 bg-lightWarning border-[#f09a02] flex justify-center items-center py-0 md:py-[2px] md:rounded-t-lg md:rounded-sm rounded-b-lg ">
          <FaInfoCircle className="text-[#f09a02] text-md md:text-base" />
          <p className="text-md m-0 ml-2 md:text-base">Demo mode</p>
        </div>
      </div>
    </>
  );
};

export default DemoMode;

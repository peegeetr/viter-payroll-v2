import React from "react";
import { TbWorldOff } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2 h-[70vh] p-5">
        <span className="text-8xl">
          <TbWorldOff />
        </span>
        <h3 className="text-6xl">404</h3>
        <h2 className="font-bold text-2xl">Page not found</h2>
        <p className="text-sm m-0"> Plase check your URL</p>
      </div>
    </>
  );
};

export default PageNotFound;

const PayslipList = () => {
  return (
    <>
      <div className="relative overflow-x-auto z-0">
        <div className="xs:grid grid-cols-2 mb-5">
          <p className="mb-0">
            <span className="font-semibold">Employee : </span> Lumabas, Cyrene
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Day : </span> Jan 15 2023
          </p>
          <p className="mb-0">
            <span className="font-semibold">Department : </span> IT
          </p>
          <p className="mb-0">
            <span className="font-semibold">Frequency : </span> Semi-monthly
          </p>
          <p className="mb-0">
            <span className="font-semibold">Position : </span> Developer
          </p>
          <p className="mb-0">
            <span className="font-semibold">Pay Period : </span> Jan 1 - 15 2023
          </p>
        </div>
      </div>

      <div className="relative text-center overflow-x-auto z-0 ">
        <table>
          <tbody>
            <tr className="font-semibold bg-gray-200 hover:bg-gray-200">
              <td className="w-[20rem]">WAGES</td>
              <td className="w-[10rem]">HOURS</td>
              <td>RATE</td>
              <td>TOTAL</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Basic Pay (Deminimis inclusive)</td>
              <td className="w-[10rem]">88</td>
              <td>101.8182</td>
              <td>8,960.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Deminimis</td>
              <td className="w-[10rem]"></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[20rem]">Absences</td>
              <td className="w-[10rem]">8</td>
              <td>101.8182</td>
              <td>-814.55</td>
            </tr>
            <tr>
              <td className="w-[20rem]">SPC Coco Festival (Holiday)</td>
              <td className="w-[10rem]">8</td>
              <td>130%(132.36)</td>
              <td>1,058.91</td>
            </tr>
            <tr className="font-semibold bg-gray-200 hover:bg-gray-200">
              <td colSpan={2}></td>
              <td>TOTAL WAGES</td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}></td>
            </tr>
            {/* 2nd */}
            <tr className="font-semibold bg-gray-200 hover:bg-gray-200">
              <td colSpan={4} className="w-[20rem]">
                Employee Contributions
              </td>
            </tr>
            <tr>
              <td className="w-[20rem]">Basic Pay (Deminimis inclusive)</td>
              <td className="w-[10rem]">88</td>
              <td>101.8182</td>
              <td>8,960.00</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Deminimis</td>
              <td className="w-[10rem]"></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="w-[20rem]">Absences</td>
              <td className="w-[10rem]">8</td>
              <td>101.8182</td>
              <td>-814.55</td>
            </tr>
            <tr>
              <td className="w-[20rem]">Absences</td>
              <td className="w-[10rem]">8</td>
              <td>101.8182</td>
              <td>-814.55</td>
            </tr>
            <tr className="font-semibold bg-gray-200 hover:bg-gray-200">
              <td colSpan={2}></td>
              <td>TOTAL EMPLOYEE CONTRIBUTIONS</td>
              <td>9,830.55</td>
            </tr>
            <tr>
              <td colSpan={4}>&nbsp;</td>
            </tr>
            <tr className="font-semibold bg-gray-100 hover:bg-gray-100">
              <td colSpan={2}></td>
              <td>TOTAL EARNINGS</td>
              <td>9,830.55</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PayslipList;

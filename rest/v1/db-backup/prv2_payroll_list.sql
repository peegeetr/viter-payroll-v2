-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2023 at 02:19 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fbs_payroll_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `prv2_payroll_list`
--

CREATE TABLE `prv2_payroll_list` (
  `payroll_list_aid` int(11) NOT NULL,
  `payroll_list_is_paid` tinyint(1) NOT NULL,
  `payroll_list_employee_name` varchar(100) NOT NULL,
  `payroll_list_employee_email` varchar(200) NOT NULL,
  `payroll_list_employee_department` varchar(150) NOT NULL,
  `payroll_list_employee_id` varchar(20) NOT NULL,
  `payroll_list_employee_salary` varchar(20) NOT NULL,
  `payroll_list_pagibig_additional` varchar(20) NOT NULL,
  `payroll_list_employee_work_on_holiday` smallint(2) NOT NULL,
  `payroll_list_night_diff_per_day` smallint(2) NOT NULL,
  `payroll_list_payroll_id` varchar(20) NOT NULL,
  `payroll_list_gross` varchar(20) NOT NULL,
  `payroll_list_deduction` varchar(20) NOT NULL,
  `payroll_list_net_pay` varchar(20) NOT NULL,
  `payroll_list_basic_pay` varchar(20) NOT NULL,
  `payroll_list_overtime_pay` varchar(20) NOT NULL,
  `payroll_list_overtime_hrs` varchar(20) NOT NULL,
  `payroll_list_overtime_rate` varchar(20) NOT NULL,
  `payroll_list_leave_pay` varchar(20) NOT NULL,
  `payroll_list_leave_hrs` varchar(20) NOT NULL,
  `payroll_list_leave_rate` varchar(20) NOT NULL,
  `payroll_list_holiday` varchar(20) NOT NULL,
  `payroll_list_holiday_hrs` varchar(20) NOT NULL,
  `payroll_list_holiday_rate` varchar(20) NOT NULL,
  `payroll_list_inlfation_adjustment` varchar(20) NOT NULL,
  `payroll_list_adjustment_pay` varchar(20) NOT NULL,
  `payroll_list_night_shift_differential` varchar(20) NOT NULL,
  `payroll_list_nd_hrs` varchar(20) NOT NULL,
  `payroll_list_nd_rate` varchar(20) NOT NULL,
  `payroll_list_hazard_pay` varchar(20) NOT NULL,
  `payroll_list_absences` varchar(20) NOT NULL,
  `payroll_list_absences_hrs` varchar(5) NOT NULL,
  `payroll_list_absences_rate` varchar(5) NOT NULL,
  `payroll_list_deminimis` varchar(20) NOT NULL,
  `payroll_list_13th_month` varchar(20) NOT NULL,
  `payroll_list_bonus` varchar(20) NOT NULL,
  `payroll_list_employee_referral_bonus` varchar(20) NOT NULL,
  `payroll_list_bereavement` varchar(20) NOT NULL,
  `payroll_list_separation_pay` varchar(20) NOT NULL,
  `payroll_list_other_allowances` varchar(20) NOT NULL,
  `payroll_list_total_benefits` varchar(20) NOT NULL,
  `payroll_list_sss_er` varchar(20) NOT NULL,
  `payroll_list_philhealth_er` varchar(20) NOT NULL,
  `payroll_list_pagibig_er` varchar(20) NOT NULL,
  `payroll_list_hmo_er` varchar(20) NOT NULL,
  `payroll_list_sss_ee` varchar(20) NOT NULL,
  `payroll_list_philhealth_ee` varchar(20) NOT NULL,
  `payroll_list_pagibig_ee` varchar(20) NOT NULL,
  `payroll_list_hmo_ee` varchar(20) NOT NULL,
  `payroll_list_sss_loan` varchar(20) NOT NULL,
  `payroll_list_pagibig_loan` varchar(20) NOT NULL,
  `payroll_list_pagibig_mp2` varchar(20) NOT NULL,
  `payroll_list_fwc_tithes` varchar(20) NOT NULL,
  `payroll_list_fca_tuition` varchar(20) NOT NULL,
  `payroll_list_other_deduction` varchar(20) NOT NULL,
  `payroll_list_madatory_ee` varchar(20) NOT NULL,
  `payroll_list_tax` varchar(20) NOT NULL,
  `payroll_list_undertime` varchar(20) NOT NULL,
  `payroll_list_created` datetime NOT NULL,
  `payroll_list_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_payroll_list`
--

INSERT INTO `prv2_payroll_list` (`payroll_list_aid`, `payroll_list_is_paid`, `payroll_list_employee_name`, `payroll_list_employee_email`, `payroll_list_employee_department`, `payroll_list_employee_id`, `payroll_list_employee_salary`, `payroll_list_pagibig_additional`, `payroll_list_employee_work_on_holiday`, `payroll_list_night_diff_per_day`, `payroll_list_payroll_id`, `payroll_list_gross`, `payroll_list_deduction`, `payroll_list_net_pay`, `payroll_list_basic_pay`, `payroll_list_overtime_pay`, `payroll_list_overtime_hrs`, `payroll_list_overtime_rate`, `payroll_list_leave_pay`, `payroll_list_leave_hrs`, `payroll_list_leave_rate`, `payroll_list_holiday`, `payroll_list_holiday_hrs`, `payroll_list_holiday_rate`, `payroll_list_inlfation_adjustment`, `payroll_list_adjustment_pay`, `payroll_list_night_shift_differential`, `payroll_list_nd_hrs`, `payroll_list_nd_rate`, `payroll_list_hazard_pay`, `payroll_list_absences`, `payroll_list_absences_hrs`, `payroll_list_absences_rate`, `payroll_list_deminimis`, `payroll_list_13th_month`, `payroll_list_bonus`, `payroll_list_employee_referral_bonus`, `payroll_list_bereavement`, `payroll_list_separation_pay`, `payroll_list_other_allowances`, `payroll_list_total_benefits`, `payroll_list_sss_er`, `payroll_list_philhealth_er`, `payroll_list_pagibig_er`, `payroll_list_hmo_er`, `payroll_list_sss_ee`, `payroll_list_philhealth_ee`, `payroll_list_pagibig_ee`, `payroll_list_hmo_ee`, `payroll_list_sss_loan`, `payroll_list_pagibig_loan`, `payroll_list_pagibig_mp2`, `payroll_list_fwc_tithes`, `payroll_list_fca_tuition`, `payroll_list_other_deduction`, `payroll_list_madatory_ee`, `payroll_list_tax`, `payroll_list_undertime`, `payroll_list_created`, `payroll_list_datetime`) VALUES
(41, 1, 'Lumabas cycy', 'cyrene.lumabas@frontlinebusiness.com.ph', 'IT', '1', '20000', '20', 0, 0, 'PR-001', '10000.00', '5.00', '9995.00', '10000.00', '0.00', '0.0000', '', '0.00', '0', '', '0.00', '0', '', '0.00', '0.00', '0.00', '0.00', '', '0.00', '0.00', '0', '', '10', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '2023-04-20 15:04:25', '2023-04-20 15:07:11'),
(42, 1, 'Lumabas zaicy', 'cyrenemlumabas@gmail.com', 'Accounting', '2', '15000', '10', 0, 5, 'PR-001', '7968.75', '5.00', '7963.75', '7500.00', '0.00', '0.0000', '', '0.00', '0', '', '0.00', '0', '', '0.00', '0.00', '468.75', '50.00', '', '0.00', '0.00', '0', '', '20', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '5.00', '0.00', '0.00', '2023-04-20 15:04:25', '2023-04-20 15:07:11'),
(45, 0, 'Lumabas cycy', 'cyrene.lumabas@frontlinebusiness.com.ph', 'IT', '1', '20000', '20', 0, 0, 'PR-002', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '10', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-04-24 08:17:39', '2023-04-24 08:17:39'),
(46, 0, 'Lumabas zaicy', 'cyrenemlumabas@gmail.com', 'Accounting', '2', '15000', '10', 0, 5, 'PR-002', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '20', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2023-04-24 08:17:39', '2023-04-24 08:17:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_payroll_list`
--
ALTER TABLE `prv2_payroll_list`
  ADD PRIMARY KEY (`payroll_list_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_payroll_list`
--
ALTER TABLE `prv2_payroll_list`
  MODIFY `payroll_list_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

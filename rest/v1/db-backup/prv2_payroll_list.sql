-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2023 at 06:37 AM
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
  `payroll_list_leave_pay` varchar(20) NOT NULL,
  `payroll_list_holiday` varchar(20) NOT NULL,
  `payroll_list_inlfation_adjustment` varchar(20) NOT NULL,
  `payroll_list_adjustment_pay` varchar(20) NOT NULL,
  `payroll_list_night_shift_differential` varchar(20) NOT NULL,
  `payroll_list_hazard_pay` varchar(20) NOT NULL,
  `payroll_list_absences` varchar(20) NOT NULL,
  `payroll_list_deminimis` varchar(20) NOT NULL,
  `payroll_list_13th_month` varchar(20) NOT NULL,
  `payroll_list_bonus` varchar(20) NOT NULL,
  `payroll_list_employee_referral_bonus` varchar(20) NOT NULL,
  `payroll_list_bereavement` varchar(20) NOT NULL,
  `payroll_list_separation_pay` varchar(20) NOT NULL,
  `payroll_list_other_allowances` varchar(20) NOT NULL,
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
  `payroll_list_tax` varchar(20) NOT NULL,
  `payroll_list_undertime` varchar(20) NOT NULL,
  `payroll_list_created` datetime NOT NULL,
  `payroll_list_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `payroll_list_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

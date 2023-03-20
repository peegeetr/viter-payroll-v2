-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2023 at 06:10 AM
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
-- Table structure for table `prv2_deduction`
--

CREATE TABLE `prv2_deduction` (
  `deduction_aid` int(11) NOT NULL,
  `deduction_payroll_id` varchar(20) NOT NULL,
  `deduction_payroll_type_id` varchar(10) NOT NULL,
  `deduction_num_pay` smallint(2) NOT NULL,
  `deduction_is_paid` tinyint(1) NOT NULL,
  `deduction_employee` varchar(20) NOT NULL,
  `deduction_employee_id` varchar(20) NOT NULL,
  `deduction_paytype_id` varchar(20) NOT NULL,
  `deduction_payitem_id` varchar(20) NOT NULL,
  `deduction_amount` varchar(20) NOT NULL,
  `deduction_details` varchar(100) NOT NULL,
  `deduction_frequency` varchar(5) NOT NULL,
  `deduction_is_installment` varchar(5) NOT NULL,
  `deduction_number_of_installment` smallint(2) NOT NULL,
  `deduction_start_pay_date` varchar(20) NOT NULL,
  `deduction_end_pay_date` varchar(20) NOT NULL,
  `deduction_created` datetime NOT NULL,
  `deduction_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prv2_earnings`
--

CREATE TABLE `prv2_earnings` (
  `earnings_aid` int(11) NOT NULL,
  `earnings_payroll_id` varchar(20) NOT NULL,
  `earnings_payroll_type_id` varchar(10) NOT NULL,
  `earnings_is_paid` tinyint(1) NOT NULL,
  `earnings_num_pay` smallint(2) NOT NULL,
  `earnings_employee` varchar(100) NOT NULL,
  `earnings_employee_id` varchar(20) NOT NULL,
  `earnings_paytype_id` varchar(20) NOT NULL,
  `earnings_payitem_id` varchar(20) NOT NULL,
  `earnings_amount` varchar(20) NOT NULL,
  `earnings_details` varchar(100) NOT NULL,
  `earnings_frequency` varchar(5) NOT NULL,
  `earnings_is_installment` varchar(5) NOT NULL,
  `earnings_number_of_installment` smallint(2) NOT NULL,
  `earnings_start_pay_date` varchar(20) NOT NULL,
  `earnings_end_pay_date` varchar(20) NOT NULL,
  `earnings_hris_date` varchar(20) NOT NULL,
  `earnings_holidays_rate` varchar(5) NOT NULL,
  `earnings_hris_undertime_out` varchar(10) NOT NULL,
  `earnings_created` datetime NOT NULL,
  `earnings_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prv2_holidays`
--

CREATE TABLE `prv2_holidays` (
  `holidays_aid` int(11) NOT NULL,
  `holidays_name` varchar(100) NOT NULL,
  `holidays_date` varchar(20) NOT NULL,
  `holidays_type` varchar(30) NOT NULL,
  `holidays_rate` varchar(20) NOT NULL,
  `holidays_is_active` tinyint(1) NOT NULL,
  `holidays_observed` tinyint(1) NOT NULL,
  `holidays_created` datetime NOT NULL,
  `holidays_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_holidays`
--

INSERT INTO `prv2_holidays` (`holidays_aid`, `holidays_name`, `holidays_date`, `holidays_type`, `holidays_rate`, `holidays_is_active`, `holidays_observed`, `holidays_created`, `holidays_datetime`) VALUES
(25, 'test', '2023-03-13', 'special', '130', 1, 1, '2023-03-20 13:01:33', '2023-03-20 13:01:33'),
(26, 'test2', '2023-03-13', 'special', '130', 1, 1, '2023-03-20 13:01:43', '2023-03-20 13:01:43'),
(27, 'test3', '2023-03-14', 'regular', '200', 1, 1, '2023-03-20 13:01:55', '2023-03-20 13:01:55');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_payitem`
--

CREATE TABLE `prv2_payitem` (
  `payitem_aid` int(11) NOT NULL,
  `payitem_is_active` tinyint(1) NOT NULL,
  `payitem_name` varchar(100) NOT NULL,
  `payitem_is_hris` tinyint(1) NOT NULL,
  `payitem_paytype_id` varchar(20) NOT NULL,
  `payitem_created` datetime NOT NULL,
  `payitem_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_payitem`
--

INSERT INTO `prv2_payitem` (`payitem_aid`, `payitem_is_active`, `payitem_name`, `payitem_is_hris`, `payitem_paytype_id`, `payitem_created`, `payitem_datetime`) VALUES
(1, 1, 'Bonus', 0, '11', '2023-02-02 00:00:00', '2023-02-06 15:32:22'),
(6, 1, 'Employee Referral Bonus', 0, '11', '2023-02-02 00:00:00', '2023-02-02 10:22:28'),
(7, 1, 'Bereavement', 0, '11', '2023-02-02 00:00:00', '2023-02-10 12:29:04'),
(8, 1, 'Separation Pay', 0, '11', '2023-02-02 00:00:00', '2023-02-02 10:22:44'),
(9, 1, 'Other Allowances', 0, '11', '2023-02-02 00:00:00', '2023-02-02 10:22:53'),
(11, 1, 'De Minimis', 0, '10', '2023-02-02 00:00:00', '2023-02-10 12:30:27'),
(13, 1, 'SSS Er', 0, '12', '2023-02-02 00:00:00', '2023-02-02 10:27:16'),
(14, 1, 'PHIC Er', 0, '12', '2023-02-02 00:00:00', '2023-02-02 10:27:23'),
(15, 1, 'PGBG Er', 0, '12', '2023-02-02 00:00:00', '2023-02-02 10:27:30'),
(16, 1, 'HMO Er', 0, '12', '2023-02-02 00:00:00', '2023-02-02 10:27:38'),
(18, 1, 'Overtime Pay', 1, '1', '2023-02-02 00:00:00', '2023-02-07 07:09:02'),
(19, 1, 'Paid Leave', 1, '1', '2023-02-02 00:00:00', '2023-02-07 07:09:16'),
(20, 1, 'Holiday', 0, '1', '2023-02-02 00:00:00', '2023-02-02 10:28:26'),
(21, 1, 'Inflation Adjustment', 0, '1', '2023-02-02 00:00:00', '2023-02-02 10:28:33'),
(22, 1, 'Pay Adjustment', 0, '1', '2023-02-02 00:00:00', '2023-02-02 10:28:38'),
(23, 1, 'Night Shift Differential', 1, '1', '2023-02-02 00:00:00', '2023-02-07 07:09:33'),
(24, 1, 'Hazard Pay', 0, '1', '2023-02-02 00:00:00', '2023-02-02 10:28:52'),
(25, 1, 'SSS', 0, '13', '2023-02-02 00:00:00', '2023-03-16 11:56:46'),
(26, 1, 'Philhealth', 0, '13', '2023-02-02 00:00:00', '2023-02-02 10:29:49'),
(27, 1, 'Pag-Ibig', 0, '13', '2023-02-02 00:00:00', '2023-03-16 11:56:53'),
(28, 1, 'SSS Loan', 0, '14', '2023-02-02 00:00:00', '2023-02-02 10:30:35'),
(29, 1, 'Pag-Ibig Loan', 0, '14', '2023-02-02 00:00:00', '2023-02-02 10:30:42'),
(30, 1, 'Pag-Ibig MP2', 0, '14', '2023-02-02 00:00:00', '2023-02-02 10:30:48'),
(31, 1, 'FWC- Tithes', 0, '15', '2023-02-02 00:00:00', '2023-02-02 10:31:21'),
(32, 1, 'FCA- Tuition', 0, '15', '2023-02-02 00:00:00', '2023-02-02 10:31:27'),
(33, 1, 'Other Deductions', 0, '15', '2023-02-02 00:00:00', '2023-02-02 10:31:32'),
(34, 1, 'Payroll Tax', 0, '16', '2023-02-02 00:00:00', '2023-02-02 10:32:09'),
(36, 1, 'Absences', 1, '1', '2023-02-06 00:00:00', '2023-02-07 07:09:23'),
(43, 1, 'Undertime', 1, '1', '2023-02-17 00:00:00', '2023-02-17 12:30:27'),
(45, 0, 'asdfasdfadsfasdf', 0, '11', '2023-03-09 15:42:09', '2023-03-09 15:42:31'),
(46, 0, 'asdfa', 0, '11', '2023-03-09 15:42:18', '2023-03-09 15:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_payroll`
--

CREATE TABLE `prv2_payroll` (
  `payroll_aid` int(11) NOT NULL,
  `payroll_id` varchar(20) NOT NULL,
  `payroll_is_paid` tinyint(1) NOT NULL,
  `payroll_start_date` varchar(20) NOT NULL,
  `payroll_end_date` varchar(20) NOT NULL,
  `payroll_pay_date` varchar(20) NOT NULL,
  `payroll_category_type` varchar(20) NOT NULL,
  `payroll_created` datetime NOT NULL,
  `payroll_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prv2_payroll_list`
--

CREATE TABLE `prv2_payroll_list` (
  `payroll_list_aid` int(11) NOT NULL,
  `payroll_list_is_paid` tinyint(1) NOT NULL,
  `payroll_list_employee_name` varchar(100) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `prv2_paytype`
--

CREATE TABLE `prv2_paytype` (
  `paytype_aid` int(11) NOT NULL,
  `paytype_is_active` tinyint(1) NOT NULL,
  `paytype_category` varchar(10) NOT NULL,
  `paytype_name` varchar(100) NOT NULL,
  `paytype_description` text NOT NULL,
  `paytype_created` datetime NOT NULL,
  `paytype_datetime` datetime NOT NULL,
  `paytype_is_wages` tinyint(1) NOT NULL,
  `paytype_is_de` tinyint(1) NOT NULL,
  `paytype_is_13th` tinyint(1) NOT NULL,
  `paytype_is_employee` tinyint(1) NOT NULL,
  `paytype_is_mandatory` tinyint(1) NOT NULL,
  `paytype_is_optional` tinyint(1) NOT NULL,
  `paytype_is_other` tinyint(1) NOT NULL,
  `paytype_is_tax` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_paytype`
--

INSERT INTO `prv2_paytype` (`paytype_aid`, `paytype_is_active`, `paytype_category`, `paytype_name`, `paytype_description`, `paytype_created`, `paytype_datetime`, `paytype_is_wages`, `paytype_is_de`, `paytype_is_13th`, `paytype_is_employee`, `paytype_is_mandatory`, `paytype_is_optional`, `paytype_is_other`, `paytype_is_tax`) VALUES
(1, 1, 'earnings', 'wages', 'Manage what actions and capabilities every account are can\n                    perform in the system.', '2023-02-01 00:00:00', '2023-02-01 14:50:26', 1, 0, 0, 0, 0, 0, 0, 0),
(10, 1, 'earnings', 'De Minimis', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 08:17:44', 0, 1, 0, 0, 0, 0, 0, 0),
(11, 1, 'earnings', '13th month & other benefits', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-10 12:11:55', 0, 0, 1, 0, 0, 0, 0, 0),
(12, 1, 'earnings', 'Employee Contributions', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 08:20:30', 0, 0, 0, 1, 0, 0, 0, 0),
(13, 1, 'deductions', 'Mandatory Deductions', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 08:21:07', 0, 0, 0, 0, 1, 0, 0, 0),
(14, 1, 'deductions', 'Optional Deductions', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 08:21:29', 0, 0, 0, 0, 0, 1, 0, 0),
(15, 1, 'deductions', 'Other Deductions', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 08:21:45', 0, 0, 0, 0, 0, 0, 1, 0),
(16, 1, 'deductions', 'Tax', 'Manage what actions and capabilities every account are can perform in the system.', '2023-02-02 00:00:00', '2023-02-02 11:56:07', 0, 0, 0, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_pagibig`
--

CREATE TABLE `prv2_settings_pagibig` (
  `pagibig_aid` int(11) NOT NULL,
  `pagibig_er_amount` int(11) NOT NULL,
  `pagibig_ee_amount` int(11) NOT NULL,
  `pagibig_created` datetime NOT NULL,
  `pagibig_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_pagibig`
--

INSERT INTO `prv2_settings_pagibig` (`pagibig_aid`, `pagibig_er_amount`, `pagibig_ee_amount`, `pagibig_created`, `pagibig_datetime`) VALUES
(1, 50, 50, '2023-03-13 13:48:28', '2023-03-13 13:48:28');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_payroll_type`
--

CREATE TABLE `prv2_settings_payroll_type` (
  `payroll_type_aid` int(11) NOT NULL,
  `payroll_type_active` tinyint(1) NOT NULL,
  `payroll_type_name` varchar(100) NOT NULL,
  `payroll_type_created` datetime NOT NULL,
  `payroll_type_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_payroll_type`
--

INSERT INTO `prv2_settings_payroll_type` (`payroll_type_aid`, `payroll_type_active`, `payroll_type_name`, `payroll_type_created`, `payroll_type_datetime`) VALUES
(6, 1, 'salary', '2023-03-09 09:09:27', '2023-03-09 09:09:27'),
(7, 1, 'bonus', '2023-03-09 09:09:32', '2023-03-09 09:09:32'),
(8, 1, '13th month', '2023-03-09 09:09:36', '2023-03-09 09:09:36');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_philhealth`
--

CREATE TABLE `prv2_settings_philhealth` (
  `philhealth_aid` int(11) NOT NULL,
  `philhealth_percentage` smallint(4) NOT NULL,
  `philhealth_min` int(11) NOT NULL,
  `philhealth_max` int(11) NOT NULL,
  `philhealth_created` datetime NOT NULL,
  `philhealth_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_philhealth`
--

INSERT INTO `prv2_settings_philhealth` (`philhealth_aid`, `philhealth_percentage`, `philhealth_min`, `philhealth_max`, `philhealth_created`, `philhealth_datetime`) VALUES
(1, 4, 400, 3200, '2023-03-06 14:32:07', '2023-03-13 14:17:24');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_rates`
--

CREATE TABLE `prv2_settings_rates` (
  `rates_aid` int(11) NOT NULL,
  `rates_active` tinyint(1) NOT NULL,
  `rates_name` varchar(100) NOT NULL,
  `rates_percent` varchar(20) NOT NULL,
  `rates_paytype_id` varchar(20) NOT NULL,
  `rates_payitems_id` varchar(20) NOT NULL,
  `rates_created` datetime NOT NULL,
  `rates_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_rates`
--

INSERT INTO `prv2_settings_rates` (`rates_aid`, `rates_active`, `rates_name`, `rates_percent`, `rates_paytype_id`, `rates_payitems_id`, `rates_created`, `rates_datetime`) VALUES
(16, 1, 'Overtime rest day & holidays', '130', '1', '18', '2023-02-21 01:46:42', '2023-03-09 09:08:49'),
(17, 1, 'Overtime regular days', '125', '1', '18', '2023-02-21 01:50:37', '2023-02-21 01:50:37'),
(18, 1, 'Night Differential (10pm-6am)', '110', '1', '23', '2023-02-21 01:50:37', '2023-02-21 01:50:37'),
(19, 1, 'Holiday Special or Rest day', '130', '1', '20', '2023-02-21 01:50:37', '2023-02-21 01:50:37'),
(20, 1, 'Holiday Special and Rest Day', '150', '1', '20', '2023-02-21 01:50:37', '2023-02-21 01:50:37'),
(21, 1, 'Holiday Regular and Rest Day', '230', '1', '20', '2023-02-21 01:53:57', '2023-02-21 01:53:57'),
(22, 1, 'Holiday Regular', '200', '1', '20', '2023-02-21 01:53:57', '2023-02-21 01:53:57');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_role`
--

CREATE TABLE `prv2_settings_role` (
  `role_aid` int(11) NOT NULL,
  `role_is_active` tinyint(1) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `role_description` text NOT NULL,
  `role_created` varchar(20) NOT NULL,
  `role_datetime` datetime NOT NULL,
  `role_is_developer` tinyint(1) NOT NULL,
  `role_is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_role`
--

INSERT INTO `prv2_settings_role` (`role_aid`, `role_is_active`, `role_name`, `role_description`, `role_created`, `role_datetime`, `role_is_developer`, `role_is_admin`) VALUES
(14, 1, 'Developer', 'for developer', '2023-02-03', '2023-02-06 06:53:33', 1, 0),
(19, 1, 'Admin', 'For all admin', '2023-03-03 07:23:20', '2023-03-03 07:23:20', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_semi_monthly`
--

CREATE TABLE `prv2_settings_semi_monthly` (
  `semi_monthly_aid` int(11) NOT NULL,
  `semi_monthly_active` tinyint(1) NOT NULL,
  `semi_monthly_range_from` varchar(50) NOT NULL,
  `semi_monthly_range_to` varchar(50) NOT NULL,
  `semi_monthly_less_amount` varchar(50) NOT NULL,
  `semi_monthly_rate` varchar(50) NOT NULL,
  `semi_monthly_additional_amount` varchar(50) NOT NULL,
  `semi_monthly_created` varchar(20) NOT NULL,
  `semi_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_semi_monthly`
--

INSERT INTO `prv2_settings_semi_monthly` (`semi_monthly_aid`, `semi_monthly_active`, `semi_monthly_range_from`, `semi_monthly_range_to`, `semi_monthly_less_amount`, `semi_monthly_rate`, `semi_monthly_additional_amount`, `semi_monthly_created`, `semi_monthly_datetime`) VALUES
(6, 1, '111', '11', '111', '2', '111', '2023-03-09 12:42:15', '2023-03-09 12:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_sss_bracket`
--

CREATE TABLE `prv2_settings_sss_bracket` (
  `sss_bracket_aid` int(11) NOT NULL,
  `sss_bracket_range_from` varchar(50) NOT NULL,
  `sss_bracket_range_to` varchar(50) NOT NULL,
  `sss_bracket_er` varchar(50) NOT NULL,
  `sss_bracket_ee` varchar(50) NOT NULL,
  `sss_bracket_total` varchar(50) NOT NULL,
  `sss_bracket_created` varchar(20) NOT NULL,
  `sss_bracket_datetime` datetime NOT NULL,
  `sss_bracket_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_sss_bracket`
--

INSERT INTO `prv2_settings_sss_bracket` (`sss_bracket_aid`, `sss_bracket_range_from`, `sss_bracket_range_to`, `sss_bracket_er`, `sss_bracket_ee`, `sss_bracket_total`, `sss_bracket_created`, `sss_bracket_datetime`, `sss_bracket_active`) VALUES
(10, '100', '200', '100', '50', '150', '2023-03-09 12:18:46', '2023-03-09 12:19:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_tax_monthly`
--

CREATE TABLE `prv2_settings_tax_monthly` (
  `tax_monthly_aid` int(11) NOT NULL,
  `tax_monthly_active` tinyint(1) NOT NULL,
  `tax_monthly_range_from` varchar(50) NOT NULL,
  `tax_monthly_range_to` varchar(50) NOT NULL,
  `tax_monthly_less_amount` varchar(50) NOT NULL,
  `tax_monthly_rate` varchar(50) NOT NULL,
  `tax_monthly_additional_amount` varchar(50) NOT NULL,
  `tax_monthly_created` varchar(20) NOT NULL,
  `tax_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_tax_monthly`
--

INSERT INTO `prv2_settings_tax_monthly` (`tax_monthly_aid`, `tax_monthly_active`, `tax_monthly_range_from`, `tax_monthly_range_to`, `tax_monthly_less_amount`, `tax_monthly_rate`, `tax_monthly_additional_amount`, `tax_monthly_created`, `tax_monthly_datetime`) VALUES
(4, 1, '2000', '3000', '234', '1234', '1234', '2023-02-03', '2023-03-09 12:23:26'),
(5, 1, '111', '11', '1', '1', '1', '2023-02-03', '2023-03-09 12:23:33');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_user_other`
--

CREATE TABLE `prv2_settings_user_other` (
  `user_other_aid` int(11) NOT NULL,
  `user_other_is_active` tinyint(1) NOT NULL,
  `user_other_name` varchar(50) NOT NULL,
  `user_other_email` varchar(200) NOT NULL,
  `user_other_role_id` int(11) NOT NULL,
  `user_other_key` varchar(255) NOT NULL,
  `user_other_password` varchar(255) NOT NULL,
  `user_other_created` varchar(20) NOT NULL,
  `user_other_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_user_other`
--

INSERT INTO `prv2_settings_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_name`, `user_other_email`, `user_other_role_id`, `user_other_key`, `user_other_password`, `user_other_created`, `user_other_datetime`) VALUES
(16, 1, 'Zaicy', 'cyrenemlumabas@gmail.com', 19, '07aafa6d514e9e150dbb3c650fb7d0eea5bd5f20af06ff1c6962339e66fbae16', '$2y$10$ZPx3T5NbBH6sJlFWKMPmBOR4n2OSMwgW8iXuK6DQqWi2WS/Fy4SfK', '2023-03-03 07:23:42', '2023-03-09 07:31:13'),
(18, 1, 'cyrene lumabas', 'cyrene.lumabas@frontlinebusiness.com.ph', 19, '8b1aa4559512550389614545955c25422787528bf734cf24159446abda2f7f17', '', '2023-03-08 10:07:12', '2023-03-08 10:07:12');

-- --------------------------------------------------------

--
-- Table structure for table `prv2_settings_user_system`
--

CREATE TABLE `prv2_settings_user_system` (
  `user_system_aid` int(11) NOT NULL,
  `user_system_is_active` tinyint(1) NOT NULL,
  `user_system_name` varchar(128) NOT NULL,
  `user_system_email` varchar(255) NOT NULL,
  `user_system_role_id` int(11) NOT NULL,
  `user_system_key` varchar(255) NOT NULL,
  `user_system_password` varchar(255) NOT NULL,
  `user_system_created` varchar(20) NOT NULL,
  `user_system_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_user_system`
--

INSERT INTO `prv2_settings_user_system` (`user_system_aid`, `user_system_is_active`, `user_system_name`, `user_system_email`, `user_system_role_id`, `user_system_key`, `user_system_password`, `user_system_created`, `user_system_datetime`) VALUES
(11, 1, 'Lumabas Cyrene', 'cyrene.lumabas@frontlinebusiness.com.ph', 14, 'a57c331364db9e63c29b67e8d068a13d476b6aa74a0eb9b87739bfeab278ed73', '$2y$10$ZPx3T5NbBH6sJlFWKMPmBOR4n2OSMwgW8iXuK6DQqWi2WS/Fy4SfK', '2023-03-01', '2023-03-13 07:05:41'),
(13, 1, 'zaicys', 'april9rhina@gmail.com', 14, '074027ea1bc18626d2207043ebe8dad17e242304e1d87fe91dade0746a8b901e', '', '2023-03-02 15:04:26', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_deduction`
--
ALTER TABLE `prv2_deduction`
  ADD PRIMARY KEY (`deduction_aid`);

--
-- Indexes for table `prv2_earnings`
--
ALTER TABLE `prv2_earnings`
  ADD PRIMARY KEY (`earnings_aid`);

--
-- Indexes for table `prv2_holidays`
--
ALTER TABLE `prv2_holidays`
  ADD PRIMARY KEY (`holidays_aid`);

--
-- Indexes for table `prv2_payitem`
--
ALTER TABLE `prv2_payitem`
  ADD PRIMARY KEY (`payitem_aid`);

--
-- Indexes for table `prv2_payroll`
--
ALTER TABLE `prv2_payroll`
  ADD PRIMARY KEY (`payroll_aid`);

--
-- Indexes for table `prv2_payroll_list`
--
ALTER TABLE `prv2_payroll_list`
  ADD PRIMARY KEY (`payroll_list_aid`);

--
-- Indexes for table `prv2_paytype`
--
ALTER TABLE `prv2_paytype`
  ADD PRIMARY KEY (`paytype_aid`);

--
-- Indexes for table `prv2_settings_pagibig`
--
ALTER TABLE `prv2_settings_pagibig`
  ADD PRIMARY KEY (`pagibig_aid`);

--
-- Indexes for table `prv2_settings_payroll_type`
--
ALTER TABLE `prv2_settings_payroll_type`
  ADD PRIMARY KEY (`payroll_type_aid`);

--
-- Indexes for table `prv2_settings_philhealth`
--
ALTER TABLE `prv2_settings_philhealth`
  ADD PRIMARY KEY (`philhealth_aid`);

--
-- Indexes for table `prv2_settings_rates`
--
ALTER TABLE `prv2_settings_rates`
  ADD PRIMARY KEY (`rates_aid`);

--
-- Indexes for table `prv2_settings_role`
--
ALTER TABLE `prv2_settings_role`
  ADD PRIMARY KEY (`role_aid`);

--
-- Indexes for table `prv2_settings_semi_monthly`
--
ALTER TABLE `prv2_settings_semi_monthly`
  ADD PRIMARY KEY (`semi_monthly_aid`);

--
-- Indexes for table `prv2_settings_sss_bracket`
--
ALTER TABLE `prv2_settings_sss_bracket`
  ADD PRIMARY KEY (`sss_bracket_aid`);

--
-- Indexes for table `prv2_settings_tax_monthly`
--
ALTER TABLE `prv2_settings_tax_monthly`
  ADD PRIMARY KEY (`tax_monthly_aid`);

--
-- Indexes for table `prv2_settings_user_other`
--
ALTER TABLE `prv2_settings_user_other`
  ADD PRIMARY KEY (`user_other_aid`);

--
-- Indexes for table `prv2_settings_user_system`
--
ALTER TABLE `prv2_settings_user_system`
  ADD PRIMARY KEY (`user_system_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_deduction`
--
ALTER TABLE `prv2_deduction`
  MODIFY `deduction_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prv2_earnings`
--
ALTER TABLE `prv2_earnings`
  MODIFY `earnings_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prv2_holidays`
--
ALTER TABLE `prv2_holidays`
  MODIFY `holidays_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `prv2_payitem`
--
ALTER TABLE `prv2_payitem`
  MODIFY `payitem_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `prv2_payroll`
--
ALTER TABLE `prv2_payroll`
  MODIFY `payroll_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prv2_payroll_list`
--
ALTER TABLE `prv2_payroll_list`
  MODIFY `payroll_list_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prv2_paytype`
--
ALTER TABLE `prv2_paytype`
  MODIFY `paytype_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `prv2_settings_pagibig`
--
ALTER TABLE `prv2_settings_pagibig`
  MODIFY `pagibig_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prv2_settings_payroll_type`
--
ALTER TABLE `prv2_settings_payroll_type`
  MODIFY `payroll_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prv2_settings_philhealth`
--
ALTER TABLE `prv2_settings_philhealth`
  MODIFY `philhealth_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prv2_settings_rates`
--
ALTER TABLE `prv2_settings_rates`
  MODIFY `rates_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `prv2_settings_role`
--
ALTER TABLE `prv2_settings_role`
  MODIFY `role_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `prv2_settings_semi_monthly`
--
ALTER TABLE `prv2_settings_semi_monthly`
  MODIFY `semi_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `prv2_settings_sss_bracket`
--
ALTER TABLE `prv2_settings_sss_bracket`
  MODIFY `sss_bracket_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `prv2_settings_tax_monthly`
--
ALTER TABLE `prv2_settings_tax_monthly`
  MODIFY `tax_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `prv2_settings_user_other`
--
ALTER TABLE `prv2_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `prv2_settings_user_system`
--
ALTER TABLE `prv2_settings_user_system`
  MODIFY `user_system_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2023 at 09:36 AM
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
  `earnings_installment_extra` int(11) NOT NULL,
  `earnings_number_of_installment` smallint(2) NOT NULL,
  `earnings_start_pay_date` varchar(20) NOT NULL,
  `earnings_end_pay_date` varchar(20) NOT NULL,
  `earnings_hris_date` varchar(20) NOT NULL,
  `earnings_holidays_rate` varchar(5) NOT NULL,
  `earnings_leave_hrs` varchar(5) NOT NULL,
  `earnings_hrs` varchar(5) NOT NULL,
  `earnings_rate` varchar(5) NOT NULL,
  `earnings_hris_undertime_out` varchar(10) NOT NULL,
  `earnings_created` datetime NOT NULL,
  `earnings_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_earnings`
--

INSERT INTO `prv2_earnings` (`earnings_aid`, `earnings_payroll_id`, `earnings_payroll_type_id`, `earnings_is_paid`, `earnings_num_pay`, `earnings_employee`, `earnings_employee_id`, `earnings_paytype_id`, `earnings_payitem_id`, `earnings_amount`, `earnings_details`, `earnings_frequency`, `earnings_is_installment`, `earnings_installment_extra`, `earnings_number_of_installment`, `earnings_start_pay_date`, `earnings_end_pay_date`, `earnings_hris_date`, `earnings_holidays_rate`, `earnings_leave_hrs`, `earnings_hrs`, `earnings_rate`, `earnings_hris_undertime_out`, `earnings_created`, `earnings_datetime`) VALUES
(136, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '1', '20', '2000.00', 'test two (200%) Wed Apr 12 2023 ', 'sm', '3', 0, 1, '2023-04-01', '2023-04-15', '2023-04-12', '', '', '8', '200', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(137, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '1', '20', '3000.00', 'test two (200%) Wed Apr 12 2023 ', 'sm', '3', 0, 1, '2023-04-01', '2023-04-15', '2023-04-12', '', '', '8', '200', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(138, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '12', '13', '50', 'SSS Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(139, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '12', '13', '50', 'SSS Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(140, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '12', '15', '50', 'Pagibig Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(141, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '12', '15', '50', 'Pagibig Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(142, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '12', '14', '200', 'Philhealth Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(143, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '12', '14', '300', 'Philhealth Employer', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '', '', '', '', '', '', '2023-04-13 08:44:13', '2023-04-13 08:44:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_earnings`
--
ALTER TABLE `prv2_earnings`
  ADD PRIMARY KEY (`earnings_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_earnings`
--
ALTER TABLE `prv2_earnings`
  MODIFY `earnings_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

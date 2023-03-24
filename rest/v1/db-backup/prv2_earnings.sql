-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2023 at 01:00 AM
-- Server version: 5.7.39-42-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbg5s9r5osiott`
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

INSERT INTO `prv2_earnings` (`earnings_aid`, `earnings_payroll_id`, `earnings_payroll_type_id`, `earnings_is_paid`, `earnings_num_pay`, `earnings_employee`, `earnings_employee_id`, `earnings_paytype_id`, `earnings_payitem_id`, `earnings_amount`, `earnings_details`, `earnings_frequency`, `earnings_is_installment`, `earnings_number_of_installment`, `earnings_start_pay_date`, `earnings_end_pay_date`, `earnings_hris_date`, `earnings_holidays_rate`, `earnings_leave_hrs`, `earnings_hrs`, `earnings_rate`, `earnings_hris_undertime_out`, `earnings_created`, `earnings_datetime`) VALUES
(2063, 'PR-001', '7', 1, 1, 'Dichoso, Jose', '38', '1', '18', '264.20', 'OT (155.00%) Wed Mar 8 2023  10:23 (1h 0m)', 'sm', '3', 1, '2023-03-01', '2023-03-15', '2023-03-08 08:15:28', '', '', '1.000', '155', '0', '2023-03-24 08:24:30', '2023-03-24 08:50:52'),
(2064, 'PR-001', '7', 1, 1, 'Dichoso Jose', '38', '1', '20', '1772.73', 'Test1 (130%) Wed Mar 8 2023 ', 'sm', '3', 1, '2023-03-01', '2023-03-15', '2023-03-08', '', '', '8', '130', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2065, 'PR-001', '7', 1, 1, 'Reyes Patrick', '37', '1', '20', '1477.27', 'Test1 (130%) Wed Mar 8 2023 ', 'sm', '3', 1, '2023-03-01', '2023-03-15', '2023-03-08', '', '', '8', '130', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2066, 'PR-001', '7', 1, 1, 'Dichoso Jose', '38', '1', '23', '937.49975', 'Night Differential (110%) 5hrs/day', 'sm', '3', 1, '2023-03-01', '2023-03-15', '', '', '', '55', '110', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2067, 'PR-001', '7', 1, 1, 'Dichoso Jose', '38', '12', '13', '1440', 'SSS Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2068, 'PR-001', '7', 1, 1, 'Reyes Patrick', '37', '12', '13', '1202.5', 'SSS Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2069, 'PR-001', '7', 1, 1, 'Dichoso Jose', '38', '12', '15', '50', 'Pagibig Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2070, 'PR-001', '7', 1, 1, 'Reyes Patrick', '37', '12', '15', '50', 'Pagibig Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2071, 'PR-001', '7', 1, 1, 'Dichoso Jose', '38', '12', '14', '300', 'Philhealth Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38'),
(2072, 'PR-001', '7', 1, 1, 'Reyes Patrick', '37', '12', '14', '250', 'Philhealth Employer', 'sm', '1', 1, '2023-03-01', '2023-03-15', '', '', '', '', '', '', '2023-03-24 08:24:38', '2023-03-24 08:24:38');

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
  MODIFY `earnings_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2073;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

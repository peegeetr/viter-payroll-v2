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
  `deduction_installment_extra` tinyint(1) NOT NULL,
  `deduction_number_of_installment` smallint(2) NOT NULL,
  `deduction_start_pay_date` varchar(20) NOT NULL,
  `deduction_end_pay_date` varchar(20) NOT NULL,
  `deduction_created` datetime NOT NULL,
  `deduction_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_deduction`
--

INSERT INTO `prv2_deduction` (`deduction_aid`, `deduction_payroll_id`, `deduction_payroll_type_id`, `deduction_num_pay`, `deduction_is_paid`, `deduction_employee`, `deduction_employee_id`, `deduction_paytype_id`, `deduction_payitem_id`, `deduction_amount`, `deduction_details`, `deduction_frequency`, `deduction_is_installment`, `deduction_installment_extra`, `deduction_number_of_installment`, `deduction_start_pay_date`, `deduction_end_pay_date`, `deduction_created`, `deduction_datetime`) VALUES
(99, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '14', '29', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:24', '2023-04-13 08:44:15'),
(100, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '14', '30', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:28', '2023-04-13 08:44:15'),
(101, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '14', '28', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:30', '2023-04-13 08:44:15'),
(102, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '15', '32', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:35', '2023-04-13 08:44:15'),
(103, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '15', '31', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:37', '2023-04-13 08:44:15'),
(104, 'PR-001', '6', 1, 0, 'Lumabas, Cyrene', '3', '15', '33', '10', 'test', 'sm', '2', 0, 2, '2023-04-15', '2023-04-30', '2023-04-13 08:28:41', '2023-04-13 08:44:15'),
(145, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '13', '25', '25', 'SSS Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(146, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '13', '25', '25', 'SSS Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(147, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '13', '27', '50', 'Pagibig Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(148, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '13', '27', '50', 'Pagibig Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(149, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '13', '26', '200', 'Philhealth Employee ', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(150, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '13', '26', '300', 'Philhealth Employee ', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(151, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '16', '34', '0', 'Tax Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(152, 'PR-001', '6', 1, 1, 'Merin Marc Ryan', '1', '16', '34', '0', 'Tax Employee', 'sm', '1', 0, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:13', '2023-04-13 08:44:13'),
(153, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '15', '32', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15'),
(154, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '15', '31', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15'),
(155, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '15', '33', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15'),
(156, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '14', '29', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15'),
(157, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '14', '30', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15'),
(158, 'PR-001', '6', 1, 1, 'Lumabas Cyrene', '3', '14', '28', '10', 'test', 'sm', '1', 1, 1, '2023-04-01', '2023-04-15', '2023-04-13 08:44:15', '2023-04-13 08:44:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_deduction`
--
ALTER TABLE `prv2_deduction`
  ADD PRIMARY KEY (`deduction_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_deduction`
--
ALTER TABLE `prv2_deduction`
  MODIFY `deduction_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

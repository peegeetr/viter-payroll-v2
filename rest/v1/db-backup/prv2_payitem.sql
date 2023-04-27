-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2023 at 01:11 AM
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
(11, 1, 'De Minimis', 0, '10', '2023-02-02 00:00:00', '2023-04-26 08:47:23'),
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
(43, 1, 'Undertime', 1, '1', '2023-02-17 00:00:00', '2023-02-17 12:30:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_payitem`
--
ALTER TABLE `prv2_payitem`
  ADD PRIMARY KEY (`payitem_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_payitem`
--
ALTER TABLE `prv2_payitem`
  MODIFY `payitem_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

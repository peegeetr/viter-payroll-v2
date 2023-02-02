-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 08:12 AM
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
-- Table structure for table `prv2_payitem`
--

CREATE TABLE `prv2_payitem` (
  `payitem_aid` int(11) NOT NULL,
  `payitem_is_active` tinyint(1) NOT NULL,
  `payitem_name` varchar(100) NOT NULL,
  `payitem_paytype_id` varchar(20) NOT NULL,
  `payitem_created` varchar(20) NOT NULL,
  `payitem_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_payitem`
--

INSERT INTO `prv2_payitem` (`payitem_aid`, `payitem_is_active`, `payitem_name`, `payitem_paytype_id`, `payitem_created`, `payitem_datetime`) VALUES
(1, 1, 'Bonus', '11', '2023-02-02', '2023-02-02 10:22:19'),
(3, 1, '13th Month', '11', '2023-02-02', '2023-02-02 10:22:12'),
(6, 1, 'Employee Referral Bonus', '11', '2023-02-02', '2023-02-02 10:22:28'),
(7, 1, 'Bereavement', '11', '2023-02-02', '2023-02-02 10:22:34'),
(8, 1, 'Separation Pay', '11', '2023-02-02', '2023-02-02 10:22:44'),
(9, 1, 'Other Allowances', '11', '2023-02-02', '2023-02-02 10:22:53'),
(10, 1, 'Rice Allowance', '10', '2023-02-02', '2023-02-02 10:26:46'),
(11, 1, 'Clothing Allowance', '10', '2023-02-02', '2023-02-02 10:26:54'),
(12, 1, 'Laundry Allowance', '10', '2023-02-02', '2023-02-02 10:27:01'),
(13, 1, 'SSS Er', '12', '2023-02-02', '2023-02-02 10:27:16'),
(14, 1, 'PHIC Er', '12', '2023-02-02', '2023-02-02 10:27:23'),
(15, 1, 'PGBG Er', '12', '2023-02-02', '2023-02-02 10:27:30'),
(16, 1, 'HMO Er', '12', '2023-02-02', '2023-02-02 10:27:38'),
(18, 1, 'Overtime Pay', '1', '2023-02-02', '2023-02-02 10:28:14'),
(19, 1, 'Paid Leave', '1', '2023-02-02', '2023-02-02 10:28:21'),
(20, 1, 'Holiday', '1', '2023-02-02', '2023-02-02 10:28:26'),
(21, 1, 'Inlfation Adjustment', '1', '2023-02-02', '2023-02-02 10:28:33'),
(22, 1, 'Pay Adjustment', '1', '2023-02-02', '2023-02-02 10:28:38'),
(23, 1, 'Night Shift Differential', '1', '2023-02-02', '2023-02-02 10:28:45'),
(24, 1, 'Hazard Pay', '1', '2023-02-02', '2023-02-02 10:28:52'),
(25, 1, 'SSS', '13', '2023-02-02', '2023-02-02 10:29:42'),
(26, 1, 'Philhealth', '13', '2023-02-02', '2023-02-02 10:29:49'),
(27, 1, 'Pag-Ibig', '13', '2023-02-02', '2023-02-02 10:29:55'),
(28, 1, 'SSS Loan', '14', '2023-02-02', '2023-02-02 10:30:35'),
(29, 1, 'Pag-Ibig Loan', '14', '2023-02-02', '2023-02-02 10:30:42'),
(30, 1, 'Pag-Ibig MP2', '14', '2023-02-02', '2023-02-02 10:30:48'),
(31, 1, 'FWC- Tithes', '15', '2023-02-02', '2023-02-02 10:31:21'),
(32, 1, 'FCA- Tuition', '15', '2023-02-02', '2023-02-02 10:31:27'),
(33, 1, 'Other Deductions', '15', '2023-02-02', '2023-02-02 10:31:32'),
(34, 1, 'Payroll Tax', '16', '2023-02-02', '2023-02-02 10:32:09');

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
  MODIFY `payitem_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

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
(1, 1, 'earnings', 'Wages', 'Employee income with tax.', '2023-02-01 00:00:00', '2023-04-17 15:19:52', 1, 0, 0, 0, 0, 0, 0, 0),
(10, 1, 'earnings', 'De Minimis', 'Allowance without tax.', '2023-02-02 00:00:00', '2023-04-26 08:46:54', 0, 1, 0, 0, 0, 0, 0, 0),
(11, 1, 'earnings', '13th month & other benefits', 'Allowance without tax.', '2023-02-02 00:00:00', '2023-03-27 11:20:49', 0, 0, 1, 0, 0, 0, 0, 0),
(12, 1, 'earnings', 'Employee Contributions', 'Mandatory deduction for employer.', '2023-02-02 00:00:00', '2023-03-27 11:21:35', 0, 0, 0, 1, 0, 0, 0, 0),
(13, 1, 'deductions', 'Mandatory Deductions', 'Mandatory deduction for employee.', '2023-02-02 00:00:00', '2023-04-26 08:47:08', 0, 0, 0, 0, 1, 0, 0, 0),
(14, 1, 'deductions', 'Optional Deductions', 'Extra mandatory dedections.', '2023-02-02 00:00:00', '2023-03-27 11:23:55', 0, 0, 0, 0, 0, 1, 0, 0),
(15, 1, 'deductions', 'Other Deductions', 'Other employee deductions.', '2023-02-02 00:00:00', '2023-03-27 11:24:14', 0, 0, 0, 0, 0, 0, 1, 0),
(16, 1, 'deductions', 'Tax', 'Employee tax deduction.', '2023-02-02 00:00:00', '2023-04-24 14:17:26', 0, 0, 0, 0, 0, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_paytype`
--
ALTER TABLE `prv2_paytype`
  ADD PRIMARY KEY (`paytype_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_paytype`
--
ALTER TABLE `prv2_paytype`
  MODIFY `paytype_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

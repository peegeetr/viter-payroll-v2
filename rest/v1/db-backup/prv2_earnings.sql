-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2023 at 06:17 AM
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
  `earnings_number_of_installment` smallint(2) NOT NULL,
  `earnings_start_pay_date` varchar(20) NOT NULL,
  `earnings_end_pay_date` varchar(20) NOT NULL,
  `earnings_hris_date` varchar(20) NOT NULL,
  `earnings_holidays_rate` varchar(5) NOT NULL,
  `earnings_hris_undertime_out` varchar(10) NOT NULL,
  `earnings_created` datetime NOT NULL,
  `earnings_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `earnings_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

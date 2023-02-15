-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 15, 2023 at 04:19 AM
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
-- Table structure for table `prv2_deduction`
--

CREATE TABLE `prv2_deduction` (
  `deduction_aid` int(11) NOT NULL,
  `deduction_payroll_id` varchar(20) NOT NULL,
  `deduction_num_pay` smallint(10) NOT NULL,
  `deduction_is_paid` tinyint(1) NOT NULL,
  `deduction_employee` varchar(20) NOT NULL,
  `deduction_employee_id` varchar(20) NOT NULL,
  `deduction_paytype_id` varchar(20) NOT NULL,
  `deduction_payitem_id` varchar(20) NOT NULL,
  `deduction_amount` varchar(20) NOT NULL,
  `deduction_frequency` varchar(5) NOT NULL,
  `deduction_is_installment` varchar(5) NOT NULL,
  `deduction_number_of_installment` varchar(5) NOT NULL,
  `deduction_start_pay_date` varchar(20) NOT NULL,
  `deduction_end_pay_date` varchar(20) NOT NULL,
  `deduction_created` datetime NOT NULL,
  `deduction_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `deduction_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

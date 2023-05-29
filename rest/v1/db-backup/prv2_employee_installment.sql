-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 08:08 AM
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
-- Table structure for table `prv2_employee_installment`
--

CREATE TABLE `prv2_employee_installment` (
  `employee_installment_aid` int(11) NOT NULL,
  `employee_installment_employee_id` varchar(20) NOT NULL,
  `employee_installment_paytype_id` varchar(20) NOT NULL,
  `employee_installment_amount` varchar(20) NOT NULL,
  `employee_installment_number_of_months` varchar(20) NOT NULL,
  `employee_installment_number_of_payrun` varchar(20) NOT NULL,
  `employee_installment_start_date` varchar(20) NOT NULL,
  `employee_installment_end_date` varchar(20) NOT NULL,
  `employee_installment_status` varchar(5) NOT NULL,
  `employee_installment_details` varchar(100) NOT NULL,
  `employee_installment_created` datetime NOT NULL,
  `employee_installment_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_employee_installment`
--
ALTER TABLE `prv2_employee_installment`
  ADD PRIMARY KEY (`employee_installment_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_employee_installment`
--
ALTER TABLE `prv2_employee_installment`
  MODIFY `employee_installment_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

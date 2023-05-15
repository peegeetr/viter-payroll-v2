-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2023 at 09:59 AM
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
  `employee_installment_start_date` varchar(20) NOT NULL,
  `employee_installment_end_date` varchar(20) NOT NULL,
  `employee_installment_status` varchar(5) NOT NULL,
  `employee_installment_created` datetime NOT NULL,
  `employee_installment_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_employee_installment`
--

INSERT INTO `prv2_employee_installment` (`employee_installment_aid`, `employee_installment_employee_id`, `employee_installment_paytype_id`, `employee_installment_amount`, `employee_installment_number_of_months`, `employee_installment_start_date`, `employee_installment_end_date`, `employee_installment_status`, `employee_installment_created`, `employee_installment_datetime`) VALUES
(1, '5', '30', '1000', '60', '2023-05-15', '2028-04-15', '0', '2023-05-15 14:54:29', '2023-05-15 14:54:29'),
(2, '1', '30', '2000', '60', '2023-05-15', '2028-04-15', '0', '2023-05-15 15:05:33', '2023-05-15 15:05:33'),
(3, '1', '29', '1000', '2', '2023-04-15', '2023-05-15', '2', '2023-05-15 15:55:35', '2023-05-15 15:55:35');

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
  MODIFY `employee_installment_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

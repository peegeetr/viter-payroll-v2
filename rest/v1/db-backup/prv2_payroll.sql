-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 17, 2023 at 02:22 AM
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
-- Table structure for table `prv2_payroll`
--

CREATE TABLE `prv2_payroll` (
  `payroll_aid` int(11) NOT NULL,
  `payroll_id` varchar(20) NOT NULL,
  `payroll_is_paid` tinyint(1) NOT NULL,
  `payroll_start_date` varchar(20) NOT NULL,
  `payroll_end_date` varchar(20) NOT NULL,
  `payroll_pay_date` varchar(20) NOT NULL,
  `payroll_earning_type` varchar(20) NOT NULL,
  `payroll_created` varchar(20) NOT NULL,
  `payroll_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_payroll`
--
ALTER TABLE `prv2_payroll`
  ADD PRIMARY KEY (`payroll_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_payroll`
--
ALTER TABLE `prv2_payroll`
  MODIFY `payroll_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

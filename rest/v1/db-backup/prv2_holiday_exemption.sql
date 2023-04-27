-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 07:28 AM
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
-- Table structure for table `prv2_holiday_exemption`
--

CREATE TABLE `prv2_holiday_exemption` (
  `holiday_exemption_aid` int(11) NOT NULL,
  `holiday_exemption_pr_id` varchar(100) NOT NULL,
  `holiday_exemption_eid` varchar(20) NOT NULL,
  `holiday_exemption_holiday_date` varchar(20) NOT NULL,
  `holiday_exemption_holiday_id` varchar(20) NOT NULL,
  `holiday_exemption_is_observe` tinyint(1) NOT NULL,
  `holiday_exemption_created` datetime NOT NULL,
  `holiday_exemption_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_holiday_exemption`
--
ALTER TABLE `prv2_holiday_exemption`
  ADD PRIMARY KEY (`holiday_exemption_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_holiday_exemption`
--
ALTER TABLE `prv2_holiday_exemption`
  MODIFY `holiday_exemption_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

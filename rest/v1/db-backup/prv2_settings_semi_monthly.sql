-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2023 at 04:22 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

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
-- Table structure for table `prv2_settings_semi_monthly`
--

CREATE TABLE `prv2_settings_semi_monthly` (
  `semi_monthly_aid` int(11) NOT NULL,
  `semi_monthly_active` tinyint(1) NOT NULL,
  `semi_monthly_range_from` varchar(50) NOT NULL,
  `semi_monthly_range_to` varchar(50) NOT NULL,
  `semi_monthly_less_amount` varchar(50) NOT NULL,
  `semi_monthly_rate` varchar(50) NOT NULL,
  `semi_monthly_additional_amount` varchar(50) NOT NULL,
  `semi_monthly_created` varchar(20) NOT NULL,
  `semi_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_semi_monthly`
--

INSERT INTO `prv2_settings_semi_monthly` (`semi_monthly_aid`, `semi_monthly_active`, `semi_monthly_range_from`, `semi_monthly_range_to`, `semi_monthly_less_amount`, `semi_monthly_rate`, `semi_monthly_additional_amount`, `semi_monthly_created`, `semi_monthly_datetime`) VALUES
(2, 1, 'asdfasdfasdf', 'asdfasdf', 'asdfasdf', '33asdfasd33', '22232sssdsd32', '2023-02-03', '2023-02-03 08:21:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_semi_monthly`
--
ALTER TABLE `prv2_settings_semi_monthly`
  ADD PRIMARY KEY (`semi_monthly_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_semi_monthly`
--
ALTER TABLE `prv2_settings_semi_monthly`
  MODIFY `semi_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

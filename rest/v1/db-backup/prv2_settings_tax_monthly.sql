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
-- Table structure for table `prv2_settings_tax_monthly`
--

CREATE TABLE `prv2_settings_tax_monthly` (
  `tax_monthly_aid` int(11) NOT NULL,
  `tax_monthly_active` tinyint(1) NOT NULL,
  `tax_monthly_range_from` varchar(50) NOT NULL,
  `tax_monthly_range_to` varchar(50) NOT NULL,
  `tax_monthly_less_amount` varchar(50) NOT NULL,
  `tax_monthly_rate` varchar(50) NOT NULL,
  `tax_monthly_additional_amount` varchar(50) NOT NULL,
  `tax_monthly_created` varchar(20) NOT NULL,
  `tax_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_tax_monthly`
--

INSERT INTO `prv2_settings_tax_monthly` (`tax_monthly_aid`, `tax_monthly_active`, `tax_monthly_range_from`, `tax_monthly_range_to`, `tax_monthly_less_amount`, `tax_monthly_rate`, `tax_monthly_additional_amount`, `tax_monthly_created`, `tax_monthly_datetime`) VALUES
(4, 1, 'ccccx', 'xcxc', 'vxzcvzx', 'cvzxcvz', 'xcvzxcv', '2023-02-03', '2023-02-03 10:34:45'),
(5, 1, 'wwww', 'qwqw', 'qw312', '31231', '31231', '2023-02-03', '2023-02-03 11:07:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_tax_monthly`
--
ALTER TABLE `prv2_settings_tax_monthly`
  ADD PRIMARY KEY (`tax_monthly_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_tax_monthly`
--
ALTER TABLE `prv2_settings_tax_monthly`
  MODIFY `tax_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

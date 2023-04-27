-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2023 at 01:07 AM
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
-- Table structure for table `prv2_settings_tax_monthly`
--

CREATE TABLE `prv2_settings_tax_monthly` (
  `tax_monthly_aid` int(11) NOT NULL,
  `tax_monthly_active` tinyint(1) NOT NULL,
  `tax_monthly_range_from` varchar(20) NOT NULL,
  `tax_monthly_range_to` varchar(20) NOT NULL,
  `tax_monthly_less_amount` varchar(20) NOT NULL,
  `tax_monthly_rate` varchar(20) NOT NULL,
  `tax_monthly_additional_amount` varchar(20) NOT NULL,
  `tax_monthly_created` varchar(20) NOT NULL,
  `tax_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_tax_monthly`
--

INSERT INTO `prv2_settings_tax_monthly` (`tax_monthly_aid`, `tax_monthly_active`, `tax_monthly_range_from`, `tax_monthly_range_to`, `tax_monthly_less_amount`, `tax_monthly_rate`, `tax_monthly_additional_amount`, `tax_monthly_created`, `tax_monthly_datetime`) VALUES
(4, 1, '0', '20833', '0', '0', '0', '2023-03-08 12:32:52', '2023-03-15 12:11:51'),
(5, 1, '20833', '33332', '20833', '15', '0', '2023-03-08 12:33:26', '2023-03-15 12:12:26'),
(6, 1, '33333', '66666', '33333', '20', '1875', '2023-03-08 12:33:58', '2023-03-08 12:33:58'),
(7, 1, '66667', '166666', '66667', '25', '8541.8', '2023-03-08 12:34:32', '2023-03-08 12:34:32'),
(8, 1, '166667', '666666', '166667', '30', '33541.8', '2023-03-08 12:35:25', '2023-03-08 12:35:25'),
(9, 1, '666667', '100000000', '666667', '35', '183541.80', '2023-03-08 12:36:25', '2023-04-19 07:11:27');

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
  MODIFY `tax_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

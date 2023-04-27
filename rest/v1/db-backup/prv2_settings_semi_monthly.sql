-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2023 at 01:08 AM
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
-- Table structure for table `prv2_settings_semi_monthly`
--

CREATE TABLE `prv2_settings_semi_monthly` (
  `semi_monthly_aid` int(11) NOT NULL,
  `semi_monthly_active` tinyint(1) NOT NULL,
  `semi_monthly_range_from` varchar(20) NOT NULL,
  `semi_monthly_range_to` varchar(20) NOT NULL,
  `semi_monthly_less_amount` varchar(20) NOT NULL,
  `semi_monthly_rate` varchar(20) NOT NULL,
  `semi_monthly_additional_amount` varchar(20) NOT NULL,
  `semi_monthly_created` varchar(20) NOT NULL,
  `semi_monthly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_semi_monthly`
--

INSERT INTO `prv2_settings_semi_monthly` (`semi_monthly_aid`, `semi_monthly_active`, `semi_monthly_range_from`, `semi_monthly_range_to`, `semi_monthly_less_amount`, `semi_monthly_rate`, `semi_monthly_additional_amount`, `semi_monthly_created`, `semi_monthly_datetime`) VALUES
(2, 1, '0', '10417', '0', '0', '0', '2023-03-08 11:59:55', '2023-03-15 12:16:07'),
(3, 1, '10417', '16666', '10417', '15', '0', '2023-03-08 12:04:10', '2023-03-08 12:04:23'),
(4, 1, '16667', '33332', '16667', '20', '937.5', '2023-03-08 12:06:16', '2023-03-08 12:16:12'),
(5, 1, '33333', '83332', '33333', '25', '4270.7', '2023-03-08 12:06:54', '2023-03-08 12:16:35'),
(7, 1, '333333', '100000000', '333333', '35', '91770.70', '2023-03-08 12:08:05', '2023-03-15 12:18:21'),
(8, 1, '83333', '333332', '83333', '30', '16770.7', '2023-03-08 12:09:13', '2023-03-08 12:16:45');

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
  MODIFY `semi_monthly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

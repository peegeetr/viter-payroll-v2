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
-- Table structure for table `prv2_settings_rates`
--

CREATE TABLE `prv2_settings_rates` (
  `rates_aid` int(11) NOT NULL,
  `rates_active` tinyint(1) NOT NULL,
  `rates_night_differential` varchar(10) NOT NULL,
  `rates_overtime` varchar(10) NOT NULL,
  `rates_special_holiday` varchar(10) NOT NULL,
  `rates_regular_holiday` varchar(10) NOT NULL,
  `rates_rest_day` varchar(10) NOT NULL,
  `rates_created` varchar(20) NOT NULL,
  `rates_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_rates`
--

INSERT INTO `prv2_settings_rates` (`rates_aid`, `rates_active`, `rates_night_differential`, `rates_overtime`, `rates_special_holiday`, `rates_regular_holiday`, `rates_rest_day`, `rates_created`, `rates_datetime`) VALUES
(1, 1, 'sss', 'xx', 'z', 'x', 'xxxx', '2023-02-02', '2023-02-03 09:48:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_rates`
--
ALTER TABLE `prv2_settings_rates`
  ADD PRIMARY KEY (`rates_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_rates`
--
ALTER TABLE `prv2_settings_rates`
  MODIFY `rates_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

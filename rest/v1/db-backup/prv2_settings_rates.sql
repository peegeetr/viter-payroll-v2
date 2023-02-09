-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2023 at 12:10 AM
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
  `rates_name` varchar(100) NOT NULL,
  `rates_paytype_id` varchar(20) NOT NULL,
  `rates_payitems_id` varchar(20) NOT NULL,
  `rates_created` varchar(20) NOT NULL,
  `rates_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_rates`
--

INSERT INTO `prv2_settings_rates` (`rates_aid`, `rates_active`, `rates_name`, `rates_paytype_id`, `rates_payitems_id`, `rates_created`, `rates_datetime`) VALUES
(4, 1, 'sss', '1', '29', '2023-02-09', '2023-02-09 15:47:48'),
(7, 1, 'kkk', '10', '6', '2023-02-09', '2023-02-09 15:59:17'),
(10, 1, 'kkk', '11', '7', '2023-02-10', '2023-02-10 06:59:38');

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
  MODIFY `rates_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

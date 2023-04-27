-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2023 at 01:09 AM
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
-- Table structure for table `prv2_settings_rates`
--

CREATE TABLE `prv2_settings_rates` (
  `rates_aid` int(11) NOT NULL,
  `rates_active` tinyint(1) NOT NULL,
  `rates_name` varchar(100) NOT NULL,
  `rates_percent` varchar(20) NOT NULL,
  `rates_paytype_id` varchar(20) NOT NULL,
  `rates_payitems_id` varchar(20) NOT NULL,
  `rates_created` varchar(20) NOT NULL,
  `rates_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_rates`
--

INSERT INTO `prv2_settings_rates` (`rates_aid`, `rates_active`, `rates_name`, `rates_percent`, `rates_paytype_id`, `rates_payitems_id`, `rates_created`, `rates_datetime`) VALUES
(14, 1, 'Night Differential (10pm-6am)', '110', '1', '23', '2023-02-10', '2023-02-21 08:13:51'),
(15, 1, 'Overtime regular days', '125', '1', '18', '2023-02-13', '2023-02-21 08:06:46'),
(16, 1, 'Holiday Special and Rest Day', '150', '1', '20', '2023-02-13', '2023-02-21 08:07:17'),
(17, 1, 'Holiday Special or Rest day', '130', '1', '20', '2023-02-13', '2023-02-21 08:07:12'),
(18, 1, 'Overtime rest day & holidays', '130', '1', '18', '2023-02-21', '2023-02-21 08:06:40'),
(19, 1, 'Holiday Regular and Rest Day', '230', '1', '20', '2023-02-21', '2023-02-21 08:08:08'),
(20, 1, 'Holiday Regular', '200', '1', '20', '2023-02-21', '2023-02-21 08:08:24'),
(21, 1, 'Special non-working holidays', '130', '1', '20', '2023-02-21', '2023-04-26 08:25:36');

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
  MODIFY `rates_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2023 at 06:55 AM
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
-- Table structure for table `prv2_holidays`
--

CREATE TABLE `prv2_holidays` (
  `holidays_aid` int(11) NOT NULL,
  `holidays_name` varchar(100) NOT NULL,
  `holidays_date` varchar(20) NOT NULL,
  `holidays_type` varchar(30) NOT NULL,
  `holidays_rate` varchar(20) NOT NULL,
  `holidays_is_active` tinyint(1) NOT NULL,
  `holidays_created` varchar(20) NOT NULL,
  `holidays_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_holidays`
--

INSERT INTO `prv2_holidays` (`holidays_aid`, `holidays_name`, `holidays_date`, `holidays_type`, `holidays_rate`, `holidays_is_active`, `holidays_created`, `holidays_datetime`) VALUES
(3, 'vv', '2023-03-09', 'special', 'dff', 1, '2023-02-08', '2023-02-08 13:36:16'),
(7, 'xx', '2023-02-09', 'regular', 'dff', 1, '2023-02-08', '2023-02-08 13:17:45'),
(8, '22', '2023-02-20', 'special', 'dff', 1, '2023-02-08', '2023-02-08 13:36:51'),
(9, 'asd111', '2023-02-18', 'special', 'dff', 1, '2023-02-08', '2023-02-08 13:37:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_holidays`
--
ALTER TABLE `prv2_holidays`
  ADD PRIMARY KEY (`holidays_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_holidays`
--
ALTER TABLE `prv2_holidays`
  MODIFY `holidays_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

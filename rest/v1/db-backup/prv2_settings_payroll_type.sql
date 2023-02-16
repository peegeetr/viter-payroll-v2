-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2023 at 07:03 AM
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
-- Table structure for table `prv2_settings_payroll_type`
--

CREATE TABLE `prv2_settings_payroll_type` (
  `payroll_type_aid` int(11) NOT NULL,
  `payroll_type_active` tinyint(1) NOT NULL,
  `payroll_type_name` varchar(100) NOT NULL,
  `payroll_type_created` date NOT NULL,
  `payroll_type_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_payroll_type`
--

INSERT INTO `prv2_settings_payroll_type` (`payroll_type_aid`, `payroll_type_active`, `payroll_type_name`, `payroll_type_created`, `payroll_type_datetime`) VALUES
(2, 1, 'xxxxxxxxx', '0000-00-00', '2023-02-16 12:11:12'),
(6, 1, 'sss', '2023-02-16', '2023-02-16 14:01:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_payroll_type`
--
ALTER TABLE `prv2_settings_payroll_type`
  ADD PRIMARY KEY (`payroll_type_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_payroll_type`
--
ALTER TABLE `prv2_settings_payroll_type`
  MODIFY `payroll_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

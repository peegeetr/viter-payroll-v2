-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 27, 2023 at 01:10 AM
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
(7, 1, 'Salary', '2023-04-26', '0000-00-00 00:00:00'),
(8, 1, '13th Month', '2023-04-26', '0000-00-00 00:00:00'),
(9, 1, 'Bonuses', '0000-00-00', '0000-00-00 00:00:00');

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
  MODIFY `payroll_type_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

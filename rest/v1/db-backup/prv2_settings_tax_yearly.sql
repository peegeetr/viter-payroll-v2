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
-- Table structure for table `prv2_settings_tax_yearly`
--

CREATE TABLE `prv2_settings_tax_yearly` (
  `tax_yearly_aid` int(11) NOT NULL,
  `tax_yearly_active` tinyint(1) NOT NULL,
  `tax_yearly_from` varchar(20) NOT NULL,
  `tax_yearly_to` varchar(20) NOT NULL,
  `tax_yearly_fixed_tax` varchar(20) NOT NULL,
  `tax_yearly_rate` varchar(5) NOT NULL,
  `tax_yearly_created` datetime NOT NULL,
  `tax_yearly_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_tax_yearly`
--

INSERT INTO `prv2_settings_tax_yearly` (`tax_yearly_aid`, `tax_yearly_active`, `tax_yearly_from`, `tax_yearly_to`, `tax_yearly_fixed_tax`, `tax_yearly_rate`, `tax_yearly_created`, `tax_yearly_datetime`) VALUES
(3, 1, '0', '250000', '0', '0', '2023-04-20 15:09:31', '2023-04-20 15:09:31'),
(4, 1, '250000', '400000', '0', '15', '2023-04-20 15:09:51', '2023-04-20 15:09:51'),
(5, 1, '400000', '800000', '22500', '20', '2023-04-20 15:10:12', '2023-04-20 15:10:12'),
(6, 1, '800000', '2000000', '102500', '25', '2023-04-20 15:10:44', '2023-04-20 15:10:44'),
(7, 1, '2000000', '8000000', '402500', '30', '2023-04-20 15:11:03', '2023-04-20 15:11:03'),
(8, 1, '8000000', '100000000', '2202500', '35', '2023-04-20 15:11:51', '2023-04-20 15:11:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_tax_yearly`
--
ALTER TABLE `prv2_settings_tax_yearly`
  ADD PRIMARY KEY (`tax_yearly_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_tax_yearly`
--
ALTER TABLE `prv2_settings_tax_yearly`
  MODIFY `tax_yearly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

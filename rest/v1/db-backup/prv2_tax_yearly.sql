-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 08:26 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
-- Table structure for table `prv2_tax_yearly`
--

CREATE TABLE `prv2_tax_yearly` (
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
-- Dumping data for table `prv2_tax_yearly`
--

INSERT INTO `prv2_tax_yearly` (`tax_yearly_aid`, `tax_yearly_active`, `tax_yearly_from`, `tax_yearly_to`, `tax_yearly_fixed_tax`, `tax_yearly_rate`, `tax_yearly_created`, `tax_yearly_datetime`) VALUES
(1, 1, '0.00', '250000', '0.00', '0', '2023-04-20 14:24:31', '2023-04-20 14:24:31'),
(2, 1, '250000', '400000', '0.00', '20', '2023-04-20 14:25:03', '2023-04-20 14:25:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_tax_yearly`
--
ALTER TABLE `prv2_tax_yearly`
  ADD PRIMARY KEY (`tax_yearly_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_tax_yearly`
--
ALTER TABLE `prv2_tax_yearly`
  MODIFY `tax_yearly_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

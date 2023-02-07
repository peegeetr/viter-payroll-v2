-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2023 at 12:37 AM
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
-- Table structure for table `prv2_settings_sss_bracket`
--

CREATE TABLE `prv2_settings_sss_bracket` (
  `sss_bracket_aid` int(11) NOT NULL,
  `sss_bracket_range_from` varchar(50) NOT NULL,
  `sss_bracket_range_to` varchar(50) NOT NULL,
  `sss_bracket_er` varchar(50) NOT NULL,
  `sss_bracket_ee` varchar(50) NOT NULL,
  `sss_bracket_total` varchar(50) NOT NULL,
  `sss_bracket_created` varchar(20) NOT NULL,
  `sss_bracket_datetime` datetime NOT NULL,
  `sss_bracket_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_sss_bracket`
--
ALTER TABLE `prv2_settings_sss_bracket`
  ADD PRIMARY KEY (`sss_bracket_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_sss_bracket`
--
ALTER TABLE `prv2_settings_sss_bracket`
  MODIFY `sss_bracket_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

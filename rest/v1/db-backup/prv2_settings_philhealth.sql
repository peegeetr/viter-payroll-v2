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
-- Table structure for table `prv2_settings_philhealth`
--

CREATE TABLE `prv2_settings_philhealth` (
  `philhealth_aid` int(11) NOT NULL,
  `philhealth_percentage` smallint(4) NOT NULL,
  `philhealth_min` int(11) NOT NULL,
  `philhealth_max` int(11) NOT NULL,
  `philhealth_created` datetime NOT NULL,
  `philhealth_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_philhealth`
--

INSERT INTO `prv2_settings_philhealth` (`philhealth_aid`, `philhealth_percentage`, `philhealth_min`, `philhealth_max`, `philhealth_created`, `philhealth_datetime`) VALUES
(1, 4, 400, 3200, '2023-03-13 12:41:11', '2023-03-15 10:06:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_philhealth`
--
ALTER TABLE `prv2_settings_philhealth`
  ADD PRIMARY KEY (`philhealth_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_philhealth`
--
ALTER TABLE `prv2_settings_philhealth`
  MODIFY `philhealth_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

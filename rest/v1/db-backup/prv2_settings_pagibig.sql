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
-- Table structure for table `prv2_settings_pagibig`
--

CREATE TABLE `prv2_settings_pagibig` (
  `pagibig_aid` int(11) NOT NULL,
  `pagibig_er_amount` int(11) NOT NULL,
  `pagibig_ee_amount` int(11) NOT NULL,
  `pagibig_created` datetime NOT NULL,
  `pagibig_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_pagibig`
--

INSERT INTO `prv2_settings_pagibig` (`pagibig_aid`, `pagibig_er_amount`, `pagibig_ee_amount`, `pagibig_created`, `pagibig_datetime`) VALUES
(1, 50, 50, '2023-03-13 12:40:52', '2023-03-15 09:47:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_pagibig`
--
ALTER TABLE `prv2_settings_pagibig`
  ADD PRIMARY KEY (`pagibig_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_pagibig`
--
ALTER TABLE `prv2_settings_pagibig`
  MODIFY `pagibig_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

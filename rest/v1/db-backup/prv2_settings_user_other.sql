-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2023 at 05:55 AM
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
-- Table structure for table `prv2_settings_user_other`
--

CREATE TABLE `prv2_settings_user_other` (
  `user_other_aid` int(11) NOT NULL,
  `user_other_is_active` tinyint(1) NOT NULL,
  `user_other_name` varchar(50) NOT NULL,
  `user_other_email` varchar(200) NOT NULL,
  `user_other_new_email` varchar(200) NOT NULL,
  `user_other_role_id` int(11) NOT NULL,
  `user_other_key` varchar(255) NOT NULL,
  `user_other_password` varchar(255) NOT NULL,
  `user_other_created` varchar(20) NOT NULL,
  `user_other_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prv2_settings_user_other`
--

INSERT INTO `prv2_settings_user_other` (`user_other_aid`, `user_other_is_active`, `user_other_name`, `user_other_email`, `user_other_new_email`, `user_other_role_id`, `user_other_key`, `user_other_password`, `user_other_created`, `user_other_datetime`) VALUES
(10, 1, 'cyrene lumabas', 'cyrenemlumabas@gmail.com', 'cyrenemlumabass@gmail.com', 2, 'aad47a43e0ed443d0fb149f8b1a7a37ee9b12c43d263068a5bb89b6d7dd6d424', '$2y$10$JMOAyDfBxlgix2oe1QGQ7e3e6.rtuMbFoOz4YsNFKCHncxTjNlBO2', '2023-04-26 12:41:27', '2023-04-28 10:51:23'),
(11, 1, 'zaicy', 'april9rhina@gmail.com', 'cyrene.lumabas@frontlinebusiness.com.ph', 2, '0347b40380185a4a4b6e7d7b2457afd25691c9ab62c5abc21bef1533f77d750c', '', '2023-04-26 12:44:45', '2023-04-28 10:49:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prv2_settings_user_other`
--
ALTER TABLE `prv2_settings_user_other`
  ADD PRIMARY KEY (`user_other_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prv2_settings_user_other`
--
ALTER TABLE `prv2_settings_user_other`
  MODIFY `user_other_aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

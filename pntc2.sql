-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Feb 11, 2026 at 04:38 PM
-- Server version: 8.4.8
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pntc2`
--

-- --------------------------------------------------------

--
-- Table structure for table `boardattachment`
--

CREATE TABLE `boardattachment` (
  `attachement_id` int NOT NULL,
  `board_id` int NOT NULL,
  `id` int NOT NULL,
  `time_id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `signature` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `boardresult`
--

CREATE TABLE `boardresult` (
  `result_id` int NOT NULL,
  `board_id` int NOT NULL,
  `id` int NOT NULL,
  `indicator_id` int NOT NULL,
  `time_id` int NOT NULL,
  `score` enum('1','2','3','4','yes','no') NOT NULL,
  `file` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `boardrole`
--

CREATE TABLE `boardrole` (
  `role_id` int NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `boardrole`
--

INSERT INTO `boardrole` (`role_id`, `role`) VALUES
(1, 'ประธาน'),
(2, 'กรรมการ');

-- --------------------------------------------------------

--
-- Table structure for table `boardsign`
--

CREATE TABLE `boardsign` (
  `sign_id` int NOT NULL,
  `id` int NOT NULL,
  `role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `boardsign`
--

INSERT INTO `boardsign` (`sign_id`, `id`, `role`) VALUES
(2, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int NOT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department`) VALUES
(1, 'ไม่มี'),
(2, 'การตลาด'),
(3, 'บัญชี'),
(4, 'เทคโนโลยีสารสนเทศ');

-- --------------------------------------------------------

--
-- Table structure for table `indicator`
--

CREATE TABLE `indicator` (
  `indicator_id` int NOT NULL,
  `indicator` varchar(50) NOT NULL,
  `section_id` int NOT NULL,
  `detail` varchar(255) NOT NULL,
  `type` enum('1234','yes/no') NOT NULL,
  `freq` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `indicator`
--

INSERT INTO `indicator` (`indicator_id`, `indicator`, `section_id`, `detail`, `type`, `freq`) VALUES
(1, '1', 5, 'test', '1234', 2),
(2, 'asfas', 6, 'asfd', 'yes/no', 2),
(3, '11111', 5, '1111', 'yes/no', 2),
(4, 'asdfasfasd', 5, 'asdfasdfa', 'yes/no', 1);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `level_id` int NOT NULL,
  `level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`level_id`, `level`) VALUES
(1, 'ไม่มี'),
(2, 'ชำนาญการ'),
(3, 'ชำนาญการพิเศษ'),
(4, 'เชี่ยวชาญ'),
(5, 'เชี่ยวชาญพิเศษ');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int NOT NULL,
  `position` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position`) VALUES
(1, 'ครู'),
(2, 'ผู้บริหาร');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` int NOT NULL,
  `section` varchar(50) NOT NULL,
  `weight` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `section`, `weight`) VALUES
(5, 'test', 123),
(6, 'asdf', 123);

-- --------------------------------------------------------

--
-- Table structure for table `time`
--

CREATE TABLE `time` (
  `time_id` int NOT NULL,
  `start` datetime NOT NULL,
  `expire` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `time`
--

INSERT INTO `time` (`time_id`, `start`, `expire`) VALUES
(1, '2026-01-01 18:41:51', '2026-05-14 18:41:51');

-- --------------------------------------------------------

--
-- Table structure for table `userresult`
--

CREATE TABLE `userresult` (
  `result_id` int NOT NULL,
  `id` int NOT NULL,
  `indicator_id` int NOT NULL,
  `time_id` int NOT NULL,
  `score` enum('1','2','3','4','yes','no') NOT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userresult`
--

INSERT INTO `userresult` (`result_id`, `id`, `indicator_id`, `time_id`, `score`, `file`) VALUES
(3, 2, 1, 1, '4', NULL),
(4, 2, 2, 1, 'yes', NULL),
(5, 2, 3, 1, 'yes', 'b1ee8331-1bda-4838-be9b-559e22b5b303-1770827254405-การเขียนโปรแกรมแบบลำดับ+เงื่อนไข+ทำซ้ำ.pdf'),
(6, 2, 4, 1, 'yes', 'b1ee8331-1bda-4838-be9b-559e22b5b303-1770827254405-การเขียนโปรแกรมแบบลำดับ+เงื่อนไข+ทำซ้ำ.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `czid` varchar(50) NOT NULL,
  `phone` int NOT NULL,
  `department` int NOT NULL,
  `position` int NOT NULL,
  `level` int NOT NULL,
  `role` int NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `czid`, `phone`, `department`, `position`, `level`, `role`) VALUES
(1, 'asdf', 'asdf', 'asdf', '12313', 123123, 3, 1, 4, 1),
(2, 'a', 'a', 'asdf', '12313', 123123, 3, 1, 4, 2),
(3, 'b', 'b', 'asdf', '12313', 123123, 3, 1, 4, 2),
(4, 'c', 'c', 'asdf', '12313', 123123, 3, 1, 4, 2),
(5, 'd', 'd', 'asdf', '12313', 123123, 3, 1, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `usersign`
--

CREATE TABLE `usersign` (
  `sign_id` int NOT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usersign`
--

INSERT INTO `usersign` (`sign_id`, `id`) VALUES
(1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boardattachment`
--
ALTER TABLE `boardattachment`
  ADD PRIMARY KEY (`attachement_id`),
  ADD KEY `board_id` (`board_id`),
  ADD KEY `id` (`id`),
  ADD KEY `time_id` (`time_id`);

--
-- Indexes for table `boardresult`
--
ALTER TABLE `boardresult`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `time_id` (`time_id`),
  ADD KEY `indicator_id` (`indicator_id`),
  ADD KEY `id` (`id`),
  ADD KEY `board_id` (`board_id`);

--
-- Indexes for table `boardrole`
--
ALTER TABLE `boardrole`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `boardsign`
--
ALTER TABLE `boardsign`
  ADD PRIMARY KEY (`sign_id`),
  ADD KEY `id` (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `indicator`
--
ALTER TABLE `indicator`
  ADD PRIMARY KEY (`indicator_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`level_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`);

--
-- Indexes for table `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`time_id`);

--
-- Indexes for table `userresult`
--
ALTER TABLE `userresult`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `time_id` (`time_id`),
  ADD KEY `indicator_id` (`indicator_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department` (`department`),
  ADD KEY `position` (`position`),
  ADD KEY `level` (`level`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `usersign`
--
ALTER TABLE `usersign`
  ADD PRIMARY KEY (`sign_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boardattachment`
--
ALTER TABLE `boardattachment`
  MODIFY `attachement_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `boardresult`
--
ALTER TABLE `boardresult`
  MODIFY `result_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `boardrole`
--
ALTER TABLE `boardrole`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `boardsign`
--
ALTER TABLE `boardsign`
  MODIFY `sign_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `indicator`
--
ALTER TABLE `indicator`
  MODIFY `indicator_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `level_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `time_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userresult`
--
ALTER TABLE `userresult`
  MODIFY `result_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usersign`
--
ALTER TABLE `usersign`
  MODIFY `sign_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boardattachment`
--
ALTER TABLE `boardattachment`
  ADD CONSTRAINT `boardattachment_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boardattachment_ibfk_2` FOREIGN KEY (`board_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boardattachment_ibfk_3` FOREIGN KEY (`time_id`) REFERENCES `time` (`time_id`);

--
-- Constraints for table `boardresult`
--
ALTER TABLE `boardresult`
  ADD CONSTRAINT `boardresult_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boardresult_ibfk_3` FOREIGN KEY (`board_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boardresult_ibfk_4` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE;

--
-- Constraints for table `boardsign`
--
ALTER TABLE `boardsign`
  ADD CONSTRAINT `boardsign_ibfk_1` FOREIGN KEY (`role`) REFERENCES `boardrole` (`role_id`),
  ADD CONSTRAINT `boardsign_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `indicator`
--
ALTER TABLE `indicator`
  ADD CONSTRAINT `indicator_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userresult`
--
ALTER TABLE `userresult`
  ADD CONSTRAINT `userresult_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userresult_ibfk_3` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`department`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`level`) REFERENCES `level` (`level_id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`position`) REFERENCES `position` (`position_id`),
  ADD CONSTRAINT `users_ibfk_4` FOREIGN KEY (`role`) REFERENCES `role` (`role_id`);

--
-- Constraints for table `usersign`
--
ALTER TABLE `usersign`
  ADD CONSTRAINT `usersign_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

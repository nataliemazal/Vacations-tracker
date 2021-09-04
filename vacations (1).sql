-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2021 at 09:42 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacation_id` int(10) NOT NULL,
  `uuid` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacation_id`, `uuid`) VALUES
(5, '8f6f3de6-c9f4-42f2-a3ab-4f6cde6472de'),
(9, '8f6f3de6-c9f4-42f2-a3ab-4f6cde6472de'),
(3, '8f6f3de6-c9f4-42f2-a3ab-4f6cde6472de'),
(6, '43442130-6ab7-46b0-9379-a1f7c8e72577'),
(6, '8f6f3de6-c9f4-42f2-a3ab-4f6cde6472de');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uuid` varchar(350) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_name` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `first_name`, `last_name`, `user_name`, `password`, `isAdmin`) VALUES
('3df51e41-4175-42ae-8c67-182dd67435f0', 'user', 'user', 'user', 'e5efa5bb2ff3dc0776c8cac6cc0deb84679dadc120e356051ba83c9295d2790454ee745214357d2d8dbc7ad663a74adbb45996f182a6fc41add0000fb40d5870', 0),
('43442130-6ab7-46b0-9379-a1f7c8e72577', 'usertestfirstname', 'usertestlastname', 'usertestusername', '5061b5b8fe0e2c0eacb7067d620f34da87ddca71dfd8e23a0521a14dc9dd683b2e9892d38607294fb3da7e51eb5ec087cc318c0640ac23ec7c96079398102133', 0),
('551feff2-7f85-42c5-8148-9e7da949ded4', 'user', '', 'user12', 'e5efa5bb2ff3dc0776c8cac6cc0deb84679dadc120e356051ba83c9295d2790454ee745214357d2d8dbc7ad663a74adbb45996f182a6fc41add0000fb40d5870', 0),
('56d3ee7d-14d0-4c08-a5d0-cc37548d4bb1', 'natali', 'm', 'usertest', '343be518d3b1c22286f6657a4d23506e3596d0ffa43fdf6833077dbedb9e3deec6a341490f8135fb1f716a5357df0b612f34af64c83bea6bb83fa5654d004444', 0),
('7562cbe9-de51-470d-8e0a-fb63c4e26400', 'natali', 'm', 'test', '9ac738db5af6517bfb9e42187473b323463afc440d9538097f12c58f4325090b2da6cb4d4d56453b04e3eaf3a4a611529ce96c39c3b2e1a4c405793077bd8af9', 0),
('8f6f3de6-c9f4-42f2-a3ab-4f6cde6472de', 'natali', 'm', 'user123456', 'd79e76a3a395b46a8c4f9c4596360ba2b1cd919b8bb5f635b8a1396b38150ace28cb68292f7629465010055f1c311256047d077a1efc290c386320af5924f495', 0),
('a2738eaf-14e4-4e7a-9f04-bb6d184c2e23', 'admin', 'admin', 'admin', '9bfe65c391c8a4f5b2347b5cd58454bace9313f92a767539b75b4dc6b41e9eefd3186c5ac92aff0cca53990467e6d534fe5e3501042eaaf5322058636bbc04b0', 1),
('c9bb9d85-cacb-42e7-8073-47633e945b74', 'user', 'user', 'user1', '1223d736539ab4b25f8247c51d7de0baf51fc2e1caffefdb434c428d87ddf41d7514292fbfc0cdbd21939324531b19977f8e2357adc4b4f0c94eb66aaf8ce35f', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(10) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `description`, `destination`, `start_date`, `end_date`, `price`, `image`) VALUES
(2, 'Broad canals crisscross a city famous for its world class art, tolerance, and happy cyclists.', 'Amsterdam', '2021-08-28', '2021-10-07', 503, 'amsterdam.jpg'),
(3, 'The giant of South America and the fifth-largest country in the world, Brazil endures as one of the worlds most lusted-after and popular travel destinations. Brazil holidays open up a world of luscious beaches, tropical Amazon rainforests, and upbeat Samba rhythms. ', 'Brazil', '2021-08-29', '2021-08-30', 2002, 'brazil.jpg'),
(4, 'Coveted by both the East and the West, Budapests blend of culture, art, and architecture will leave you charmed.', 'Budapest', '2021-10-01', '2021-10-10', 506, 'budapest.jpg'),
(5, 'From double-decker buses to pubs and musicals, the British capital has something special for all.', 'London', '2021-09-22', '2021-09-25', 403, 'london.jpg'),
(6, 'Staggering rock formations line crystalline waters while jungles of immense biodiversity depict natures finest creations. Thailand offers a unique opportunity to rediscover yourself and enjoy untold adventures', 'Thailand', '2021-10-03', '2021-10-17', 2500, 'thailand.jpg'),
(7, 'See amazing feats of civilization, ancient and modern alike, in this 2,500-year-old metropolis', 'Rome', '2021-11-01', '2021-11-06', 701, 'rome.jpg'),
(8, 'Old-world Prague will have you living in a fairytale one minute and exploring Soviet-esque architecture the next.', 'Prague', '2021-11-16', '2021-11-19', 300, 'prague.jpg'),
(9, 'A city so synonymous with beauty, even the least romantic are defenseless against its charms.', 'Paris', '2021-11-01', '2021-11-05', 69, 'paris.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `followers_ibfk_1` (`vacation_id`),
  ADD KEY `uuid` (`uuid`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`uuid`) REFERENCES `users` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

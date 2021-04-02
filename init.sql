DROP DATABASE IF EXISTS `test`;

CREATE DATABASE `test`;

USE `test`;

DROP TABLE IF EXISTS `test`;
CREATE TABLE `list` (
  `scTitle` varchar(255),
  `jpTitle` varchar(255),
  `engTitle` varchar(255),
  `tcTitle` varchar(255),
  `officialSite` varchar(255),
  `posterUrl` varchar(255),
  `thumbUrl` varchar(255),
  `year` varchar(4),
  `month` varchar(2),
  `status` varchar(10),
  `type` varchar(10),
  `subType` varchar(20),
  `videoType` varchar(20),
  `coSub` varchar(255),
  `bgm` varchar(255),
  `dmhy` varchar(255),
  `nyaa` varchar(255),
  `key` varchar(50),
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

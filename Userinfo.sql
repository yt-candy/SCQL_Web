DROP DATABASE IF EXISTS `user`;
CREATE DATABASE `user`; 
USE `user`;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE `userinfo` (
-- id自动递增
  `user_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `userinfo` VALUES (1,'wanghan','114514');
INSERT INTO `userinfo` VALUES (2,'tangxiaomeng','1919810');
INSERT INTO `userinfo` VALUES (3,'hongjingyu','1145141919810');
INSERT INTO `userinfo` VALUES (4,'zhuangjiehang','123456');

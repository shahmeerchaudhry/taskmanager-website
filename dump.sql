-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: WS
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (206,'Shahmeer Chaudhry created Task: Prove P=NP.'),(207,'Shahmeer Chaudhry created Task: Draw Mona Lisa 2.0.'),(208,'Leonardo  da Vinci moved Task: Draw Mona Lisa 2.0 to Doing.'),(209,'Bill Gates moved Task: Prove P=NP to Doing.'),(210,'Shahmeer Chaudhry created Task: Make a website.'),(211,'Shahmeer Chaudhry moved Task: Make a website to Done.'),(212,'Shahmeer Chaudhry deleted Task: Make a website.'),(213,'Bill Gates moved Task: Prove P=NP to To Do.'),(214,'Shahmeer Chaudhry created Task: Thinking.'),(215,'Bill Gates moved Task: Thinking to Done.'),(216,'Shahmeer Chaudhry deleted Task: Thinking.'),(217,'Shahmeer Chaudhry created Task: Sleeping.'),(218,'Bill Gates moved Task: Sleeping to Done.'),(219,'Shahmeer Chaudhry deleted Task: Sleeping.'),(220,'Bill Gates moved Task: Prove P=NP to Doing.'),(221,'Bill Gates moved Task: Prove P=NP to Done.'),(222,'Bill Gates moved Task: Prove P=NP to Doing.'),(223,'Bill Gates moved Task: Prove P=NP to Done.'),(224,'Bill Gates moved Task: Prove P=NP to To Do.'),(225,'Bill Gates moved Task: Prove P=NP to Doing.'),(226,'Bill Gates moved Task: Prove P=NP to Done.'),(227,'Shimmy Chaudhry created Task: Do something.'),(228,'Bill Gates moved Task: Do something to Doing.'),(229,'Bill Gates moved Task: Do something to Done.'),(230,'Shimmy Chaudhry deleted Task: Do something.'),(231,'Shimmy Chaudhry moved Task: Draw Mona Lisa 2.0 to Done.'),(232,'Bill Gates moved Task: Prove P=NP to To Do.'),(233,'Bill Gates moved Task: Do something to To Do.'),(234,'Shahmeer Chaudhry created Task: Have some rest.'),(235,'Bill Gates moved Task: Have some rest to Doing.'),(236,'Bill Gates moved Task: Have some rest to Done.'),(237,'Shahmeer Chaudhry deleted Task: Have some rest.'),(238,'Shimmy Chaudhry created Task: Dream ON.'),(239,'Bill Gates moved Task: Dream ON to Doing.'),(240,'Bill Gates moved Task: Dream ON to Done.'),(241,'Shimmy Chaudhry deleted Task: Dream ON.'),(242,'Shahmeer Chaudhry moved Task: Prove P=NP to Doing.'),(243,'Shahmeer Chaudhry moved Task: Draw Mona Lisa 2.0 to Doing.'),(244,'Shahmeer Chaudhry moved Task: Draw Mona Lisa 2.0 to Done.'),(245,'Shahmeer Chaudhry moved Task: Prove P=NP to Done.'),(246,'Shahmeer Chaudhry deleted Task: Draw Mona Lisa 2.0.'),(247,'Shahmeer Chaudhry moved Task: Prove P=NP to Doing.'),(248,'Shahmeer Chaudhry moved Task: Prove P=NP to To Do.'),(249,'Shahmeer Chaudhry created Task: art.'),(250,'Leonardo  da Vinci moved Task: art to Done.'),(251,'Shahmeer Chaudhry deleted Task: art.'),(252,'Shahmeer Chaudhry created Task: a.'),(253,'Shahmeer Chaudhry moved Task: a to Doing.'),(254,'Shahmeer Chaudhry moved Task: Prove P=NP to Doing.'),(255,'Shahmeer Chaudhry moved Task: a to To Do.'),(256,'Shahmeer Chaudhry moved Task: a to Doing.'),(257,'Shahmeer Chaudhry moved Task: a to To Do.'),(258,'Shahmeer Chaudhry moved Task: a to Doing.'),(259,'Shahmeer Chaudhry moved Task: Prove P=NP to Done.'),(260,'Shahmeer Chaudhry moved Task: Prove P=NP to Doing.'),(261,'Shahmeer Chaudhry moved Task: a to Done.'),(262,'Shahmeer Chaudhry moved Task: a to To Do.'),(263,'Shahmeer Chaudhry moved Task: a to Done.'),(264,'Donald McDonald moved Task: a to To Do.'),(265,'Donald McDonald moved Task: Prove P=NP to Done.');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stat` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `info` longtext,
  `creator` int(11) DEFAULT NULL,
  `due_day` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (12,'done','Prove P=NP','Simple problem really',40,'Sunday'),(21,'todo','a','tas',40,'Wednesday');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_preferences`
--

DROP TABLE IF EXISTS `task_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_preferences` (
  `type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`type_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `task_preferences_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `task_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_preferences_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_preferences`
--

LOCK TABLES `task_preferences` WRITE;
/*!40000 ALTER TABLE `task_preferences` DISABLE KEYS */;
INSERT INTO `task_preferences` VALUES (42,40),(42,41),(43,42),(46,41),(46,43),(50,40),(50,41),(50,42);
/*!40000 ALTER TABLE `task_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_types`
--

DROP TABLE IF EXISTS `task_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeTitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_types`
--

LOCK TABLES `task_types` WRITE;
/*!40000 ALTER TABLE `task_types` DISABLE KEYS */;
INSERT INTO `task_types` VALUES (42,'Coding '),(43,'Designing'),(46,'Thinking'),(50,'Dreaming');
/*!40000 ALTER TABLE `task_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_users`
--

DROP TABLE IF EXISTS `task_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_users` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`task_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `task_users_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  CONSTRAINT `task_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_users`
--

LOCK TABLES `task_users` WRITE;
/*!40000 ALTER TABLE `task_users` DISABLE KEYS */;
INSERT INTO `task_users` VALUES (12,41),(21,40);
/*!40000 ALTER TABLE `task_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_availability`
--

DROP TABLE IF EXISTS `user_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_availability` (
  `user_id` int(11) DEFAULT NULL,
  `day_avail` varchar(10) DEFAULT NULL,
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_availability_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_availability`
--

LOCK TABLES `user_availability` WRITE;
/*!40000 ALTER TABLE `user_availability` DISABLE KEYS */;
INSERT INTO `user_availability` VALUES (40,'Monday'),(40,'Tuesday'),(40,'Wednesday'),(40,'Sunday'),(41,'Monday'),(41,'Sunday'),(42,'Monday'),(42,'Wednesday'),(42,'Saturday'),(40,'Friday'),(41,'Friday'),(40,'Thursday'),(41,'Thursday'),(42,'Sunday'),(43,'Sunday');
/*!40000 ALTER TABLE `user_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (40,'shahmeer','Shahmeer','Chaudhry','shahmeer.chaudhry@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$VJJoEqLHHZGqnGqOBI+axQ$6l8Ki+m58rHxBzpfun/ZyyOVp68PGjanTMqGLvmBvW4',1),(41,'billgates','Bill','Gates','bill@gates.com','$argon2i$v=19$m=4096,t=3,p=1$MjTf/T18qDIeY4Rd/j5nWg$8Y0Ixye48JRb2MKvhLEsYAioQ2lLK74bJJqPylc5Ees',0),(42,'davinci','Leonardo ','da Vinci','daVici@gmail.com','$argon2i$v=19$m=4096,t=3,p=1$DEZkvnpw+YbWzg7meJT6Xw$kVjbBlmfSaGOF+2SInzyny9fcIHQle/sS5OcgCzKs6g',0),(43,'mcdonald','Donald','McDonald','kfc@mcdonalds.com','$argon2i$v=19$m=4096,t=3,p=1$5BprvPN2WoiHAvcmX3Fx1w$WW63ku+gqVPWLOAIWYOf3w61ZUuz4NQINjKKi2MrBbo',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-27 14:39:43

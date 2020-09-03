-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.19 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for auto_delovi
DROP DATABASE IF EXISTS `auto_delovi`;
CREATE DATABASE IF NOT EXISTS `auto_delovi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `auto_delovi`;

-- Dumping structure for table auto_delovi.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '0',
  `password` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.admin: ~2 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
	(1, 'admin', 'admin'),
	(2, 'ilka', '849D2086884DEC9651288A4DE461D04CDFF7B2A1F1B3CB4C728312C94BF8EC528C9494A122F14567FA2894D77B83F51FAC2B1695129EE3D26991C17F0BD17AC4');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.artikl
DROP TABLE IF EXISTS `artikl`;
CREATE TABLE IF NOT EXISTS `artikl` (
  `artikl_id` int unsigned NOT NULL AUTO_INCREMENT,
  `naziv` varchar(30) NOT NULL,
  `kategorija` int unsigned NOT NULL DEFAULT '0',
  `slika` varchar(50) DEFAULT '0',
  `stanje` int unsigned NOT NULL DEFAULT '1',
  `opis` varchar(200) DEFAULT '0',
  `cena` decimal(10,0) NOT NULL,
  `fabricki` varchar(3) NOT NULL DEFAULT 'Da',
  `garancija` int DEFAULT '0',
  PRIMARY KEY (`artikl_id`),
  KEY `fk_artikl_kategorija` (`kategorija`),
  CONSTRAINT `fk_artikl_kategorija` FOREIGN KEY (`kategorija`) REFERENCES `kategorija` (`kategorija_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.artikl: ~4 rows (approximately)
/*!40000 ALTER TABLE `artikl` DISABLE KEYS */;
INSERT INTO `artikl` (`artikl_id`, `naziv`, `kategorija`, `slika`, `stanje`, `opis`, `cena`, `fabricki`, `garancija`) VALUES
	(1, 'Hladnjak vode Fiat Marea', 6, '0', 5, 'Hladnjak vode', 4968, 'Da', 12),
	(2, 'Hldanjak vode Opel Corsa', 6, '0', 10, 'Hladnjak vode', 3800, 'Da', 12),
	(3, '205x55x16', 3, '0', 50, 'Gume za auto', 5200, 'Da', 12),
	(4, '215x65x17', 1, '', 10, 'Gume za auto', 7700, 'da', 12);
/*!40000 ALTER TABLE `artikl` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.artikl_automobil
DROP TABLE IF EXISTS `artikl_automobil`;
CREATE TABLE IF NOT EXISTS `artikl_automobil` (
  `automobil` int unsigned NOT NULL,
  `artikl` int unsigned NOT NULL,
  PRIMARY KEY (`automobil`,`artikl`),
  KEY `fk_artikl_automobil_artikl` (`artikl`),
  CONSTRAINT `fk_artikl_automobil_artikl` FOREIGN KEY (`artikl`) REFERENCES `artikl` (`artikl_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_artikl_automobil_automobil` FOREIGN KEY (`automobil`) REFERENCES `automobil` (`auto_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.artikl_automobil: ~1 rows (approximately)
/*!40000 ALTER TABLE `artikl_automobil` DISABLE KEYS */;
INSERT INTO `artikl_automobil` (`automobil`, `artikl`) VALUES
	(6, 4);
/*!40000 ALTER TABLE `artikl_automobil` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.automobil
DROP TABLE IF EXISTS `automobil`;
CREATE TABLE IF NOT EXISTS `automobil` (
  `auto_id` int unsigned NOT NULL AUTO_INCREMENT,
  `marka` varchar(25) NOT NULL DEFAULT '0',
  `model` varchar(25) NOT NULL DEFAULT '0',
  PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.automobil: ~2 rows (approximately)
/*!40000 ALTER TABLE `automobil` DISABLE KEYS */;
INSERT INTO `automobil` (`auto_id`, `marka`, `model`) VALUES
	(5, 'bmw', '118'),
	(6, 'bmw', 'x5');
/*!40000 ALTER TABLE `automobil` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.kategorija
DROP TABLE IF EXISTS `kategorija`;
CREATE TABLE IF NOT EXISTS `kategorija` (
  `kategorija_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ime` varchar(30) NOT NULL DEFAULT '0',
  `parent_kategorija` int unsigned DEFAULT NULL,
  PRIMARY KEY (`kategorija_id`),
  UNIQUE KEY `ime` (`ime`),
  KEY `fk_kategorija_potkategorija` (`parent_kategorija`),
  CONSTRAINT `fk_kategorija_potkategorija` FOREIGN KEY (`parent_kategorija`) REFERENCES `kategorija` (`kategorija_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.kategorija: ~6 rows (approximately)
/*!40000 ALTER TABLE `kategorija` DISABLE KEYS */;
INSERT INTO `kategorija` (`kategorija_id`, `ime`, `parent_kategorija`) VALUES
	(1, 'Gume', NULL),
	(2, 'Zimske gume', 1),
	(3, 'Letnje gume', 1),
	(5, 'Rashladni sistemi', NULL),
	(6, 'Hladnjak vode', 5),
	(7, 'Hladnjak klime', 5);
/*!40000 ALTER TABLE `kategorija` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.korisnik
DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `korisnik_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL DEFAULT '0',
  `ime` varchar(30) NOT NULL DEFAULT '0',
  `prezime` varchar(40) NOT NULL DEFAULT '0',
  `email` varchar(40) NOT NULL DEFAULT '0',
  `adresa` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.korisnik: ~2 rows (approximately)
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` (`korisnik_id`, `username`, `password`, `ime`, `prezime`, `email`, `adresa`) VALUES
	(4, 'Misko', '0F1CBF02510B6714C483462190F2059666D6A024693072E610F99EAE63572F671A1427DAB7AB1400EC727520CECF6E38F0DFAFDD21548A0050D362C833AF2BE9', 'Milos', 'Stanojevic', 'nikola.ilic774@gmail.com', 'Djure Salaja 42 a'),
	(5, 'nikola', '866C151C3F96EA5F3AE6E4D0F0BE21663FAEA41C7E4DB1D0B36A80619E74B056F828904826425DD0B2A49621F5C117E3248155CEAF02231B5A107B723CC0016A', 'Nikola', 'Ilic', 'nikola.ilic.161@singimail.rs', 'Pcinjska 13 \nVladicin Han');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.korpa
DROP TABLE IF EXISTS `korpa`;
CREATE TABLE IF NOT EXISTS `korpa` (
  `korpa_id` int unsigned NOT NULL AUTO_INCREMENT,
  `korisnik_id` int unsigned NOT NULL DEFAULT '0',
  `vreme_kreiranja` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`korpa_id`),
  KEY `fk_korpa_korisnik_id` (`korisnik_id`),
  CONSTRAINT `fk_korpa_korisnik_id` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.korpa: ~7 rows (approximately)
/*!40000 ALTER TABLE `korpa` DISABLE KEYS */;
INSERT INTO `korpa` (`korpa_id`, `korisnik_id`, `vreme_kreiranja`) VALUES
	(6, 4, '2020-07-30 17:19:51'),
	(7, 4, '2020-08-26 14:53:06'),
	(8, 4, '2020-08-26 15:02:34'),
	(9, 4, '2020-08-26 16:33:44'),
	(10, 4, '2020-08-26 16:58:17'),
	(11, 4, '2020-08-26 17:02:12'),
	(12, 4, '2020-08-26 17:04:31');
/*!40000 ALTER TABLE `korpa` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.korpa_stavka
DROP TABLE IF EXISTS `korpa_stavka`;
CREATE TABLE IF NOT EXISTS `korpa_stavka` (
  `stavka_id` int unsigned NOT NULL AUTO_INCREMENT,
  `artikl` int unsigned NOT NULL DEFAULT '0',
  `korpa` int unsigned NOT NULL DEFAULT '0',
  `kolicina` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`stavka_id`),
  UNIQUE KEY `artikl_korpa` (`artikl`,`korpa`),
  KEY `artikl` (`artikl`),
  KEY `korpa` (`korpa`),
  CONSTRAINT `fk_korpa_stavka_artikl` FOREIGN KEY (`artikl`) REFERENCES `artikl` (`artikl_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_korpa_stavka_korpa` FOREIGN KEY (`korpa`) REFERENCES `korpa` (`korpa_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.korpa_stavka: ~9 rows (approximately)
/*!40000 ALTER TABLE `korpa_stavka` DISABLE KEYS */;
INSERT INTO `korpa_stavka` (`stavka_id`, `artikl`, `korpa`, `kolicina`) VALUES
	(12, 1, 6, 55),
	(13, 2, 6, 51),
	(14, 3, 6, 15),
	(15, 2, 7, 1),
	(16, 1, 8, 1),
	(17, 1, 9, 1),
	(18, 1, 10, 1),
	(19, 1, 11, 1),
	(20, 1, 12, 1);
/*!40000 ALTER TABLE `korpa_stavka` ENABLE KEYS */;

-- Dumping structure for table auto_delovi.narudzbenica
DROP TABLE IF EXISTS `narudzbenica`;
CREATE TABLE IF NOT EXISTS `narudzbenica` (
  `narudzbenica_id` int unsigned NOT NULL AUTO_INCREMENT,
  `korpa_id` int unsigned NOT NULL DEFAULT '0',
  `vreme_kreiranja` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('odbijeno','prihvaceno','poslato','na cekanju') NOT NULL DEFAULT 'na cekanju',
  PRIMARY KEY (`narudzbenica_id`),
  UNIQUE KEY `korpa_id` (`korpa_id`),
  CONSTRAINT `fk_narudzbenica_korpa_id` FOREIGN KEY (`korpa_id`) REFERENCES `korpa` (`korpa_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table auto_delovi.narudzbenica: ~7 rows (approximately)
/*!40000 ALTER TABLE `narudzbenica` DISABLE KEYS */;
INSERT INTO `narudzbenica` (`narudzbenica_id`, `korpa_id`, `vreme_kreiranja`, `status`) VALUES
	(5, 6, '2020-08-26 14:45:00', 'na cekanju'),
	(6, 7, '2020-08-26 14:53:38', 'na cekanju'),
	(7, 8, '2020-08-26 15:04:01', 'na cekanju'),
	(8, 9, '2020-08-26 16:54:50', 'na cekanju'),
	(9, 10, '2020-08-26 16:59:36', 'na cekanju'),
	(10, 11, '2020-08-26 17:02:22', 'na cekanju'),
	(11, 12, '2020-08-26 17:04:48', 'na cekanju');
/*!40000 ALTER TABLE `narudzbenica` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

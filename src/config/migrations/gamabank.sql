-- --------------------------------------------------------
-- Host:                         solt.com.br
-- Server version:               5.7.33-cll-lve - MySQL Community Server - (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for soltcomb_gamabank
CREATE DATABASE IF NOT EXISTS `soltcomb_gamabank` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `soltcomb_gamabank`;

-- Dumping structure for table soltcomb_gamabank.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned NOT NULL,
  `bank_code` int(3) unsigned NOT NULL,
  `agency` int(4) unsigned zerofill NOT NULL,
  `account_number` int(6) unsigned zerofill NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_user` (`id_user`),
  KEY `id_client` (`id_user`) USING BTREE,
  KEY `id_bank` (`bank_code`) USING BTREE,
  KEY `account_number` (`account_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.accounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.accounts_balance
CREATE TABLE IF NOT EXISTS `accounts_balance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_number` int(6) unsigned zerofill NOT NULL,
  `month` int(2) unsigned NOT NULL,
  `initial_balance` decimal(10,0) NOT NULL,
  `actual_balance` decimal(10,0) NOT NULL,
  `final_balance` decimal(10,0) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.accounts_balance: ~0 rows (approximately)
/*!40000 ALTER TABLE `accounts_balance` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_balance` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.accounts_intern_transfer
CREATE TABLE IF NOT EXISTS `accounts_intern_transfer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `from_account_number` int(6) unsigned zerofill NOT NULL,
  `to_account_number` int(6) unsigned zerofill NOT NULL,
  `value` decimal(10,0) unsigned NOT NULL,
  `date` datetime(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `to_account_id` (`to_account_number`) USING BTREE,
  KEY `from_account_id` (`from_account_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.accounts_intern_transfer: ~0 rows (approximately)
/*!40000 ALTER TABLE `accounts_intern_transfer` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_intern_transfer` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.accounts_movement
CREATE TABLE IF NOT EXISTS `accounts_movement` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account_number` int(6) unsigned zerofill NOT NULL,
  `value` decimal(10,0) NOT NULL,
  `type` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.accounts_movement: ~0 rows (approximately)
/*!40000 ALTER TABLE `accounts_movement` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_movement` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.banks
CREATE TABLE IF NOT EXISTS `banks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` char(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `code fk` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.banks: ~10 rows (approximately)
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` (`id`, `code`, `name`, `created_at`, `updated_at`) VALUES
	(1, '479', 'Banco ItauBank S.A', '2021-03-12 18:46:08.0', '2021-03-12 18:46:08.6'),
	(2, '77', 'Banco Inter S.A.', '2021-03-12 21:56:12.0', '2021-03-12 21:56:12.9'),
	(3, '341', 'Itaú Unibanco S.A.', '2021-03-12 21:57:36.0', '2021-03-12 21:57:36.4'),
	(4, '104', 'Caixa Econômica Fedeereal CEF', '2021-03-12 21:58:21.0', '2021-03-12 21:58:21.8'),
	(5, '33', 'Banco Santander Brasil S.A.', '2021-03-12 21:59:00.0', '2021-03-12 21:59:00.5'),
	(6, '237', 'Bradesco S.A.', '2021-03-12 22:00:33.0', '2021-03-12 22:00:33.1'),
	(7, '260', 'Nu Pagamentos  S.A. Nubank', '2021-03-12 22:01:33.0', '2021-03-12 22:01:33.7'),
	(8, '212', 'Banco Original S.A.', '2021-03-12 22:02:09.0', '2021-03-12 22:02:09.7'),
	(9, '422', 'Banco Safra S.A.', '2021-03-12 22:02:33.0', '2021-03-12 22:02:33.7'),
	(10, '500', 'Banco Gama S.A.', '2021-03-12 22:03:16.0', '2021-03-12 22:03:16.2');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.cards_emitter
CREATE TABLE IF NOT EXISTS `cards_emitter` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.cards_emitter: ~10 rows (approximately)
/*!40000 ALTER TABLE `cards_emitter` DISABLE KEYS */;
INSERT INTO `cards_emitter` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'Visa', '2021-03-16 23:30:13.2', '2021-03-16 23:30:13.2'),
	(2, 'MasterCard', '2021-03-16 23:30:19.1', '2021-03-16 23:30:19.1'),
	(3, 'American Express', '2021-03-16 23:30:42.8', '2021-03-16 23:30:42.8'),
	(4, 'Elo', '2021-03-16 23:30:48.5', '2021-03-16 23:30:48.5'),
	(5, 'Maestro', '2021-03-16 23:30:56.9', '2021-03-16 23:30:56.9'),
	(6, 'Alelo', '2021-03-16 23:31:05.5', '2021-03-16 23:31:05.5'),
	(7, 'HiperCard', '2021-03-16 23:31:16.2', '2021-03-16 23:31:16.2'),
	(8, 'Sodexo', '2021-03-16 23:31:40.7', '2021-03-16 23:31:40.7'),
	(9, 'Hiper', '2021-03-16 23:31:52.4', '2021-03-16 23:31:52.4'),
	(10, 'Diners Club International', '2021-03-16 23:32:09.8', '2021-03-16 23:32:09.8');
/*!40000 ALTER TABLE `cards_emitter` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `phone` char(13) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_user unique` (`id_user`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.clients: ~0 rows (approximately)
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.credit_cards
CREATE TABLE IF NOT EXISTS `credit_cards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account_number` int(6) unsigned zerofill NOT NULL,
  `number` char(16) NOT NULL,
  `expire_year` year(4) NOT NULL,
  `security_code` char(3) NOT NULL,
  `limit_value` int(11) unsigned NOT NULL,
  `due_close_day` tinyint(2) unsigned NOT NULL,
  `due_payday` tinyint(2) unsigned NOT NULL,
  `emitter_id` tinyint(3) unsigned NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  `Column 12` int(11) DEFAULT NULL,
  `Column 13` int(11) DEFAULT NULL,
  `Column 14` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  UNIQUE KEY `account_number_key` (`account_number`),
  KEY `account_number` (`account_number`),
  KEY `number credit card` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.credit_cards: ~0 rows (approximately)
/*!40000 ALTER TABLE `credit_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_cards` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.credit_cards_balance
CREATE TABLE IF NOT EXISTS `credit_cards_balance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `month` tinyint(3) unsigned NOT NULL,
  `available_balance` decimal(10,0) unsigned NOT NULL,
  `due_balance` decimal(10,0) unsigned NOT NULL,
  `credit_card_number` char(16) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `credit_card_number` (`credit_card_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.credit_cards_balance: ~0 rows (approximately)
/*!40000 ALTER TABLE `credit_cards_balance` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_cards_balance` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.credit_cards_movement
CREATE TABLE IF NOT EXISTS `credit_cards_movement` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `credit_card_number` char(16) NOT NULL,
  `description` varchar(255) NOT NULL,
  `value` decimal(10,0) unsigned NOT NULL,
  `instalments` tinyint(3) unsigned NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  KEY `credit_card_number` (`credit_card_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.credit_cards_movement: ~0 rows (approximately)
/*!40000 ALTER TABLE `credit_cards_movement` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_cards_movement` ENABLE KEYS */;

-- Dumping structure for table soltcomb_gamabank.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cpf` char(11) NOT NULL,
  `created_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
  `updated_at` timestamp(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1) ON UPDATE CURRENT_TIMESTAMP(1),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table soltcomb_gamabank.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

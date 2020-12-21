/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1_3306
 Source Server Type    : MySQL
 Source Server Version : 50709
 Source Host           : 127.0.0.1:3306
 Source Schema         : user

 Target Server Type    : MySQL
 Target Server Version : 50709
 File Encoding         : 65001

 Date: 08/12/2020 03:07:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for privilage
-- ----------------------------
DROP TABLE IF EXISTS `privilage`;
CREATE TABLE `privilage`  (
  `idPrivilage` int(11) NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `int` int(11) NULL DEFAULT NULL,
  `string` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `other` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idPrivilage`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of privilage
-- ----------------------------
INSERT INTO `privilage` VALUES (1, 'dashboard', '/dashboard', 'Dashboard', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (2, 'person', '/user-profile', 'User Profile', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (3, 'content_paste', '/table-list', 'Table List', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (4, 'library_books', '/typography', 'Typography', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (5, 'bubble_chart', '/icons', 'Icons', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (6, 'location_on', '/maps', 'Maps', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (7, 'notifications', '/notifications', 'Notifications', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (8, 'notifications', '/register', 'Registration', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (9, 'unarchive', '/upgrade', 'Upgrade to PRO', NULL, NULL, NULL, NULL);
INSERT INTO `privilage` VALUES (10, 'account_tree', '/tree', 'Tree View', NULL, NULL, NULL, 1);
INSERT INTO `privilage` VALUES (11, 'shopping_basket', '/product', 'Products', NULL, NULL, NULL, 1);

-- ----------------------------
-- Table structure for sms_getting_setting
-- ----------------------------
DROP TABLE IF EXISTS `sms_getting_setting`;
CREATE TABLE `sms_getting_setting`  (
  `sms_setting_id` int(11) NOT NULL AUTO_INCREMENT,
  `sms_gatway_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sms_gatway_pwd` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sms_gatway_link` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sms_setting_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sms_getting_setting
-- ----------------------------
INSERT INTO `sms_getting_setting` VALUES (1, '	94702517628', '1587', 'http://textit.biz/sendmsg/index.php?');

-- ----------------------------
-- Table structure for sw_commition
-- ----------------------------
DROP TABLE IF EXISTS `sw_commition`;
CREATE TABLE `sw_commition`  (
  `idCommition` int(11) NOT NULL AUTO_INCREMENT,
  `register_date` date NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `introducerid` int(11) NULL DEFAULT NULL,
  `introducerCommitionId` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idCommition`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1025 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_commition
-- ----------------------------
INSERT INTO `sw_commition` VALUES (1000, '2020-12-02', 1, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1001, '2020-12-02', 1001, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1002, '2020-12-02', 1002, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1003, '2020-12-02', 1003, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1004, '2020-12-02', 1004, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1005, '2020-12-02', 1005, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1006, '2020-12-02', 1006, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1007, '2020-12-02', 1007, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1011, '2020-12-06', 1027, 1001, 1001, 1);
INSERT INTO `sw_commition` VALUES (1012, '2020-12-06', 1030, 1001, 1001, 1);
INSERT INTO `sw_commition` VALUES (1013, '2020-12-06', 1031, 1002, 1002, 1);
INSERT INTO `sw_commition` VALUES (1014, '2020-12-06', 1032, 1005, 1005, 1);
INSERT INTO `sw_commition` VALUES (1015, '2020-12-06', 1033, 1004, 1004, 1);
INSERT INTO `sw_commition` VALUES (1016, '2020-12-06', 1034, 1007, 1007, 1);
INSERT INTO `sw_commition` VALUES (1017, '2020-12-07', 8, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1018, '2020-12-07', 9, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1019, '2020-12-07', 10, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1020, '2020-12-07', 11, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1021, '2020-12-07', 12, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1022, '2020-12-07', 13, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1023, '2020-12-07', 14, 1, 1000, 1);
INSERT INTO `sw_commition` VALUES (1024, '2020-12-07', 15, 1, 1000, 1);

-- ----------------------------
-- Table structure for sw_invoice
-- ----------------------------
DROP TABLE IF EXISTS `sw_invoice`;
CREATE TABLE `sw_invoice`  (
  `idInvoice` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(0) NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `totalValue` double(11, 0) NULL DEFAULT NULL,
  `productId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idInvoice`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_invoice
-- ----------------------------
INSERT INTO `sw_invoice` VALUES (13, '2020-12-07 01:41:51', 1000, 55000, 1);
INSERT INTO `sw_invoice` VALUES (14, '2020-12-07 01:47:55', 8, 55000, 1);
INSERT INTO `sw_invoice` VALUES (15, '2020-12-07 01:51:14', 9, 55000, 1);
INSERT INTO `sw_invoice` VALUES (16, '2020-12-07 01:54:01', 10, 55000, 1);
INSERT INTO `sw_invoice` VALUES (17, '2020-12-07 01:55:46', 11, 55000, 1);
INSERT INTO `sw_invoice` VALUES (18, '2020-12-07 01:58:01', 12, 55000, 1);
INSERT INTO `sw_invoice` VALUES (19, '2020-12-07 01:59:15', 13, 55000, 1);
INSERT INTO `sw_invoice` VALUES (20, '2020-12-07 02:00:47', 14, 55000, 1);
INSERT INTO `sw_invoice` VALUES (21, '2020-12-07 02:02:34', 15, 55000, 1);

-- ----------------------------
-- Table structure for sw_point
-- ----------------------------
DROP TABLE IF EXISTS `sw_point`;
CREATE TABLE `sw_point`  (
  `idPoint` int(11) NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `commitionId` int(11) NULL DEFAULT NULL,
  `invoiceId` int(11) NULL DEFAULT NULL,
  `Side` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `point` double NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sw_pointvalue
-- ----------------------------
DROP TABLE IF EXISTS `sw_pointvalue`;
CREATE TABLE `sw_pointvalue`  (
  `idPoint` int(11) NOT NULL AUTO_INCREMENT,
  `points` double NULL DEFAULT NULL,
  `value` double(255, 0) NULL DEFAULT NULL,
  PRIMARY KEY (`idPoint`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sw_prod
-- ----------------------------
DROP TABLE IF EXISTS `sw_prod`;
CREATE TABLE `sw_prod`  (
  `idProd` int(11) NOT NULL AUTO_INCREMENT,
  `prodName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `prodImage` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `prodPrice` double NULL DEFAULT NULL,
  `prodPoint` double NULL DEFAULT NULL,
  `prodOther` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `prodStatus` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idProd`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_prod
-- ----------------------------
INSERT INTO `sw_prod` VALUES (1, 'Water Filter', NULL, 55000, 1, NULL, 1);

-- ----------------------------
-- Table structure for sw_tree
-- ----------------------------
DROP TABLE IF EXISTS `sw_tree`;
CREATE TABLE `sw_tree`  (
  `swTreeId` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NULL DEFAULT NULL,
  `A` int(11) NULL DEFAULT NULL,
  `B` int(11) NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `commitionId` int(11) NULL DEFAULT NULL,
  `APoint` double NULL DEFAULT NULL,
  `BPoint` double NULL DEFAULT NULL,
  `layar` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `other1` int(11) NULL DEFAULT NULL,
  `other2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`swTreeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1024 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_tree
-- ----------------------------
INSERT INTO `sw_tree` VALUES (1, 0, NULL, NULL, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (2, 1, NULL, NULL, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (3, 1, NULL, NULL, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (4, 2, 1000, 1003, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (5, 2, 1006, 1009, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (6, 3, 1012, 1015, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (7, 3, 1018, 1021, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1000, 4, 1001, 1002, 8, 1017, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1001, 1000, NULL, NULL, 8, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1002, 1000, NULL, NULL, 8, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1003, 4, 1005, 1004, 9, 1018, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1004, 1003, NULL, NULL, 9, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1005, 1003, NULL, NULL, 9, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1006, 5, 1007, 1008, 10, 1019, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1007, 1006, NULL, NULL, 10, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1008, 1006, NULL, NULL, 10, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1009, 5, 1010, 1011, 11, 1020, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1010, 1009, NULL, NULL, 11, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1011, 1009, NULL, NULL, 11, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1012, 6, 1014, 1013, 12, 1021, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1013, 1012, NULL, NULL, 12, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1014, 1012, NULL, NULL, 12, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1015, 6, 1016, 1017, 13, 1022, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1016, 1015, NULL, NULL, 13, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1017, 1015, NULL, NULL, 13, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1018, 7, 1019, 1020, 14, 1023, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1019, 1018, NULL, NULL, 14, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1020, 1018, NULL, NULL, 14, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1021, 7, 1022, 1023, 15, 1024, 0, 0, 0, 1, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1022, 1021, NULL, NULL, 15, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (1023, 1021, NULL, NULL, 15, NULL, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pword` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mobileno` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authcode` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `dateTime` datetime(0) NULL DEFAULT NULL,
  `utypeId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`) USING BTREE,
  INDEX `utype_id`(`utypeId`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`utypeId`) REFERENCES `utype` (`idUtype`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'sadmin', '$2b$10$X8aqwjDnDxhXbxdknbwoeO.o6RLl2tSA0CklP6MRzcefL.RU1p09u', '0702517628', '2629', 0, '2020-11-09 09:28:22', 1);
INSERT INTO `user` VALUES (2, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (3, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (4, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (5, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (6, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (7, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `user` VALUES (8, NULL, '$2b$10$jqI7hozZ7rDygjMG5FGiYegg33Y/nWIJANfq6MQTc2cWX/bqpSo/.', NULL, NULL, 1, '2020-12-07 01:47:55', 2);
INSERT INTO `user` VALUES (9, NULL, NULL, NULL, '1111', 0, '2020-12-07 01:51:14', 4);
INSERT INTO `user` VALUES (10, NULL, NULL, NULL, '1111', 0, '2020-12-07 01:54:01', 4);
INSERT INTO `user` VALUES (11, NULL, NULL, NULL, '1111', 0, '2020-12-07 01:55:46', 4);
INSERT INTO `user` VALUES (12, NULL, NULL, NULL, '1111', 0, '2020-12-07 01:58:01', 4);
INSERT INTO `user` VALUES (13, NULL, NULL, NULL, '1111', 0, '2020-12-07 01:59:15', 4);
INSERT INTO `user` VALUES (14, NULL, NULL, NULL, '1111', 0, '2020-12-07 02:00:47', 4);
INSERT INTO `user` VALUES (15, NULL, NULL, NULL, '1111', 0, '2020-12-07 02:02:34', 4);

-- ----------------------------
-- Table structure for userkey
-- ----------------------------
DROP TABLE IF EXISTS `userkey`;
CREATE TABLE `userkey`  (
  `idUserKey` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `keyStatus` int(11) NULL DEFAULT NULL,
  `keyOder` double NULL DEFAULT NULL,
  `formId` int(11) NULL DEFAULT NULL,
  `val` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idUserKey`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userkey
-- ----------------------------
INSERT INTO `userkey` VALUES (1, 'Full Name', 1, 1, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (2, 'Name With Initials', 1, 2, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (3, 'Date Of Birth', 1, 13, 1, NULL, 'date');
INSERT INTO `userkey` VALUES (4, 'Gender', 1, 11, 1, NULL, '2 radio gender');
INSERT INTO `userkey` VALUES (5, 'Address Line 1', 1, 3, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (6, 'Address Line 2', 1, 4, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (7, 'Address Line 3', 1, 5, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (8, 'City', 1, 6, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (9, 'Mobile Number', 1, 14, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (10, 'Telephone Number', 1, 13.1, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (11, 'Civil Status', 1, 12, 1, NULL, '2 radio civil');
INSERT INTO `userkey` VALUES (12, 'Nationility', 1, 8, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (13, 'Name Of Beneficiary\'s', 1, 16, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (14, 'Relation With Beneficiary\'s', 1, 17, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (15, 'Name In Cheque', 1, 18, 2, NULL, 'text');
INSERT INTO `userkey` VALUES (16, 'Bank Name', 1, 19, 2, NULL, 'text');
INSERT INTO `userkey` VALUES (17, 'Branch', 1, 20, 2, NULL, 'text');
INSERT INTO `userkey` VALUES (18, 'Account Number', 1, 21, 2, NULL, 'text');
INSERT INTO `userkey` VALUES (19, 'Form Filling Date', 1, 22, 4, NULL, 'date');
INSERT INTO `userkey` VALUES (20, 'System Registerd Date', 0, 23, 4, NULL, 'date');
INSERT INTO `userkey` VALUES (21, 'National ID Number', 1, 9, 1, NULL, 'text');
INSERT INTO `userkey` VALUES (22, 'Email', 1, 15, 1, NULL, 'text');

-- ----------------------------
-- Table structure for usertypehasprivilages
-- ----------------------------
DROP TABLE IF EXISTS `usertypehasprivilages`;
CREATE TABLE `usertypehasprivilages`  (
  `idUthp` int(11) NOT NULL AUTO_INCREMENT,
  `utype_id` int(11) NULL DEFAULT NULL,
  `privilage_id` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`idUthp`) USING BTREE,
  INDEX `utype_id`(`utype_id`) USING BTREE,
  INDEX `privilage_id`(`privilage_id`) USING BTREE,
  CONSTRAINT `usertypehasprivilages_ibfk_1` FOREIGN KEY (`utype_id`) REFERENCES `utype` (`idUtype`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usertypehasprivilages_ibfk_2` FOREIGN KEY (`privilage_id`) REFERENCES `privilage` (`idPrivilage`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usertypehasprivilages
-- ----------------------------
INSERT INTO `usertypehasprivilages` VALUES (1, 1, 1, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (3, 3, 1, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (4, 4, 1, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (5, 1, 2, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (6, 1, 3, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (7, 1, 4, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (8, 1, 5, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (9, 1, 6, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (10, 1, 7, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (11, 1, 8, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (12, 1, 9, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (13, 1, 10, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (14, 1, 11, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (15, 3, 2, 1, '2020-12-07 00:07:27');
INSERT INTO `usertypehasprivilages` VALUES (16, 3, 10, 1, '2020-12-07 00:08:03');
INSERT INTO `usertypehasprivilages` VALUES (17, 2, 2, 1, '2020-12-08 01:48:44');
INSERT INTO `usertypehasprivilages` VALUES (18, 2, 10, 1, '2020-12-08 01:48:47');
INSERT INTO `usertypehasprivilages` VALUES (19, 2, 8, 1, '2020-12-08 01:48:51');

-- ----------------------------
-- Table structure for uservalue
-- ----------------------------
DROP TABLE IF EXISTS `uservalue`;
CREATE TABLE `uservalue`  (
  `idUserValue` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NULL DEFAULT NULL,
  `keyId` int(11) NULL DEFAULT NULL,
  `value` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `valueStatus` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUserValue`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `keyId`(`keyId`) USING BTREE,
  CONSTRAINT `uservalue_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `uservalue_ibfk_2` FOREIGN KEY (`keyId`) REFERENCES `userkey` (`idUserKey`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 705 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of uservalue
-- ----------------------------
INSERT INTO `uservalue` VALUES (169, 1, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (170, 2, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (171, 3, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (172, 4, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (173, 5, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (174, 6, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (175, 7, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (515, 1, 21, 'nic', 1);
INSERT INTO `uservalue` VALUES (537, 8, 2, 'ata', 1);
INSERT INTO `uservalue` VALUES (538, 8, 5, 'ata', 1);
INSERT INTO `uservalue` VALUES (539, 8, 1, 'ata', 1);
INSERT INTO `uservalue` VALUES (540, 8, 7, 'ata', 1);
INSERT INTO `uservalue` VALUES (541, 8, 3, '2020-12-15T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (542, 8, 12, 'ata', 1);
INSERT INTO `uservalue` VALUES (543, 8, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (544, 8, 10, 'ata', 1);
INSERT INTO `uservalue` VALUES (545, 8, 9, '0702517628', 1);
INSERT INTO `uservalue` VALUES (546, 8, 8, 'ata', 1);
INSERT INTO `uservalue` VALUES (547, 8, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (548, 8, 21, 'ata', 1);
INSERT INTO `uservalue` VALUES (549, 8, 6, 'ata', 1);
INSERT INTO `uservalue` VALUES (550, 8, 22, 'rm.lasantharanga@gmail.com', 1);
INSERT INTO `uservalue` VALUES (551, 8, 13, 'ata', 1);
INSERT INTO `uservalue` VALUES (552, 8, 14, 'ata', 1);
INSERT INTO `uservalue` VALUES (553, 8, 15, 'ata', 1);
INSERT INTO `uservalue` VALUES (554, 8, 16, 'ata', 1);
INSERT INTO `uservalue` VALUES (555, 8, 19, '2020-12-16T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (556, 8, 17, 'ata', 1);
INSERT INTO `uservalue` VALUES (557, 8, 18, 'ata', 1);
INSERT INTO `uservalue` VALUES (558, 9, 2, 'namaya', 1);
INSERT INTO `uservalue` VALUES (559, 9, 5, 'namaya', 1);
INSERT INTO `uservalue` VALUES (560, 9, 8, 'namaya', 1);
INSERT INTO `uservalue` VALUES (561, 9, 1, 'namaya', 1);
INSERT INTO `uservalue` VALUES (562, 9, 6, 'namaya', 1);
INSERT INTO `uservalue` VALUES (563, 9, 12, 'namaya', 1);
INSERT INTO `uservalue` VALUES (564, 9, 7, 'namaya', 1);
INSERT INTO `uservalue` VALUES (565, 9, 21, 'namaya', 1);
INSERT INTO `uservalue` VALUES (566, 9, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (567, 9, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (568, 9, 3, '2020-12-13T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (569, 9, 10, 'namaya', 1);
INSERT INTO `uservalue` VALUES (570, 9, 9, '0702517628', 1);
INSERT INTO `uservalue` VALUES (571, 9, 22, 'easdf', 1);
INSERT INTO `uservalue` VALUES (572, 9, 14, 'namaya', 1);
INSERT INTO `uservalue` VALUES (573, 9, 15, 'namaya', 1);
INSERT INTO `uservalue` VALUES (574, 9, 13, 'namaya', 1);
INSERT INTO `uservalue` VALUES (575, 9, 16, 'namaya', 1);
INSERT INTO `uservalue` VALUES (576, 9, 17, 'namaya', 1);
INSERT INTO `uservalue` VALUES (577, 9, 18, 'namaya', 1);
INSERT INTO `uservalue` VALUES (578, 9, 19, '2020-12-23T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (579, 10, 1, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (580, 10, 7, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (581, 10, 8, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (582, 10, 6, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (583, 10, 5, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (584, 10, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (585, 10, 21, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (586, 10, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (587, 10, 12, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (588, 10, 2, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (589, 10, 3, '2020-12-01T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (590, 10, 9, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (591, 10, 22, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (592, 10, 10, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (593, 10, 13, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (594, 10, 14, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (595, 10, 15, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (596, 10, 16, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (597, 10, 17, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (598, 10, 18, 'dahaya', 1);
INSERT INTO `uservalue` VALUES (599, 10, 19, '2020-12-08T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (600, 11, 1, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (601, 11, 7, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (602, 11, 5, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (603, 11, 8, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (604, 11, 2, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (605, 11, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (606, 11, 21, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (607, 11, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (608, 11, 6, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (609, 11, 12, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (610, 11, 3, '2020-12-09T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (611, 11, 10, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (612, 11, 9, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (613, 11, 22, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (614, 11, 14, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (615, 11, 15, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (616, 11, 16, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (617, 11, 18, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (618, 11, 17, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (619, 11, 13, 'ekolaha', 1);
INSERT INTO `uservalue` VALUES (620, 11, 19, '2020-12-23T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (621, 12, 6, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (622, 12, 7, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (623, 12, 8, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (624, 12, 1, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (625, 12, 12, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (626, 12, 21, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (627, 12, 2, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (628, 12, 5, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (629, 12, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (630, 12, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (631, 12, 10, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (632, 12, 3, '2020-12-22T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (633, 12, 9, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (634, 12, 22, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (635, 12, 13, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (636, 12, 14, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (637, 12, 15, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (638, 12, 16, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (639, 12, 17, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (640, 12, 18, 'dolaha', 1);
INSERT INTO `uservalue` VALUES (641, 12, 19, '2020-12-24T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (642, 13, 21, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (643, 13, 6, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (644, 13, 12, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (645, 13, 5, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (646, 13, 2, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (647, 13, 8, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (648, 13, 7, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (649, 13, 1, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (650, 13, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (651, 13, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (652, 13, 3, '2020-12-22T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (653, 13, 10, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (654, 13, 9, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (655, 13, 22, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (656, 13, 13, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (657, 13, 14, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (658, 13, 15, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (659, 13, 16, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (660, 13, 17, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (661, 13, 18, 'dahathuna', 1);
INSERT INTO `uservalue` VALUES (662, 13, 19, '2020-12-17T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (663, 14, 1, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (664, 14, 2, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (665, 14, 6, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (666, 14, 21, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (667, 14, 5, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (668, 14, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (669, 14, 7, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (670, 14, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (671, 14, 8, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (672, 14, 12, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (673, 14, 3, '2020-12-07T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (674, 14, 10, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (675, 14, 9, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (676, 14, 22, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (677, 14, 13, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (678, 14, 14, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (679, 14, 15, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (680, 14, 16, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (681, 14, 17, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (682, 14, 18, 'dahathara', 1);
INSERT INTO `uservalue` VALUES (683, 14, 19, '2020-12-23T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (684, 15, 2, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (685, 15, 21, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (686, 15, 1, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (687, 15, 8, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (688, 15, 6, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (689, 15, 7, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (690, 15, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (691, 15, 5, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (692, 15, 12, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (693, 15, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (694, 15, 3, '2020-12-03T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (695, 15, 10, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (696, 15, 9, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (697, 15, 22, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (698, 15, 13, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (699, 15, 15, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (700, 15, 16, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (701, 15, 18, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (702, 15, 17, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (703, 15, 14, 'dahanamaya', 1);
INSERT INTO `uservalue` VALUES (704, 15, 19, '2020-12-30T18:30:00.000Z', 1);

-- ----------------------------
-- Table structure for utype
-- ----------------------------
DROP TABLE IF EXISTS `utype`;
CREATE TABLE `utype`  (
  `idUtype` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idUtype`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of utype
-- ----------------------------
INSERT INTO `utype` VALUES (1, 'Super Admin', 'All Privilages are on System Developper', 1);
INSERT INTO `utype` VALUES (2, 'Admin', 'Admin Privilages are on', 1);
INSERT INTO `utype` VALUES (3, 'User Type 1', 'Normal User 1', 1);
INSERT INTO `utype` VALUES (4, 'User Type 2', 'Normal User 2', 1);
INSERT INTO `utype` VALUES (5, 'User Type 3', 'Only User No Privilages', 1);

SET FOREIGN_KEY_CHECKS = 1;

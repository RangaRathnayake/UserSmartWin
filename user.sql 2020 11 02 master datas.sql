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

 Date: 02/12/2020 12:35:49
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
INSERT INTO `sms_getting_setting` VALUES (1, '94702132393', '4670', 'http://textit.biz/sendmsg/index.php?');

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
) ENGINE = InnoDB AUTO_INCREMENT = 1008 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_commition
-- ----------------------------
INSERT INTO `sw_commition` VALUES (1000, '2020-12-02', 1000, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1001, '2020-12-02', 1002, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1002, '2020-12-02', 1003, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1003, '2020-12-02', 1004, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1004, '2020-12-02', 1005, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1005, '2020-12-02', 1006, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1006, '2020-12-02', 1007, 1, 1, 1);
INSERT INTO `sw_commition` VALUES (1007, '2020-12-02', 1008, 1, 1, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `sw_prod` VALUES (1, 'Water Filter', NULL, 40000, 1, NULL, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sw_tree
-- ----------------------------
INSERT INTO `sw_tree` VALUES (1, 0, 2, 3, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (2, 1, 4, 5, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (3, 1, 6, 7, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (4, 2, 8, 9, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (5, 2, 10, 11, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (6, 3, 12, 13, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (7, 3, 14, 15, 1, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (8, 4, 16, 17, 1000, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (9, 4, 18, 19, 1001, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (10, 5, 20, 21, 1002, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (11, 5, 22, 23, 1003, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (12, 6, 24, 25, 1004, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (13, 6, 26, 27, 1005, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (14, 7, 28, 29, 1006, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (15, 7, 30, 31, 1007, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (16, 8, 0, 0, 1000, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (17, 8, 0, 0, 1000, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (18, 9, 0, 0, 1001, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (19, 9, 0, 0, 1001, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (20, 10, 0, 0, 1002, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (21, 10, 0, 0, 1002, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (22, 11, 0, 0, 1003, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (23, 11, 0, 0, 1003, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (24, 12, 0, 0, 1004, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (25, 12, 0, 0, 1004, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (26, 13, 0, 0, 1005, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (27, 13, 0, 0, 1005, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (28, 14, 0, 0, 1006, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (29, 14, 0, 0, 1006, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (30, 15, 0, 0, 1007, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');
INSERT INTO `sw_tree` VALUES (31, 15, 0, 0, 1007, 0, 0, 0, 0, 0, '../../../assets/img/profile.png', 0, '0');

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
) ENGINE = InnoDB AUTO_INCREMENT = 1009 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `user` VALUES (1000, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:40:32', 5);
INSERT INTO `user` VALUES (1001, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:41:23', 5);
INSERT INTO `user` VALUES (1002, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:42:26', 5);
INSERT INTO `user` VALUES (1003, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:44:26', 5);
INSERT INTO `user` VALUES (1004, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:45:10', 5);
INSERT INTO `user` VALUES (1005, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:45:43', 5);
INSERT INTO `user` VALUES (1006, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:46:20', 5);
INSERT INTO `user` VALUES (1007, NULL, NULL, NULL, NULL, 0, '2020-11-28 12:47:21', 5);
INSERT INTO `user` VALUES (1008, NULL, NULL, NULL, NULL, 0, '2020-11-28 05:37:12', 5);

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usertypehasprivilages
-- ----------------------------
INSERT INTO `usertypehasprivilages` VALUES (1, 1, 1, 1, '2020-11-09 20:39:28');
INSERT INTO `usertypehasprivilages` VALUES (2, 2, 1, 1, '2020-11-09 20:39:28');
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
) ENGINE = InnoDB AUTO_INCREMENT = 197 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of uservalue
-- ----------------------------
INSERT INTO `uservalue` VALUES (1, 1000, 1, 'first', 1);
INSERT INTO `uservalue` VALUES (2, 1000, 2, 'first', 1);
INSERT INTO `uservalue` VALUES (3, 1000, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (4, 1000, 7, 'first', 1);
INSERT INTO `uservalue` VALUES (5, 1000, 12, 'first', 1);
INSERT INTO `uservalue` VALUES (6, 1000, 21, '941681603v', 1);
INSERT INTO `uservalue` VALUES (7, 1000, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (8, 1000, 6, 'first', 1);
INSERT INTO `uservalue` VALUES (9, 1000, 8, 'first', 1);
INSERT INTO `uservalue` VALUES (10, 1000, 5, 'first', 1);
INSERT INTO `uservalue` VALUES (11, 1000, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (12, 1000, 10, 'first', 1);
INSERT INTO `uservalue` VALUES (13, 1000, 9, 'first', 1);
INSERT INTO `uservalue` VALUES (14, 1000, 22, 'first', 1);
INSERT INTO `uservalue` VALUES (15, 1000, 13, 'first', 1);
INSERT INTO `uservalue` VALUES (16, 1000, 14, 'first', 1);
INSERT INTO `uservalue` VALUES (17, 1000, 15, 'first', 1);
INSERT INTO `uservalue` VALUES (18, 1000, 16, 'first', 1);
INSERT INTO `uservalue` VALUES (19, 1000, 17, 'first', 1);
INSERT INTO `uservalue` VALUES (20, 1000, 18, 'first', 1);
INSERT INTO `uservalue` VALUES (21, 1000, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (22, 1001, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (23, 1001, 5, 'second', 1);
INSERT INTO `uservalue` VALUES (24, 1001, 12, 'second', 1);
INSERT INTO `uservalue` VALUES (25, 1001, 21, 'second', 1);
INSERT INTO `uservalue` VALUES (26, 1001, 6, 'second', 1);
INSERT INTO `uservalue` VALUES (27, 1001, 8, 'second', 1);
INSERT INTO `uservalue` VALUES (28, 1001, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (29, 1001, 7, 'second', 1);
INSERT INTO `uservalue` VALUES (30, 1001, 1, 'second', 1);
INSERT INTO `uservalue` VALUES (31, 1001, 2, 'second', 1);
INSERT INTO `uservalue` VALUES (32, 1001, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (33, 1001, 10, 'second', 1);
INSERT INTO `uservalue` VALUES (34, 1001, 9, 'second', 1);
INSERT INTO `uservalue` VALUES (35, 1001, 22, 'second', 1);
INSERT INTO `uservalue` VALUES (36, 1001, 13, 'second', 1);
INSERT INTO `uservalue` VALUES (37, 1001, 14, 'second', 1);
INSERT INTO `uservalue` VALUES (38, 1001, 15, 'second', 1);
INSERT INTO `uservalue` VALUES (39, 1001, 16, 'second', 1);
INSERT INTO `uservalue` VALUES (40, 1001, 17, 'second', 1);
INSERT INTO `uservalue` VALUES (41, 1001, 18, 'second', 1);
INSERT INTO `uservalue` VALUES (42, 1001, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (43, 1002, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (44, 1002, 2, 'therd', 1);
INSERT INTO `uservalue` VALUES (45, 1002, 1, 'therd', 1);
INSERT INTO `uservalue` VALUES (46, 1002, 5, 'therd', 1);
INSERT INTO `uservalue` VALUES (47, 1002, 6, 'therd', 1);
INSERT INTO `uservalue` VALUES (48, 1002, 8, 'therd', 1);
INSERT INTO `uservalue` VALUES (49, 1002, 12, 'therd', 1);
INSERT INTO `uservalue` VALUES (50, 1002, 7, 'therd', 1);
INSERT INTO `uservalue` VALUES (51, 1002, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (52, 1002, 21, 'therd', 1);
INSERT INTO `uservalue` VALUES (53, 1002, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (54, 1002, 10, 'therd', 1);
INSERT INTO `uservalue` VALUES (55, 1002, 9, 'therd', 1);
INSERT INTO `uservalue` VALUES (56, 1002, 22, 'therd', 1);
INSERT INTO `uservalue` VALUES (57, 1002, 13, 'therd', 1);
INSERT INTO `uservalue` VALUES (58, 1002, 14, 'therd', 1);
INSERT INTO `uservalue` VALUES (59, 1002, 15, 'therd', 1);
INSERT INTO `uservalue` VALUES (60, 1002, 16, 'therd', 1);
INSERT INTO `uservalue` VALUES (61, 1002, 18, 'therd', 1);
INSERT INTO `uservalue` VALUES (62, 1002, 17, 'therd', 1);
INSERT INTO `uservalue` VALUES (63, 1002, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (64, 1003, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (65, 1003, 6, 'fourth', 1);
INSERT INTO `uservalue` VALUES (66, 1003, 1, 'fourth', 1);
INSERT INTO `uservalue` VALUES (67, 1003, 5, 'fourth', 1);
INSERT INTO `uservalue` VALUES (68, 1003, 21, 'fourth', 1);
INSERT INTO `uservalue` VALUES (69, 1003, 7, 'fourth', 1);
INSERT INTO `uservalue` VALUES (70, 1003, 12, 'fourth', 1);
INSERT INTO `uservalue` VALUES (71, 1003, 2, 'fourth', 1);
INSERT INTO `uservalue` VALUES (72, 1003, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (73, 1003, 8, 'fourth', 1);
INSERT INTO `uservalue` VALUES (74, 1003, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (75, 1003, 10, 'fourth', 1);
INSERT INTO `uservalue` VALUES (76, 1003, 9, 'fourth', 1);
INSERT INTO `uservalue` VALUES (77, 1003, 13, 'fourth', 1);
INSERT INTO `uservalue` VALUES (78, 1003, 22, 'fourth', 1);
INSERT INTO `uservalue` VALUES (79, 1003, 14, 'fourth', 1);
INSERT INTO `uservalue` VALUES (80, 1003, 15, 'fourth', 1);
INSERT INTO `uservalue` VALUES (81, 1003, 16, 'fourth', 1);
INSERT INTO `uservalue` VALUES (82, 1003, 17, 'fourth', 1);
INSERT INTO `uservalue` VALUES (83, 1003, 18, 'fourth', 1);
INSERT INTO `uservalue` VALUES (84, 1003, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (85, 1004, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (86, 1004, 2, 'fifth', 1);
INSERT INTO `uservalue` VALUES (87, 1004, 5, 'fifth', 1);
INSERT INTO `uservalue` VALUES (88, 1004, 6, 'fifth', 1);
INSERT INTO `uservalue` VALUES (89, 1004, 7, 'fifth', 1);
INSERT INTO `uservalue` VALUES (90, 1004, 1, 'fifth', 1);
INSERT INTO `uservalue` VALUES (91, 1004, 12, 'fifth', 1);
INSERT INTO `uservalue` VALUES (92, 1004, 8, 'fifth', 1);
INSERT INTO `uservalue` VALUES (93, 1004, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (94, 1004, 21, 'fifth', 1);
INSERT INTO `uservalue` VALUES (95, 1004, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (96, 1004, 10, 'fifth', 1);
INSERT INTO `uservalue` VALUES (97, 1004, 9, 'fifth', 1);
INSERT INTO `uservalue` VALUES (98, 1004, 22, 'fifth', 1);
INSERT INTO `uservalue` VALUES (99, 1004, 13, 'fifth', 1);
INSERT INTO `uservalue` VALUES (100, 1004, 14, 'fifth', 1);
INSERT INTO `uservalue` VALUES (101, 1004, 15, 'fifth', 1);
INSERT INTO `uservalue` VALUES (102, 1004, 16, 'fifth', 1);
INSERT INTO `uservalue` VALUES (103, 1004, 17, 'fifth', 1);
INSERT INTO `uservalue` VALUES (104, 1004, 18, 'fifth', 1);
INSERT INTO `uservalue` VALUES (105, 1004, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (106, 1005, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (107, 1005, 8, 'sixth', 1);
INSERT INTO `uservalue` VALUES (108, 1005, 5, 'sixth', 1);
INSERT INTO `uservalue` VALUES (109, 1005, 12, 'sixth', 1);
INSERT INTO `uservalue` VALUES (110, 1005, 2, 'sixth', 1);
INSERT INTO `uservalue` VALUES (111, 1005, 6, 'sixth', 1);
INSERT INTO `uservalue` VALUES (112, 1005, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (113, 1005, 7, 'sixth', 1);
INSERT INTO `uservalue` VALUES (114, 1005, 1, 'sixth', 1);
INSERT INTO `uservalue` VALUES (115, 1005, 21, 'sixth', 1);
INSERT INTO `uservalue` VALUES (116, 1005, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (117, 1005, 10, 'sixth', 1);
INSERT INTO `uservalue` VALUES (118, 1005, 9, 'sixth', 1);
INSERT INTO `uservalue` VALUES (119, 1005, 22, 'sixth', 1);
INSERT INTO `uservalue` VALUES (120, 1005, 13, 'sixth', 1);
INSERT INTO `uservalue` VALUES (121, 1005, 14, 'sixth', 1);
INSERT INTO `uservalue` VALUES (122, 1005, 15, 'sixth', 1);
INSERT INTO `uservalue` VALUES (123, 1005, 16, 'sixth', 1);
INSERT INTO `uservalue` VALUES (124, 1005, 17, 'sixth', 1);
INSERT INTO `uservalue` VALUES (125, 1005, 18, 'sixth', 1);
INSERT INTO `uservalue` VALUES (126, 1005, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (127, 1006, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (128, 1006, 2, 'seventh', 1);
INSERT INTO `uservalue` VALUES (129, 1006, 1, 'seventh', 1);
INSERT INTO `uservalue` VALUES (130, 1006, 5, 'seventh', 1);
INSERT INTO `uservalue` VALUES (131, 1006, 7, 'seventh', 1);
INSERT INTO `uservalue` VALUES (132, 1006, 8, 'seventh', 1);
INSERT INTO `uservalue` VALUES (133, 1006, 6, 'seventh', 1);
INSERT INTO `uservalue` VALUES (134, 1006, 12, 'seventh', 1);
INSERT INTO `uservalue` VALUES (135, 1006, 21, 'seventh', 1);
INSERT INTO `uservalue` VALUES (136, 1006, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (137, 1006, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (138, 1006, 10, 'seventh', 1);
INSERT INTO `uservalue` VALUES (139, 1006, 9, 'seventh', 1);
INSERT INTO `uservalue` VALUES (140, 1006, 22, 'seventh', 1);
INSERT INTO `uservalue` VALUES (141, 1006, 13, 'seventh', 1);
INSERT INTO `uservalue` VALUES (142, 1006, 14, 'seventh', 1);
INSERT INTO `uservalue` VALUES (143, 1006, 15, 'seventh', 1);
INSERT INTO `uservalue` VALUES (144, 1006, 16, 'seventh', 1);
INSERT INTO `uservalue` VALUES (145, 1006, 17, 'seventh', 1);
INSERT INTO `uservalue` VALUES (146, 1006, 18, 'seventh', 1);
INSERT INTO `uservalue` VALUES (147, 1006, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (148, 1007, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (149, 1007, 1, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (150, 1007, 2, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (151, 1007, 5, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (152, 1007, 6, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (153, 1007, 21, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (154, 1007, 7, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (155, 1007, 12, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (156, 1007, 4, 'male', 1);
INSERT INTO `uservalue` VALUES (157, 1007, 8, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (158, 1007, 3, '2020-11-18T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (159, 1007, 10, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (160, 1007, 9, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (161, 1007, 22, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (162, 1007, 13, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (163, 1007, 14, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (164, 1007, 16, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (165, 1007, 15, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (166, 1007, 17, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (167, 1007, 18, 'Eighth', 1);
INSERT INTO `uservalue` VALUES (168, 1007, 19, '2020-11-26T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (169, 1, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (170, 2, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (171, 3, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (172, 4, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (173, 5, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (174, 6, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (175, 7, 2, 's ADMINS', 1);
INSERT INTO `uservalue` VALUES (176, 1008, 1, '1', 1);
INSERT INTO `uservalue` VALUES (177, 1008, 3, '2020-11-27T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (178, 1008, 21, '1', 1);
INSERT INTO `uservalue` VALUES (179, 1008, 11, 'Married', 1);
INSERT INTO `uservalue` VALUES (180, 1008, 2, '1', 1);
INSERT INTO `uservalue` VALUES (181, 1008, 6, '1', 1);
INSERT INTO `uservalue` VALUES (182, 1008, 4, 'female', 1);
INSERT INTO `uservalue` VALUES (183, 1008, 5, '1', 1);
INSERT INTO `uservalue` VALUES (184, 1008, 8, '1', 1);
INSERT INTO `uservalue` VALUES (185, 1008, 7, '1', 1);
INSERT INTO `uservalue` VALUES (186, 1008, 12, '1', 1);
INSERT INTO `uservalue` VALUES (187, 1008, 10, '0315676208', 1);
INSERT INTO `uservalue` VALUES (188, 1008, 14, '1', 1);
INSERT INTO `uservalue` VALUES (189, 1008, 22, 'kasun', 1);
INSERT INTO `uservalue` VALUES (190, 1008, 17, '1', 1);
INSERT INTO `uservalue` VALUES (191, 1008, 9, '222', 1);
INSERT INTO `uservalue` VALUES (192, 1008, 13, '1', 1);
INSERT INTO `uservalue` VALUES (193, 1008, 15, '1', 1);
INSERT INTO `uservalue` VALUES (194, 1008, 19, '2020-11-27T18:30:00.000Z', 1);
INSERT INTO `uservalue` VALUES (195, 1008, 16, '1', 1);
INSERT INTO `uservalue` VALUES (196, 1008, 18, '1', 1);

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
